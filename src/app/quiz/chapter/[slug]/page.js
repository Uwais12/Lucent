"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Quiz from "@/app/components/Quiz";
import { toast } from "react-hot-toast";
import XPNotification from '@/app/components/XPNotification';
import Navbar from '@/app/components/Navbar';

export default function ChapterQuiz() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const [hasPendingQuizNotification, setHasPendingQuizNotification] = useState(false);
  const [stagedCompletionData, setStagedCompletionData] = useState(null);

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
  }, [params.slug, user]);

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

  const handleTimeUp = async () => {
    try {
      const response = await fetch(`/api/quizzes/chapter/${params.slug}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id, // Assuming user.id is available
          answers: quiz.questions.map(() => null), // Submit empty/null answers for time up
          timeLeft: 0, // Time is up
          isTimeUp: true
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz due to time up");
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success("Time's up! Quiz submitted successfully!");
        if (data.xpEarned) {
          toast.success(`+${data.xpEarned} XP earned!`);
        }
        if (data.gemsEarned) {
          toast.success(`+${data.gemsEarned} gems earned!`);
        }

        // Dispatch badge notifications if any badges were awarded
        if (data.newlyAwardedBadges && Array.isArray(data.newlyAwardedBadges)) {
          data.newlyAwardedBadges.forEach(badge => {
            if (badge && badge.id) { // Ensure badge and badge.id are valid
              window.dispatchEvent(new CustomEvent('showBadgeNotification', { detail: badge }));
            }
          });
        }
        // The sequential logic for XPNotification is not needed here as handleTimeUp uses toasts directly.
        // If badge pop-up appears, it will overlay, and then user proceeds. Toasts are less intrusive.
        router.push(`/course-details/${quiz.courseSlug}`);
      } else {
        toast.error(data.message || "Failed to submit quiz due to time up");
      }
    } catch (err) {
      toast.error(err.message || "Failed to submit quiz due to time up");
    } finally {
      setIsSubmitting(false); // Ensure this is reset
    }
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

        // Dispatch badge notifications if any badges were awarded
        let badgesAwarded = false;
        if (data.newlyAwardedBadges && Array.isArray(data.newlyAwardedBadges) && data.newlyAwardedBadges.length > 0) {
          badgesAwarded = true;
          data.newlyAwardedBadges.forEach(badge => {
            if (badge && badge.id) { // Ensure badge and badge.id are valid
              window.dispatchEvent(new CustomEvent('showBadgeNotification', { detail: badge }));
            }
          });
        }

        router.push(`/course-details/${quiz.courseSlug}`);

        let completionInfo = {
          score: data.score,
          xpGained: data.xpEarned,
          gemsGained: data.gemsEarned,
          levelUp: data.levelUp,
          completionPercentage: data.completionPercentage,
          message: data.passed ? 'Chapter Quiz Completed Successfully! 🎉' : 'Quiz Submitted'
        };

        // Create redirect URL with XP notification parameters
        const courseSlug = quiz.courseSlug;
        const courseId = quiz.courseId;
        
        if (!courseSlug || !courseId) {
          throw new Error('Course information not found');
        }

        const redirectUrl = `/course-details/${courseSlug}?xpGained=${completionInfo.xpGained}&gemsGained=${completionInfo.gemsGained}&levelUp=${completionInfo.levelUp}&completionPercentage=${completionInfo.completionPercentage}&courseId=${courseId}`;

        // Store all the completion data
        setCompletionData(null);
        setShowNotification(false);

        if (badgesAwarded) {
          setStagedCompletionData({ ...completionInfo, redirectUrl });
          setHasPendingQuizNotification(true);
        } else {
          setCompletionData({ ...completionInfo, redirectUrl });
          setShowNotification(true);
        }

        return completionInfo;
      } else {
        toast.error(data.message || "Failed to submit quiz");
      }
    } catch (err) {
      toast.error(err.message || "Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      // Calculate score from answers
      const totalQuestions = quiz.questions.length;
      const correctAnswers = quiz.questions.reduce((count, question, index) => {
        const userAnswer = answers[index];
        const correctAnswer = question.correctAnswer;
        return count + (userAnswer === correctAnswer ? 1 : 0);
      }, 0);
      
      const score = Math.round((correctAnswers / totalQuestions) * 100);

      // Submit the quiz completion with the calculated score
      const quizResponse = await fetch(`/api/quizzes/chapter/${params.slug}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score })
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
      if (quizData.newlyAwardedBadges && Array.isArray(quizData.newlyAwardedBadges) && quizData.newlyAwardedBadges.length > 0) {
        badgesAwarded = true;
        quizData.newlyAwardedBadges.forEach(badge => {
          if (badge && badge.id) { // Ensure badge and badge.id are valid
            window.dispatchEvent(new CustomEvent('showBadgeNotification', { detail: badge }));
          }
        });
      }

      let completionInfo = {
        score: quizData.score,
        xpGained: quizData.xpEarned,
        gemsGained: quizData.gemsEarned,
        levelUp: quizData.levelUp,
        completionPercentage: quizData.completionPercentage,
        message: quizData.passed ? 'Chapter Quiz Completed Successfully! 🎉' : 'Quiz Submitted'
      };

      // Create redirect URL with XP notification parameters
      const courseSlug = quiz.courseSlug;
      const courseId = quiz.courseId;
      
      if (!courseSlug || !courseId) {
        throw new Error('Course information not found');
      }

      const redirectUrl = `/course-details/${courseSlug}?xpGained=${completionInfo.xpGained}&gemsGained=${completionInfo.gemsGained}&levelUp=${completionInfo.levelUp}&completionPercentage=${completionInfo.completionPercentage}&courseId=${courseId}`;

      // Store all the completion data
      setCompletionData(null);
      setShowNotification(false);

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

  // Renamed from handleSubmit to handleQuizFormSubmit to avoid conflict with form's implicit submit
  const handleQuizFormSubmit = (answersFromQuizComponent) => {
    // This function is now called by the Quiz component's onComplete
    // It then calls the main handleSubmit logic for this page.
    handleSubmit(answersFromQuizComponent);
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
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