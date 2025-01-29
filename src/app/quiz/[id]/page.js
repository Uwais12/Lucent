"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Link } from "next/link";

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id;
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch(`/api/quizzes/${quizId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setQuiz(data);
        }
      });
  }, [quizId]);

  if (!quiz) {
    return <p className="text-center mt-6">Loading quiz...</p>;
  }

  // e.g., handle user answers here:
  const handleAnswerChange = (questionId, userAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: userAnswer }));
  };

  const checkQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (
        q.type === "true-false" ||
        q.type === "multiple-choice" ||
        q.type === "scenario-quiz"
      ) {
        if (answers[q.id] === q.answer) {
          correctCount++;
        }
      } else if (q.type === "fill-in-the-blanks") {
        // If there's only one blank, you might check it like:
        if (
          answers[q.id]?.trim().toLowerCase() === q.answers[0].toLowerCase()
        ) {
          correctCount++;
        }
      }
    });
    setFeedback(
      `You got ${correctCount} out of ${quiz.questions.length} correct.`
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-8 text-gray-500">{quiz.description}</p>

      {quiz.questions.map((q) => (
        <div key={q.id} className="mb-6 p-4 bg-gray-100 rounded">
          <p className="font-semibold mb-2">{q.question}</p>

          {/* Render UI based on question.type */}
          {q.type === "multiple-choice" || q.type === "scenario-quiz" ? (
            <div className="flex flex-col space-y-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 text-left ${
                    answers[q.id] === opt
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-600"
                  } rounded`}
                  onClick={() => handleAnswerChange(q.id, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : null}

          {q.type === "true-false" && (
            <div className="space-x-4">
              <button
                className={
                  answers[q.id] === "True"
                    ? "px-4 py-2 bg-blue-600 text-white rounded"
                    : "px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded"
                }
                onClick={() => handleAnswerChange(q.id, "True")}
              >
                True
              </button>
              <button
                className={
                  answers[q.id] === "False"
                    ? "px-4 py-2 bg-blue-600 text-white rounded"
                    : "px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded"
                }
                onClick={() => handleAnswerChange(q.id, "False")}
              >
                False
              </button>
            </div>
          )}

          {q.type === "fill-in-the-blanks" && (
            <div className="mt-2">
              <input
                type="text"
                className="border border-gray-400 p-2 rounded"
                placeholder="Your answer..."
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}

      {/* Feedback */}
      {feedback && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
          {feedback}
        </div>
      )}

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={checkQuiz}
      >
        Submit Quiz
      </button>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Home
      </a>
    </div>
  );
}
