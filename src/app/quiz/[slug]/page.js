"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Quiz from '@/app/components/Quiz';
import { useUser } from '@clerk/nextjs';
import XPNotification from '@/app/components/XPNotification';
import { Trophy, ArrowLeft } from 'lucide-react';

export default function QuizPage() {
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
        const response = await fetch(`/api/quizzes/${params.slug}`);
        const data = await response.json();

        if (response.ok) {
          setQuiz(data);
        } else {
          setError(data.error || 'Failed to load quiz');
        }
      } catch (err) {
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      fetchQuiz();
    }
  }, [params.slug, isLoaded, user]);

  const handleQuizComplete = async (score) => {
    try {
      setIsSubmitting(true);
      // First, submit the quiz completion
      const quizResponse = await fetch(`/api/quizzes/${params.slug}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score })
      });

      if (!quizResponse.ok) {
        throw new Error('Failed to submit quiz');
      }

      const quizData = await quizResponse.json();
      let completionInfo = {
        score,
        xpGained: quizData.xpGained,
        gemsGained: quizData.gemsGained,
        levelUp: quizData.levelUp,
        completionPercentage: quizData.completionPercentage
      };
      
      // If quiz is passed (score >= 70), mark lesson as complete
      if (score >= 70) {
        const lessonResponse = await fetch(`/api/lessons/${params.slug}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!lessonResponse.ok) {
          throw new Error('Failed to complete lesson');
        }

        const lessonData = await lessonResponse.json();
        completionInfo = {
          ...completionInfo,
          xpGained: quizData.xpGained + lessonData.xpGained,
          gemsGained: quizData.gemsGained + lessonData.gemsGained,
          levelUp: quizData.levelUp || lessonData.levelUp,
          nextLessonSlug: lessonData.nextLessonSlug,
          message: 'Quiz & Lesson Completed! 🎉'
        };
      } else {
        completionInfo.message = 'Quiz Submitted';
      }

      setCompletionData(completionInfo);
      setShowNotification(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz. Please try again.');
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
          <div className="text-center text-gray-600">Quiz not found</div>
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
        {showNotification && (
          <>
            <XPNotification 
              isVisible={showNotification}
              onClose={() => setShowNotification(false)}
              xpGained={completionData.xpGained}
              gemsGained={completionData.gemsGained}
              levelUp={completionData.levelUp}
              message={completionData.message}
              completionPercentage={completionData.completionPercentage}
              score={completionData.score}
            />
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {completionData.nextLessonSlug ? (
                <button
                  onClick={() => router.push(`/lesson/${completionData.nextLessonSlug}`)}
                  className="flex-1 sm:flex-initial px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Continue to Next Lesson</span>
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/course/${quiz.courseId}`)}
                  className="flex-1 sm:flex-initial px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Return to Course</span>
                </button>
              )}
              
              <button
                onClick={() => router.push(`/lesson/${params.slug}`)}
                className="flex-1 sm:flex-initial px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Lesson</span>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 