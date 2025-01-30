"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Trophy } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import ExerciseWrapper from "@/app/components/exercises/ExerciseWrapper";
import { marked } from "marked";

// Import React DnD hooks
import { useDrag, useDrop } from "react-dnd";

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
  const [lesson, setLesson] = useState(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({
    xp: 0,
    completedExercises: new Set(),
  });

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

    fetchLesson();
  }, [params.slug]);

  const handleExerciseComplete = (points) => {
    setProgress(prev => ({
      xp: prev.xp + points,
      completedExercises: new Set([...prev.completedExercises, currentPartIndex]),
    }));
  };

  const navigateToPart = (index) => {
    if (index >= 0 && index < lesson.parts.length) {
      setCurrentPartIndex(index);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
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
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 text-sm text-violet-600 mb-4">
              <span>{lesson.chapterTitle}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{lesson.title}</span>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{currentPart.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{currentPart.duration} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-violet-600">
                  <Trophy className="w-4 h-4" />
                  <span>{progress.xp} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{currentPartIndex + 1} of {lesson.parts.length}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-violet-600 rounded-full transition-all"
                style={{ width: `${((currentPartIndex + 1) / lesson.parts.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="card p-8">
            {/* Lesson Content */}
            <div
              className="prose prose-violet max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: marked(currentPart.content) }}
            />

            {/* Exercise (if present) */}
            {currentPart.exercise && (
              <ExerciseWrapper
                exercise={currentPart.exercise}
                onComplete={handleExerciseComplete}
              />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t">
              <button
                onClick={() => navigateToPart(currentPartIndex - 1)}
                disabled={currentPartIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPartIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-violet-600 hover:bg-violet-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={() => navigateToPart(currentPartIndex + 1)}
                disabled={currentPartIndex === lesson.parts.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPartIndex === lesson.parts.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-violet-600 hover:bg-violet-50'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
