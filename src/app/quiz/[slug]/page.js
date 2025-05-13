"use client";
import { useEffect, useState, useCallback } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(0);
  const [enrollmentChecked, setEnrollmentChecked] = useState(false);
  const [hasPendingQuizNotification, setHasPendingQuizNotification] = useState(false);
  const [stagedCompletionData, setStagedCompletionData] = useState(null);

  const fetchQuizData = useCallback(async () => {
    try {
      const response = await fetch(`/api/quizzes/${params.slug}`);
      const data = await response.json();

      if (response.ok) {
        setQuiz(data);
        setTimeLeft(data.duration * 60);
      } else {
        setError(data.error || 'Failed to load quiz');
      }
    } catch (err) {
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    const initializeQuiz = async () => {
      if (!isLoaded || !user || enrollmentChecked) return;

      try {
        const isEnrolled = await checkEnrollment(params.slug, 'quiz');
        setEnrollmentChecked(true);
        
        if (isEnrolled) {
          await fetchQuizData();
        } else {
          setError('You must be enrolled in the course to take this quiz');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to check enrollment');
        setLoading(false);
      }
    };

    initializeQuiz();
  }, [isLoaded, user, params.slug, checkEnrollment, enrollmentChecked, fetchQuizData]);

  useEffect(() => {
    const showPendingNotification = () => {
      if (hasPendingQuizNotification && stagedCompletionData) {
        setCompletionData(stagedCompletionData);
        setShowNotification(true);
        setHasPendingQuizNotification(false);
        setStagedCompletionData(null);
      }
    };

    window.addEventListener('badgeNotificationClosed', showPendingNotification);
    return () => {
      window.removeEventListener('badgeNotificationClosed', showPendingNotification);
    };
  }, [hasPendingQuizNotification, stagedCompletionData]);

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
      // First, submit the quiz completion
      const quizResponse = await fetch(`/api/quizzes/${params.slug}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      if (!quizResponse.ok) {
        const errorData = await quizResponse.json();
        throw new Error(errorData.error || 'Failed to submit quiz');
      }

      const quizData = await quizResponse.json();
      
      // Dispatch quiz completion event
      window.dispatchEvent(new Event('quizCompleted'));

      // Dispatch badge notifications if any badges were awarded
      let badgesAwarded = false;
      if (quizData.awardedBadges && Array.isArray(quizData.awardedBadges) && quizData.awardedBadges.length > 0) {
        badgesAwarded = true;
        quizData.awardedBadges.forEach(badge => {
          if (badge && badge.id) { // Ensure badge and badge.id are valid
            window.dispatchEvent(new CustomEvent('showBadgeNotification', { detail: badge }));
          }
        });
      }

      let completionInfo = {
        score: quizData.score,
        xpGained: quizData.xpGained,
        gemsGained: quizData.gemsGained,
        levelUp: quizData.levelUp,
        completionPercentage: quizData.completionPercentage,
        message: quizData.score >= 70 ? 'Quiz Completed Successfully! 🎉' : 'Quiz Submitted'
      };
      
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
        
        // Don't add XP/gems from lesson completion since quiz already awarded them
        completionInfo = {
          ...completionInfo,
          nextLessonSlug: lessonData.nextLessonSlug,
          message: 'Quiz & Lesson Completed! 🎉'
        };
      }

      // Create redirect URL with XP notification parameters
      const courseSlug = quiz.course?.slug;
      const courseId = quiz.course?._id;
      
      if (!courseSlug || !courseId) {
        throw new Error('Course information not found');
      }

      const redirectUrl = `/course-details/${courseSlug}?xpGained=${completionInfo.xpGained}&gemsGained=${completionInfo.gemsGained}&levelUp=${completionInfo.levelUp}&completionPercentage=${completionInfo.completionPercentage}&courseId=${courseId}`;

      // Store all the completion data
      setCompletionData(null); // Clear previous completion data
      setShowNotification(false); // Hide previous notification

      if (badgesAwarded) {
        setStagedCompletionData({ ...completionInfo, redirectUrl });
        setHasPendingQuizNotification(true);
      } else {
        setCompletionData({ ...completionInfo, redirectUrl });
      setShowNotification(true);
      }

      return completionInfo;

    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError(error.message || 'Failed to submit quiz. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

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