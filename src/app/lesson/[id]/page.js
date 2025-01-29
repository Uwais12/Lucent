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
  const [currentSection, setCurrentSection] = useState(0);

  // DnD matching state
  const [matches, setMatches] = useState({});

  // Other interaction states
  const [quizAnswers, setQuizAnswers] = useState({});
  const [fillBlanksAnswers, setFillBlanksAnswers] = useState([]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);

  // Feedback message
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch(`/api/lessons/${params.id}`)
      .then((res) => res.json())
      .then((data) => setLesson(data));
  }, [params.id]);

  if (!lesson || !lesson.sections) {
    return <p className="text-center mt-6">Loading lesson...</p>;
  }

  const section = lesson.sections[currentSection];

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
              Section {currentSection + 1}: {section.title}
            </p>
          </div>

          {/* Card with Section Content & Interactions */}
          <div className="card p-8 mb-8">
            <p className="text-secondary whitespace-pre-line mb-4">
              {section.content}
            </p>

            {/* Visuals (if any) */}
            {section.visuals && section.visuals.length > 0 && (
              <img
                src={section.visuals[0]}
                alt="Visual"
                className="mt-4 w-full rounded-lg"
              />
            )}

            {/* Examples (if any) */}
            {section.examples && (
              <ul className="mt-4 list-disc list-inside text-secondary">
                {section.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            )}

            {/* Subsections (if any) */}
            {section.subsections && (
              <div className="mt-6 space-y-4">
                {section.subsections.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded bg-card-background colorful-border"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {sub.title}
                    </h3>
                    <p className="mt-2 text-secondary whitespace-pre-line">
                      {sub.content}
                    </p>
                    {sub.codeExample && (
                      <pre className="mt-2 bg-gray-100 p-2 rounded text-sm overflow-auto">
                        {sub.codeExample}
                      </pre>
                    )}
                    {sub.downside && (
                      <p className="mt-2 text-red-500">
                        <strong>Downside:</strong> {sub.downside}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Code Example (if present) */}
            {section.codeExample && (
              <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-auto">
                {section.codeExample}
              </pre>
            )}

            {/* INTERACTIONS */}
            {section.interaction && (
              <div className="mt-6 p-4 bg-card-background rounded colorful-border">
                {/* 1) Drag-and-Drop */}
                {section.interaction.type === "drag-and-drop" && (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Match the Terms
                    </h3>
                    <p className="text-secondary mb-4">
                      {section.interaction.question}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Draggable Terms */}
                      <div className="flex-1 bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold mb-2 text-secondary">Terms</h4>
                        {section.interaction.options.map((opt, idx) => (
                          <DraggableTerm key={idx} term={opt.term} />
                        ))}
                      </div>

                      {/* Definitions (Drop Zones) */}
                      <div className="flex-1 bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold mb-2 text-secondary">
                          Definitions
                        </h4>
                        {section.interaction.options.map((opt, idx) => {
                          const matchedTerm = matches[opt.definition];
                          return (
                            <DefinitionDropZone
                              key={idx}
                              definition={opt.definition}
                              onDropTerm={handleDropTerm}
                              matchedTerm={matchedTerm}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <button
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() =>
                        checkMatchingAnswers(section.interaction.options)
                      }
                    >
                      Check Matches
                    </button>
                  </>
                )}

                {/* 2) Scenario Quiz */}
                {section.interaction.type === "scenario-quiz" && (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Scenario Quiz
                    </h3>
                    {section.interaction.questions.map((q, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-secondary font-medium">
                          {q.question}
                        </p>
                        <div className="mt-1 flex space-x-2">
                          <button
                            className={`px-4 py-2 rounded ${
                              quizAnswers[index] === "Yes"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600 border border-blue-600"
                            }`}
                            onClick={() => handleQuizAnswerChange(index, "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            className={`px-4 py-2 rounded ${
                              quizAnswers[index] === "No"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600 border border-blue-600"
                            }`}
                            onClick={() => handleQuizAnswerChange(index, "No")}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() =>
                        checkScenarioQuiz(section.interaction.questions)
                      }
                    >
                      Check Quiz
                    </button>
                  </>
                )}

                {/* 3) Fill-in-the-blanks */}
                {section.interaction.type === "fill-in-the-blanks" && (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Fill in the Blanks
                    </h3>
                    <p className="text-secondary mb-4">
                      {section.interaction.question}
                    </p>
                    <pre className="bg-gray-100 p-4 rounded text-sm mb-4 whitespace-pre-wrap text-gray-800">
                      {section.interaction.template
                        .split("______")
                        .map((chunk, i) => {
                          return (
                            <span key={i}>
                              {chunk}
                              {i < section.interaction.answers.length && (
                                <input
                                  type="text"
                                  className="inline-block w-24 bg-white border border-gray-400 rounded mx-1"
                                  onChange={(e) =>
                                    handleFillBlankChange(i, e.target.value)
                                  }
                                />
                              )}
                            </span>
                          );
                        })}
                    </pre>

                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() =>
                        checkFillBlanksAnswers(section.interaction.answers)
                      }
                    >
                      Check Answers
                    </button>
                  </>
                )}

                {/* 4) True-False */}
                {section.interaction.type === "true-false" && (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      True or False
                    </h3>
                    <p className="text-secondary mb-4">
                      {section.interaction.question}
                    </p>
                    <div className="space-x-4 text-secondary">
                      <label>
                        <input
                          type="radio"
                          name="trueFalse"
                          value="True"
                          checked={trueFalseAnswer === "True"}
                          onChange={() => setTrueFalseAnswer("True")}
                        />
                        <span className="ml-1">True</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="trueFalse"
                          value="False"
                          checked={trueFalseAnswer === "False"}
                          onChange={() => setTrueFalseAnswer("False")}
                        />
                        <span className="ml-1">False</span>
                      </label>
                    </div>
                    <button
                      className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                      onClick={() => checkTrueFalse(section.interaction.answer)}
                    >
                      Check
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* FEEDBACK MESSAGE */}
          {feedback && (
            <div className="p-4 mb-4 rounded bg-green-100 border border-green-300 text-green-700">
              <p>{feedback}</p>
            </div>
          )}

          {/* SECTION NAVIGATION */}
          <div className="flex items-center justify-between">
            <div>
              {currentSection > 0 && (
                <button
                  onClick={() => {
                    setFeedback("");
                    setCurrentSection(currentSection - 1);
                  }}
                  className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 mr-2"
                >
                  Previous
                </button>
              )}
              {currentSection < lesson.sections.length - 1 && (
                <button
                  onClick={() => {
                    setFeedback("");
                    setCurrentSection(currentSection + 1);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>

            {/* If there's a quiz reference, show a link to the quiz */}
            {lesson.quizReference &&
              currentSection === lesson.sections.length - 1 && (
                <a
                  href={`/quiz/${lesson.quizReference}`}
                  className="px-6 py-2 ml-4 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Take the Quiz
                </a>
              )}
          </div>
        </div>
      </main>
    </div>
  );
}
