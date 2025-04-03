"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Quiz from '@/app/components/Quiz';
import { useUser } from '@clerk/nextjs';
import XPNotification from '@/app/components/XPNotification';
import { Trophy, ArrowLeft, Clock, GraduationCap } from 'lucide-react';

export default function FinalExam() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/final/${params.slug}`);
        const data = await response.json();

        if (response.ok) {
          setQuiz(data);
        } else {
          setError(data.error || 'Failed to load final exam');
        }
      } catch (err) {
        setError('Failed to load final exam');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      fetchQuiz();
    }
  }, [params.slug, isLoaded, user]);

  const handleQuizComplete = async (answers, isReturnToCourse = false) => {
    // If this is a return to course action and we have completion data
    if (isReturnToCourse && completionData?.redirectUrl) {
      // Remove the notification and completion data before redirecting
      setShowNotification(false);
      setCompletionData(null);
      router.push(completionData.redirectUrl);
      return;
    }

    // If no answers provided, return
    if (!answers) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/quizzes/final/${params.slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit final exam');
      }

      const data = await response.json();
      const completionInfo = {
        score: data.score,
        xpGained: data.xpGained,
        gemsGained: data.gemsGained,
        levelUp: data.levelUp,
        completionPercentage: data.completionPercentage,
        message: data.passed ? 'Course Completed Successfully! 🎓' : 'Final Exam Submitted'
      };

      // Create redirect URL with XP notification parameters
      const redirectUrl = `/course-details/${quiz.course.slug}?xpGained=${completionInfo.xpGained}&gemsGained=${completionInfo.gemsGained}&levelUp=${completionInfo.levelUp}&completionPercentage=${completionInfo.completionPercentage}&courseId=${quiz.course._id}`;

      // Store all the completion data
      setCompletionData({
        ...completionInfo,
        redirectUrl
      });

      // Show XP notification for any score (to show feedback)
      setShowNotification(true);

      return completionInfo;
    } catch (error) {
      console.error('Error submitting final exam:', error);
      setError(error.message || 'Failed to submit final exam. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">Final exam not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push(`/course-details/${quiz.course.slug}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Course
              </button>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{quiz.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-5 h-5" />
                <span>Passing Score: {quiz.passingScore}%</span>
              </div>
            </div>
          </div>
        </div>

        <Quiz
          questions={quiz.questions}
          onComplete={handleQuizComplete}
          isSubmitting={isSubmitting}
          duration={quiz.duration * 60}
        />

        {/* Completion UI */}
        {showNotification && completionData && (
          <XPNotification
            xpGained={completionData.xpGained}
            gemsGained={completionData.gemsGained}
            levelUp={completionData.levelUp}
            message={completionData.message}
            onClose={() => {
              // Clear state before redirecting
              setShowNotification(false);
              const redirectUrl = completionData.redirectUrl;
              setCompletionData(null);
              if (redirectUrl) {
                router.push(redirectUrl);
              }
            }}
          />
        )}
      </main>
    </div>
  );
} 