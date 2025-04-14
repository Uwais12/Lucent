"use client";
import { useEffect, useState, Suspense, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Trophy } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import ExerciseWrapper from "@/app/components/exercises/ExerciseWrapper";
import { marked } from "marked";
import XPNotificationHandler from "@/app/components/XPNotificationHandler";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useEnrollmentCheck } from "@/app/contexts/EnrollmentCheckContext";
import { LessonContent } from "./components/LessonContent";
import DOMPurify from 'dompurify';

// Import React DnD hooks
import { useDrag, useDrop } from "react-dnd";

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
  smartLists: true,
  smartypants: true
});

const renderer = new marked.Renderer();
renderer.paragraph = (text) => {
  return `<p class="mb-4 text-gray-700">${text}</p>`;
};
renderer.list = (body, ordered) => {
  const type = ordered ? 'ol' : 'ul';
  const className = ordered ? 'list-decimal' : 'list-disc';
  return `<${type} class="pl-6 mb-4 ${className}">${body}</${type}>`;
};
renderer.listitem = (text) => {
  return `<li class="mb-1">${text}</li>`;
};

marked.use({ renderer });

function DraggableTerm({ term }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "term",
    item: { term },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className="bg-blue-600 text-white rounded p-2 mb-2 cursor-move select-none"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {term}
    </div>
  );
}

function DefinitionDropZone({ definition, onDropTerm, matchedTerm }) {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "term",
    drop: (dragItem) => {
      onDropTerm(dragItem.term, definition);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const backgroundColor = isOver ? "bg-green-200" : "bg-gray-100";

  return (
    <div
      ref={dropRef}
      className={`rounded p-3 my-2 transition-colors ${backgroundColor}`}
      style={{
        minHeight: "60px",
        border: canDrop ? "2px dashed #4ade80" : "2px dashed #ccc",
      }}
    >
      <p className="text-sm text-gray-700">
        <strong>Definition:</strong> {definition}
      </p>
      {matchedTerm && (
        <div className="mt-2 p-2 bg-green-500 text-white rounded">
          {matchedTerm}
        </div>
      )}
    </div>
  );
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { checkEnrollment, isChecking } = useEnrollmentCheck();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [nextLesson, setNextLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [progress, setProgress] = useState({
    xp: 0,
    completedExercises: new Set(),
  });
  const hasCheckedEnrollment = useRef(false);

  // DnD matching state
  const [matches, setMatches] = useState({});

  // Other interaction states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [fillBlanksAnswers, setFillBlanksAnswers] = useState([]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);

  // Feedback message
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // Only check enrollment once
        if (!hasCheckedEnrollment.current) {
          hasCheckedEnrollment.current = true;
          const isEnrolled = await checkEnrollment(params.slug, 'lesson');
          if (!isEnrolled) {
            return;
          }
        }

        const response = await fetch(`/api/lessons/${params.slug}`);
        const data = await response.json();

        if (response.ok) {
          setLesson(data);
        } else {
          setError(data.error || 'Failed to load lesson');
        }
      } catch (err) {
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      fetchLesson();
    }
  }, [params.slug, isLoaded, user]);

  const handleExerciseComplete = async (points) => {
    try {
      // Award XP for exercise completion
      const response = await fetch('/api/user/xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xpAmount: points,
          reason: 'Exercise completed'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(prev => ({
          xp: data.newXp,
          completedExercises: new Set([...prev.completedExercises, currentPartIndex]),
        }));
      }
    } catch (error) {
      console.error('Error updating XP:', error);
    }
  };

  const handlePartComplete = async () => {
    try {
      // Award XP for completing a lesson part (50 XP per part)
      const response = await fetch('/api/user/xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xpAmount: 50,
          reason: 'Lesson part completed'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(prev => ({
          ...prev,
          xp: data.newXp
        }));
      }
    } catch (error) {
      console.error('Error updating XP:', error);
    }
  };

  const handleLessonComplete = async () => {
    try {
      setIsCompletingLesson(true);
      const response = await fetch(`/api/lessons/${params.slug}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to complete lesson');
      }

      const data = await response.json();
      
      // If there's a next lesson, redirect to it
      if (data.nextLessonSlug) {
        router.push(`/lesson/${data.nextLessonSlug}?xpGained=${data.xpGained}&gemsGained=${data.gemsGained}&levelUp=${data.levelUp}&completionPercentage=${data.completionPercentage}&courseId=${data.courseId}`);
      } else {
        // If no next lesson, redirect to course details
        router.push(`/course-details/${course.slug}?xpGained=${data.xpGained}&gemsGained=${data.gemsGained}&levelUp=${data.levelUp}&completionPercentage=${data.completionPercentage}&courseId=${data.courseId}`);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      setError('Failed to complete lesson. Please try again.');
    } finally {
      setIsCompletingLesson(false);
    }
  };

  const navigateToPart = async (index) => {
    if (index >= 0 && index < lesson.parts.length) {
      setCurrentPartIndex(index);
    }
  };

  const startQuiz = async () => {
    try {
      // First check if quiz exists
      const response = await fetch(`/api/quizzes/${lesson.slug}`);
      if (!response.ok) {
        throw new Error('Quiz not found');
      }
      
      // If quiz exists, navigate to quiz page
      router.push(`/quiz/${lesson.slug}`);
    } catch (error) {
      console.error('Error starting quiz:', error);
      setError('Failed to start quiz. Please try again.');
    }
  };

  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return <div className="text-center mt-6">Lesson not found</div>;
  }

  const currentPart = lesson.parts[currentPartIndex];

  /* -------------------------------------------
   * Interaction Handlers
   * ------------------------------------------- */
  const handleDropTerm = (term, definition) => {
    setMatches((prev) => ({
      ...prev,
      [definition]: term,
    }));
  };

  const checkMatchingAnswers = (options) => {
    let correctCount = 0;
    options.forEach(({ term, definition }) => {
      if (matches[definition] === term) {
        correctCount++;
      }
    });
    setFeedback(
      `You matched ${correctCount} out of ${options.length} correctly.`
    );
  };

  const handleQuizAnswerChange = (index, userAnswer) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [index]: userAnswer,
    }));
  };

  const checkScenarioQuiz = (questions) => {
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) {
        correctCount++;
      }
    });
    setFeedback(`You got ${correctCount} out of ${questions.length} correct.`);
  };

  const handleFillBlankChange = (index, newValue) => {
    const updated = [...fillBlanksAnswers];
    updated[index] = newValue;
    setFillBlanksAnswers(updated);
  };

  const checkFillBlanksAnswers = (correctAnswers) => {
    let correctCount = 0;
    correctAnswers.forEach((correct, i) => {
      if (fillBlanksAnswers[i]?.trim() === correct.trim()) {
        correctCount++;
      }
    });
    setFeedback(
      `You filled ${correctCount} out of ${correctAnswers.length} blanks correctly.`
    );
  };

  const checkTrueFalse = (correctAnswer) => {
    if (trueFalseAnswer === correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <XPNotificationHandler params={params} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <div 
                className="prose prose-violet max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-li:mb-1 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-violet-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(marked(currentPart.content.trim()))
                }}
              />
            </div>

            {/* Exercise */}
            {lesson.parts[currentPartIndex].exercise && (
              <LessonContent
                lesson={lesson}
                currentPartIndex={currentPartIndex}
                progress={progress}
                onExerciseComplete={handleExerciseComplete}
                onPartComplete={() => {}}
                exerciseOnly={true}
              />
            )}

            {/* Quiz Button */}
            {currentPartIndex === lesson.parts.length - 1 && (
              <div className="mt-8">
                <button
                  onClick={startQuiz}
                  className="w-full sm:w-auto px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Take End of Lesson Quiz</span>
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Lesson Progress</h2>
              <div className="space-y-4">
                {lesson.parts.map((part, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      index === currentPartIndex
                        ? 'bg-violet-50 border border-violet-200'
                        : progress.completedExercises.has(index)
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {progress.completedExercises.has(index) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {part.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {part.duration} min
                      </p>
                    </div>
                  </div>
                ))}

                {/* Quiz Section - Always visible */}
                <div className="mt-4 pt-4 border-t">
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg bg-violet-50 border border-violet-200 cursor-pointer hover:bg-violet-100 transition-colors"
                    onClick={startQuiz}
                  >
                    <div className="flex-shrink-0">
                      <Trophy className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        End of Lesson Quiz
                      </p>
                      <p className="text-xs text-gray-500">
                        Test your knowledge
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentPartIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentPartIndex === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPartIndex === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Previous</span>
                  </button>
                  <button
                    onClick={() => setCurrentPartIndex(prev => Math.min(lesson.parts.length - 1, prev + 1))}
                    disabled={currentPartIndex === lesson.parts.length - 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPartIndex === lesson.parts.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                    }`}
                  >
                    <span className="text-sm">Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
