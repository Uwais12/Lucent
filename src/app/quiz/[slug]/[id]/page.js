"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Clock,
  CheckCircle,
  XCircle,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Quiz from "@/app/components/Quiz";

export default function FinalAssessment() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${params.slug}`);
        const data = await response.json();

        if (response.ok) {
          setQuiz(data);
          // Set initial time left
          setTimeLeft(data.duration * 60); // Convert minutes to seconds
        } else {
          setError(data.error || "Failed to load quiz");
        }
      } catch (err) {
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchQuiz();
    }
  }, [params.slug]);

  // Timer effect
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
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/quizzes/${params.slug}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: quiz.questions.map(() => null), // Submit empty answers
          timeSpent: quiz.duration * 60, // Full duration
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to course details with completion info
        router.push(`/course-details/${quiz.course.slug}?xpGained=${data.xpGained}&gemsGained=${data.gemsGained}&levelUp=${data.levelUp}&completionPercentage=${data.completionPercentage}&courseId=${quiz.course._id}`);
      } else {
        setError(data.error || "Failed to submit quiz");
      }
    } catch (err) {
      setError("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (answers) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/quizzes/${params.slug}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          timeSpent: quiz.duration * 60 - timeLeft, // Calculate time spent
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to course details with completion info
        router.push(`/course-details/${quiz.course.slug}?xpGained=${data.xpGained}&gemsGained=${data.gemsGained}&levelUp=${data.levelUp}&completionPercentage=${data.completionPercentage}&courseId=${quiz.course._id}`);
      } else {
        setError(data.error || "Failed to submit quiz");
      }
    } catch (err) {
      setError("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading final assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Quiz not found</div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {quiz.title}
              </h1>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-5 h-5" />
                <span>Passing Score: {quiz.passingScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Component */}
        <Quiz
          questions={quiz.questions}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          timeLeft={timeLeft}
          onTimeUp={handleTimeUp}
        />
      </div>
    </div>
  );
} 