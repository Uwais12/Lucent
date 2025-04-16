"use client";
import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Quiz from '@/app/components/Quiz';
import { useUser } from '@clerk/nextjs';
import XPNotification from '@/app/components/XPNotification';
import { Trophy, ArrowLeft } from 'lucide-react';
import { useEnrollmentCheck } from '@/app/contexts/EnrollmentCheckContext';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { checkEnrollment, isChecking } = useEnrollmentCheck();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasCheckedEnrollment = useRef(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Only check enrollment once
        if (!hasCheckedEnrollment.current) {
          const isEnrolled = await checkEnrollment(params.slug, 'quiz');
          hasCheckedEnrollment.current = true;
          if (!isEnrolled) {
            setLoading(false);
            return;
          }
        }

        const response = await fetch(`/api/quizzes/${params.slug}`);
        const data = await response.json();

        if (response.ok) {
          setQuiz(data);
        } else {
          setError(data.error || 'Failed to load quiz');
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user && !quiz) {
    fetchQuiz();
    }
  }, [params.slug, isLoaded, user, checkEnrollment]);

  const handleQuizComplete = useCallback(async (answers, isReturnToCourse = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/quizzes/${params.slug}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const quizData = await response.json();

      // If quiz is passed (score >= 70), mark lesson as complete
      if (quizData.score >= 70) {
        const lessonResponse = await fetch(`/api/lessons/${params.slug}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isQuizCompletion: true })
        });

        if (!lessonResponse.ok) {
          throw new Error('Failed to complete lesson');
        }

        const lessonData = await lessonResponse.json();
        
        // Create redirect URL with XP notification parameters
        const courseSlug = quiz.course?.slug;
        const courseId = quiz.course?._id;
        
        if (!courseSlug || !courseId) {
          throw new Error('Course information not found');
        }

        const redirectUrl = `/course-details/${courseSlug}?xpGained=${quizData.xpGained}&gemsGained=${quizData.gemsGained}&levelUp=${quizData.levelUp}&completionPercentage=${lessonData.completionPercentage}&courseId=${courseId}`;

        // Store all the completion data
        setCompletionData({
          ...quizData,
          nextLessonSlug: lessonData.nextLessonSlug,
          message: 'Quiz & Lesson Completed! 🎉',
          redirectUrl
        });

        // Show XP notification
        setShowNotification(true);
      }

      return quizData;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError(error.message || 'Failed to submit quiz. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [params.slug, quiz, isSubmitting]);

  if (loading || isChecking) {
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
          <div className="text-center text-gray-600">Quiz not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
            <button
              onClick={() => router.push(`/lesson/${params.slug}`)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lesson</span>
            </button>
          </div>
          <p className="text-gray-600">{quiz.description}</p>
                </div>
                
        <Quiz
          questions={quiz.questions}
          lessonSlug={params.slug}
          onComplete={handleQuizComplete}
          isSubmitting={isSubmitting}
        />

        {showNotification && completionData && (
          <XPNotification
            xpGained={completionData.xpGained}
            gemsGained={completionData.gemsGained}
            levelUp={completionData.levelUp}
            message={completionData.message}
            onClose={() => {
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