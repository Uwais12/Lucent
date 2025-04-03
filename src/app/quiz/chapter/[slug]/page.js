"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Quiz from "@/app/components/Quiz";
import { toast } from "react-hot-toast";

export default function ChapterQuiz() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/chapter/${params.slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const data = await response.json();
        setQuiz(data);
        setTimeLeft(data.duration * 60); // Convert minutes to seconds
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.slug]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleTimeUp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await handleSubmit([]);
  };

  const handleSubmit = async (answers) => {
    try {
      const response = await fetch(`/api/quizzes/chapter/${params.slug}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          answers,
          timeLeft,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success("Quiz submitted successfully!");
        if (data.xpEarned) {
          toast.success(`+${data.xpEarned} XP earned!`);
        }
        if (data.gemsEarned) {
          toast.success(`+${data.gemsEarned} gems earned!`);
        }
        router.push(`/course-details/${quiz.courseSlug}`);
      } else {
        toast.error(data.message || "Failed to submit quiz");
      }
    } catch (err) {
      toast.error(err.message || "Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Quiz not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          <p className="text-gray-600">{quiz.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-500">
              Questions: {quiz.questions.length}
            </div>
            <div className="text-sm text-gray-500">
              Passing Score: {quiz.passingScore}%
            </div>
          </div>
        </div>

        <Quiz
          questions={quiz.questions}
          duration={quiz.duration}
          onComplete={handleSubmit}
        />
      </div>
    </div>
  );
} 