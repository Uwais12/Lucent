"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trophy, ChevronLeft, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import XPNotification from "@/app/components/XPNotification";
import { useUser } from "@clerk/nextjs";
import ReactConfetti from "react-confetti";

// Separate client component for handling XP notifications
function XPNotificationHandler({ params, manualTrigger, onManualClose }) {
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpNotificationData, setXPNotificationData] = useState(null);
  const router = useRouter();
  
  // Use URL search params safely for client-side only
  let searchParams;
  try {
    searchParams = new URLSearchParams(window.location.search);
  } catch (e) {
    // Handle case where window is not available during SSR
    searchParams = { get: () => null };
  }
  
  // Handle the manual trigger from quiz submission
  useEffect(() => {
    if (manualTrigger && manualTrigger.show) {
      setXPNotificationData(manualTrigger.data);
      setShowXPNotification(true);
    }
  }, [manualTrigger]);
  
  // Check for XP gain parameters in URL
  useEffect(() => {
    if (searchParams.get('xpGained')) {
      const notificationData = {
        message: searchParams.get('quizCompleted') === 'true' ? 'Quiz Completed!' : 'Experience Earned!',
        courseId: searchParams.get('courseId'),
        score: parseInt(searchParams.get('score') || '0'),
        xpGained: parseInt(searchParams.get('xpGained') || '0'),
        gemsGained: parseInt(searchParams.get('gemsGained') || '0'),
        levelUp: searchParams.get('levelUp') === 'true',
        completionPercentage: parseInt(searchParams.get('completionPercentage') || '0')
      };
      
      setXPNotificationData(notificationData);
      setShowXPNotification(true);
      
      // Clear the URL parameters after a delay
      setTimeout(() => {
        router.replace(`/quiz/${params.slug}`);
      }, 500);
    }
  }, [searchParams, router, params.slug]);

  // Handle notification close
  const handleClose = () => {
    setShowXPNotification(false);
    if (onManualClose) {
      onManualClose();
    }
  };

  return (
    <XPNotification 
      isVisible={showXPNotification}
      onClose={handleClose}
      xpGained={xpNotificationData?.xpGained}
      gemsGained={xpNotificationData?.gemsGained}
      levelUp={xpNotificationData?.levelUp}
      message={xpNotificationData?.message}
      completionPercentage={xpNotificationData?.completionPercentage}
      courseId={xpNotificationData?.courseId}
      score={xpNotificationData?.score}
    />
  );
}

export default function LessonQuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [notificationTrigger, setNotificationTrigger] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Set up window size for confetti
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${params.slug}`);
        const data = await response.json();

        if (response.ok && !data.error) {
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

    fetchQuiz();
  }, [params.slug]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  // Function to mark lesson as complete and redirect to dashboard
  const markLessonCompleteAndRedirect = async () => {
    if (!quiz || !quizResult || isMarkingComplete) return;
    
    try {
      setIsMarkingComplete(true);
      
      // Call the API to mark the lesson as complete
      const response = await fetch('/api/lessons/mark-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: quiz.courseId,
          chapterId: quiz.chapterId,
          lessonId: quiz.lessonId
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Redirect to dashboard with completion information
        router.push(`/?quizCompleted=true&courseId=${data.courseId}&score=${quizResult.score}&xpGained=${data.xpGained || 0}&levelUp=${data.levelUp || false}&completionPercentage=${data.completionPercentage || 0}`);
      } else {
        // If there's an error, still redirect to dashboard but without completion info
        router.push('/');
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
      router.push('/');
    }
  };

  const submitQuiz = async () => {
    try {
      let totalPoints = 0;
      let earnedPoints = 0;

      quiz.questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) {
          earnedPoints += question.points || 10; // Default to 10 points if not specified
        }
        totalPoints += question.points || 10;
      });

      const score = Math.round((earnedPoints / totalPoints) * 100);
      const passed = score >= quiz.passingScore;

      // Submit quiz results
      const response = await fetch('/api/lessons/quiz-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonSlug: params.slug,
          score,
          passed,
          answers,
          courseId: quiz.courseId,
          chapterId: quiz.chapterId,
          lessonId: quiz.lessonId
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitted(true);
        setQuizResult(data);

        // Build feedback message
        let feedbackMsg = passed 
          ? `Congratulations! You passed with a score of ${score}%` 
          : `You scored ${score}%. You need ${quiz.passingScore}% to pass. Try again!`;

        // Add XP info
        if (data.xpGained) {
          feedbackMsg += `\nYou earned ${data.xpGained} XP!`;
        }

        // Add level up info
        if (data.levelUp) {
          feedbackMsg += `\nLevel Up! You are now level ${data.level}!`;
        }

        setFeedback(feedbackMsg);

        // Trigger the XP notification popup and confetti when passing
        if (passed) {
          // First show confetti
          setShowConfetti(true);
          
          // Then trigger notification
          setNotificationTrigger({
            show: true,
            data: {
              message: 'Quiz Completed!',
              courseId: quiz.courseId,
              score: score,
              xpGained: data.xpGained || 0,
              gemsGained: data.gemsGained || 0,
              levelUp: data.levelUp || false,
              completionPercentage: data.completionPercentage || 0
            }
          });

          // Turn off confetti after some time
          setTimeout(() => {
            setShowConfetti(false);
          }, 6000);

          // Handle navigation after delay
          setTimeout(() => {
            if (data.nextLessonSlug) {
              router.push(`/lesson/${data.nextLessonSlug}`);
            }
            // If this is the last lesson, we'll let the user decide when to go to the dashboard
          }, 5000); // Give more time to see results and achievements
        }
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz');
    }
  };

  const handleNotificationClose = () => {
    setNotificationTrigger(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-6">Quiz not found</div>;
  }

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>
      
      {/* Show confetti when user passes the quiz */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.15}
        />
      )}
      
      {/* XP Notification with Confetti */}
      <Suspense fallback={null}>
        <XPNotificationHandler 
          params={params} 
          manualTrigger={notificationTrigger}
          onManualClose={handleNotificationClose}
        />
      </Suspense>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-violet-600 mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Lesson
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
                <p className="text-gray-600">{quiz.description}</p>
              </div>
              <div className="flex items-center gap-2 text-violet-600">
                <Trophy className="w-5 h-5" />
                <span>Pass: {quiz.passingScore}%</span>
              </div>
            </div>
          </div>

          {/* Results popup for successful quiz */}
          {submitted && quizResult && quizResult.score >= 70 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 animate-fade-in">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-pop-in">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Congratulations!</h2>
                  <p className="text-lg text-violet-600 font-medium">You passed the quiz!</p>
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center bg-violet-100 rounded-full p-6">
                    <span className="text-4xl font-bold text-violet-700">{quizResult.score}%</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span>XP Earned</span>
                    <span className="font-medium text-violet-600">+{quizResult.xpGained} XP</span>
                  </div>
                  {quizResult.levelUp && (
                    <div className="flex items-center justify-between text-sm">
                      <span>New Level</span>
                      <span className="font-medium text-emerald-600">Level {quizResult.level}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span>Course Progress</span>
                    <span className="font-medium text-violet-600">{quizResult.completionPercentage}%</span>
                  </div>
                </div>
                
                <button
                  onClick={() => document.querySelector(".fixed.inset-0.bg-black.bg-opacity-50").classList.add("hidden")}
                  className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Quiz Questions */}
          <div className="space-y-8">
            {quiz.questions.map((question, index) => (
              <div key={index} className="card p-6">
                <p className="font-medium text-lg mb-4">{question.question}</p>

                {question.type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => !submitted && handleAnswerChange(index, option)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          answers[index] === option
                            ? submitted
                              ? answers[index] === question.correctAnswer
                                ? 'bg-green-100 border-green-500 text-green-700'
                                : 'bg-red-100 border-red-500 text-red-700'
                              : 'bg-violet-100 border-violet-500 text-violet-700'
                            : 'border-gray-200 hover:border-violet-500'
                        } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                        disabled={submitted}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="flex gap-4">
                    {['true', 'false'].map((option) => (
                      <button
                        key={option}
                        onClick={() => !submitted && handleAnswerChange(index, option)}
                        className={`px-6 py-2 rounded-lg border transition-colors ${
                          answers[index]?.toLowerCase() === option
                            ? submitted
                              ? answers[index] === question.correctAnswer
                                ? 'bg-green-100 border-green-500 text-green-700'
                                : 'bg-red-100 border-red-500 text-red-700'
                              : 'bg-violet-100 border-violet-500 text-violet-700'
                            : 'border-gray-200 hover:border-violet-500'
                        } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                        disabled={submitted}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                )}

                {submitted && (
                  <div className="mt-4">
                    <p className={`text-sm ${
                      answers[index] === question.correctAnswer
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {answers[index] === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button or Results */}
          {!submitted ? (
            <div className="mt-8 flex justify-end">
              <button
                onClick={submitQuiz}
                disabled={Object.keys(answers).length !== quiz.questions.length}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  Object.keys(answers).length === quiz.questions.length
                    ? 'bg-violet-600 text-white hover:bg-violet-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {/* Results Card */}
              <div className="card p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quiz Results</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg font-semibold">{quizResult.score}%</span>
                  </div>
                </div>
                
                {quizResult.score >= 70 ? (
                  <>
                    {/* XP and Level */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>XP Earned</span>
                        <span className="font-medium text-violet-600">+{quizResult.xpGained} XP</span>
                      </div>
                      {quizResult.levelUp && (
                        <div className="flex items-center justify-between text-sm">
                          <span>New Level</span>
                          <span className="font-medium text-emerald-600">Level {quizResult.level}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span>Course Progress</span>
                        <span className="font-medium text-violet-600">{quizResult.completionPercentage}%</span>
                      </div>
                    </div>

                    {/* Success Message */}
                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                      <p className="text-center font-medium">
                        {quizResult.nextLessonSlug
                          ? "Congratulations! Moving to the next lesson in a few seconds..."
                          : "Congratulations! You've completed the course!"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Failed Message */}
                    <div className="mt-4 p-4 bg-amber-50 text-amber-700 rounded-lg">
                      <p className="text-center font-medium">
                        You need 70% or higher to pass this quiz and complete the lesson.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-4 justify-center">
                      <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                      >
                        Retry Quiz
                      </button>
                      <Link
                        href={`/lesson/${params.slug}`}
                        className="px-6 py-2 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 transition-colors"
                      >
                        Review Lesson
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-4 flex justify-between">
                <Link
                  href={`/lesson/${params.slug}`}
                  className="flex items-center gap-2 text-violet-600 hover:text-violet-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Lesson
                </Link>
                {quizResult.score >= 70 ? (
                  <button
                    onClick={markLessonCompleteAndRedirect}
                    disabled={isMarkingComplete}
                    className="text-violet-600 hover:text-violet-700 disabled:opacity-50"
                  >
                    {isMarkingComplete ? 'Redirecting...' : 'Home'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (confirm("You haven't passed the quiz yet. Going home will not mark this lesson as complete. Continue?")) {
                        router.push('/');
                      }
                    }}
                    className="text-violet-600 hover:text-violet-700"
                  >
                    Home
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`mt-8 p-4 rounded-lg ${
              submitted && quizResult?.passed
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {feedback.split('\n').map((line, i) => (
                <p key={i} className="mb-1">{line}</p>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 