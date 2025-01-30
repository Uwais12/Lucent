"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

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

export default function Lesson() {
  const params = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentPart, setCurrentPart] = useState(0);

  // DnD matching state
  const [matches, setMatches] = useState({});

  // Other interaction states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [fillBlanksAnswers, setFillBlanksAnswers] = useState([]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);

  // Feedback message
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/lessons/${params.slug}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched lesson data:", data);
          setLesson(data);
        })
        .catch((error) => console.error("Error fetching lesson:", error));
    }
  }, [params.slug]);

  if (!lesson || !lesson.parts) {
    return <p className="text-center mt-6">Loading lesson...</p>;
  }

  const part = lesson.parts[currentPart];

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
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              {lesson.title}
            </h1>
            <div className="accent-bar"></div>
            <p className="text-xl text-secondary">
              Part {currentPart + 1}: {part.title}
            </p>
          </div>

          {/* Card with Part Content & Interactions */}
          <div className="card p-8 mb-8">
            <p className="text-secondary whitespace-pre-line mb-4">
              {part.content}
            </p>

            {/* Display exercise if available */}
            {part.exercise && (
              <div className="mt-6 p-4 bg-card-background rounded colorful-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {part.exercise.title}
                </h3>
                <p className="text-secondary mb-4">
                  {part.exercise.description}
                </p>
                {/* Add more logic to handle different exercise types here */}
              </div>
            )}
          </div>

          {/* FEEDBACK MESSAGE */}
          {feedback && (
            <div className="p-4 mb-4 rounded bg-green-100 border border-green-300 text-green-700">
              <p>{feedback}</p>
            </div>
          )}

          {/* PART NAVIGATION */}
          <div className="flex items-center justify-between">
            <div>
              {currentPart > 0 && (
                <button
                  onClick={() => {
                    setFeedback("");
                    setCurrentPart(currentPart - 1);
                  }}
                  className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 mr-2"
                >
                  Previous
                </button>
              )}
              {currentPart < lesson.parts.length - 1 && (
                <button
                  onClick={() => {
                    setFeedback("");
                    setCurrentPart(currentPart + 1);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
