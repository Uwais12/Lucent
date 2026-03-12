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

// Customize code block rendering
renderer.code = (code, language) => {
  return `<pre class="relative overflow-x-auto p-4 bg-gray-100 rounded-lg text-sm mb-4">
    <code class="language-${language || 'text'} whitespace-pre font-mono block">${code}</code>
  </pre>`;
};

// Customize inline code rendering
renderer.codespan = (code) => {
  return `<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">${code}</code>`;
};

renderer.paragraph = (text) => {
  return `<p class="mb-4 text-gray-700 break-words">${text}</p>`;
};

renderer.list = (body, ordered) => {
  const type = ordered ? 'ol' : 'ul';
  const className = ordered ? 'list-decimal' : 'list-disc';
  return `<${type} class="pl-6 mb-4 ${className} break-words">${body}</${type}>`;
};

renderer.listitem = (text) => {
  return `<li class="mb-1 break-words">${text}</li>`;
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
      // Scroll to top when changing parts
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="min-h-screen bg-gray-50 pattern-bg">
        <Navbar />
        <div className="color-bar w-full fixed top-16 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="animate-pulse space-y-6">
            <div className="h-8 shimmer rounded-lg w-2/5" />
            <div className="flex gap-3">
              <div className="h-6 shimmer rounded-full w-24" />
              <div className="h-6 shimmer rounded-full w-32" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 space-y-4">
                  <div className="h-4 shimmer rounded w-full" />
                  <div className="h-4 shimmer rounded w-5/6" />
                  <div className="h-4 shimmer rounded w-4/6" />
                  <div className="h-4 shimmer rounded w-full" />
                  <div className="h-4 shimmer rounded w-3/4" />
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white rounded-2xl p-6 space-y-3">
                  <div className="h-5 shimmer rounded w-1/2 mb-4" />
                  <div className="h-12 shimmer rounded-lg" />
                  <div className="h-12 shimmer rounded-lg" />
                  <div className="h-12 shimmer rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pattern-bg">
        <Navbar />
        <div className="color-bar w-full fixed top-16 left-0" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-red-800 mb-1">Unable to load lesson</h2>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 pattern-bg">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Lesson not found</p>
          </div>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-gray-50 pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0" />
      <XPNotificationHandler params={params} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-violet-50 rounded-full text-violet-700 font-medium">
                <BookOpen className="w-3.5 h-3.5" />
                Part {currentPartIndex + 1} of {lesson.parts.length}
              </span>
              {currentPart.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {currentPart.duration} min
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigateToPart(currentPartIndex - 1)}
                disabled={currentPartIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  currentPartIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-violet-50'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                onClick={() => navigateToPart(currentPartIndex + 1)}
                disabled={currentPartIndex === lesson.parts.length - 1}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  currentPartIndex === lesson.parts.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-violet-600 text-white hover:bg-violet-700'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">
              <div
                className="prose prose-violet max-w-none prose-headings:font-bold prose-headings:break-words prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-li:mb-1.5 prose-li:break-words prose-li:text-gray-700 prose-code:bg-violet-50 prose-code:text-violet-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-blockquote:border-l-4 prose-blockquote:border-violet-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-violet-50/30 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-img:rounded-xl prose-img:max-w-full prose-img:h-auto prose-strong:text-gray-900 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3"
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
            {currentPartIndex === lesson.parts.length - 1 && lesson.endOfLessonQuiz && (
              <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl border border-violet-200 p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ready to test your knowledge?</h3>
                      <p className="text-sm text-gray-600">Take the end-of-lesson quiz</p>
                    </div>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                    Start Quiz
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-24">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Lesson Progress</h2>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentPartIndex + 1) / lesson.parts.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">{currentPartIndex + 1} of {lesson.parts.length} parts</p>
              </div>

              <div className="space-y-2">
                {lesson.parts.map((part, index) => {
                  const isCurrent = index === currentPartIndex;
                  const isCompleted = progress.completedExercises.has(index);
                  return (
                    <button
                      key={index}
                      onClick={() => navigateToPart(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                        isCurrent
                          ? 'bg-violet-50 border-2 border-violet-200'
                          : isCompleted
                          ? 'bg-emerald-50 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{index + 1}</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-400">{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isCurrent ? 'text-violet-900' : 'text-gray-700'}`}>
                          {part.title}
                        </p>
                        {part.duration && (
                          <p className="text-xs text-gray-500">{part.duration} min</p>
                        )}
                      </div>
                    </button>
                  );
                })}

                {/* Quiz Section */}
                {lesson.endOfLessonQuiz && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={startQuiz}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 hover:from-violet-100 hover:to-fuchsia-100 transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <Trophy className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-violet-900">Lesson Quiz</p>
                        <p className="text-xs text-violet-600">Test your knowledge</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-between">
                  <button
                    onClick={() => navigateToPart(currentPartIndex - 1)}
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
                    onClick={() => navigateToPart(currentPartIndex + 1)}
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
