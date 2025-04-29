"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trophy, ChevronLeft, Star, GraduationCap } from "lucide-react";
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
  
  // Handle the manual trigger from quiz submission
  useEffect(() => {
    if (manualTrigger && manualTrigger.show) {
      setXPNotificationData(manualTrigger.data);
      setShowXPNotification(true);
    }
  }, [manualTrigger]);
  
  // Use URL search params safely for client-side only
  let searchParams;
  try {
    searchParams = new URLSearchParams(window.location.search);
  } catch (e) {
    // Handle case where window is not available during SSR
    searchParams = { get: () => null };
  }
  
  // Handle auto-close
  const handleClose = () => {
    setShowXPNotification(false);
    if (onManualClose) onManualClose();
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
      badgeAwarded={xpNotificationData?.badgeAwarded}
    />
  );
}

export default function FinalExamPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.slug;
  const { user, isLoaded } = useUser();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Notification trigger for quiz results
  const [notificationTrigger, setNotificationTrigger] = useState({ show: false, data: null });
  
  // Window size for confetti
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  
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
      if (!isLoaded || !user) {
        return;
      }
      
      try {
        const response = await fetch(`/api/quiz/final-course?courseSlug=${courseSlug}`);
        
        if (!response.ok) {
          const data = await response.json();
          setError(data.error || "Failed to load final exam");
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setQuiz({
          ...data,
          courseId: data.courseId,
          courseSlug: data.courseSlug
        });
        
        // Create initial answer state
        const initialAnswers = {};
        data.questions.forEach((_, index) => {
          initialAnswers[index] = null;
        });
        setAnswers(initialAnswers);
        
      } catch (error) {
        console.error("Error fetching final exam:", error);
        setError("Failed to load the final exam");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuiz();
  }, [isLoaded, user, courseSlug]);
  
  const handleAnswerChange = (questionIndex, answer) => {
    if (submitted) return; // Prevent changing answers after submission
    
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
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
      const response = await fetch('/api/quiz/final-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseSlug: quiz.courseSlug,
          score,
          passed,
          answers
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
        
        // Add badge info
        if (data.badgeAwarded) {
          feedbackMsg += `\nYou've earned a new badge for completing this course!`;
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
              message: 'Final Exam Completed!',
              courseId: quiz.courseId,
              score: score,
              xpGained: data.xpGained || 0,
              gemsGained: data.gemsGained || 0,
              levelUp: data.levelUp || false,
              completionPercentage: 100,
              badgeAwarded: data.badgeAwarded || false
            }
          });

          // Turn off confetti after some time
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
          
          // Redirect to course details page after a delay
          setTimeout(() => {
            router.push(data.redirectUrl || `/course-details/${courseSlug}`);
          }, 5000);
        }
      } else {
        const data = await response.json();
        setError(data.error || "Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting final exam:", error);
      setError("An error occurred while submitting the final exam");
    }
  };
  
  const handleNotificationClose = () => {
    setNotificationTrigger({ show: false, data: null });
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-background pattern-bg">
        <Navbar />
        <div className="pt-24 pb-16 px-4 text-center">
          <p>Please sign in to access the final exam.</p>
          <Link 
            href="/sign-in" 
            className="mt-4 inline-block px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pattern-bg">
        <Navbar />
        <div className="pt-24 pb-16 px-4 text-center">
          <p>Loading final exam...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pattern-bg">
        <Navbar />
        <div className="pt-24 pb-16 px-4 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p>{error}</p>
          <Link 
            href={`/course-details/${courseSlug}`}
            className="mt-4 inline-block px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background pattern-bg">
        <Navbar />
        <div className="pt-24 pb-16 px-4 text-center">
          <p>Final exam not found.</p>
          <Link 
            href="/courses"
            className="mt-4 inline-block px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0"></div>
      
      {/* XP Notification with Confetti */}
      <Suspense fallback={null}>
        <XPNotificationHandler
          params={params}
          manualTrigger={notificationTrigger}
          onManualClose={handleNotificationClose}
        />
      </Suspense>
      
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
        />
      )}

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link 
            href={`/course-details/${courseSlug}`}
            className="inline-flex items-center text-violet-600 mb-4 hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Course
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <GraduationCap className="w-6 h-6 text-violet-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Final Course Exam</h2>
              <p className="text-gray-600">{quiz.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 text-amber-500 mr-1" />
                  <span>Passing Score: {quiz.passingScore}%</span>
                </div>
                
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-500 mr-1" />
                  <span>{quiz.questions.length} Questions</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results popup for successful exam */}
          {submitted && quizResult && quizResult.passed && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 animate-fade-in">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-pop-in">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Congratulations!</h2>
                  <p className="text-lg text-violet-600 font-medium">You passed the final exam!</p>
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
                    <span>Course Status</span>
                    <span className="font-medium text-emerald-600">Completed!</span>
                  </div>
                  {quizResult.badgeAwarded && (
                    <div className="flex items-center justify-between text-sm">
                      <span>Achievement</span>
                      <span className="font-medium text-amber-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        New Badge Earned!
                      </span>
                    </div>
                  )}
                </div>
                
                <Link
                  href={`/course-details/${courseSlug}`}
                  className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center block"
                >
                  Return to Course
                </Link>
              </div>
            </div>
          )}
          
          {/* Results popup for failed exam */}
          {submitted && quizResult && !quizResult.passed && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 animate-fade-in">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-pop-in">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Keep Practicing</h2>
                  <p className="text-lg text-gray-600 font-medium">You didnt pass this time</p>
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center bg-gray-100 rounded-full p-6">
                    <span className="text-4xl font-bold text-gray-700">{quizResult.score}%</span>
                  </div>
                </div>
                
                <p className="text-center text-gray-600 mb-6">
                  You need {quiz.passingScore}% to pass. Review the course material and try again!
                </p>
                
                <div className="flex gap-3">
                  <Link
                    href={`/course-details/${courseSlug}`}
                    className="w-1/2 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-center block"
                  >
                    Return to Course
                  </Link>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setQuizResult(null);
                    }}
                    className="w-1/2 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
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
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="space-y-3">
                    {['true', 'false'].map((option) => (
                      <button
                        key={option}
                        onClick={() => !submitted && handleAnswerChange(index, option)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          answers[index] === option
                            ? submitted
                              ? answers[index] === question.correctAnswer
                                ? 'bg-green-100 border-green-500 text-green-700'
                                : 'bg-red-100 border-red-500 text-red-700'
                              : 'bg-violet-100 border-violet-500 text-violet-700'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                )}

                {submitted && (
                  <div className="mt-3">
                    {answers[index] === question.correctAnswer ? (
                      <p className="text-green-600 text-sm">Correct!</p>
                    ) : (
                      <div>
                        <p className="text-red-600 text-sm">Incorrect</p>
                        <p className="text-gray-600 text-sm mt-1">
                          Correct answer: {question.correctAnswer}
                        </p>
                        {question.explanation && (
                          <p className="text-gray-600 text-sm mt-2 bg-gray-50 p-2 rounded">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted && (
            <div className="mt-8">
              <button
                onClick={submitQuiz}
                disabled={Object.values(answers).some(a => a === null)}
                className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Final Exam
              </button>
              <p className="text-center text-gray-500 text-sm mt-2">
                Please answer all questions before submitting
              </p>
            </div>
          )}

          {submitted && !quizResult?.passed && (
            <div className="mt-8">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setQuizResult(null);
                }}
                className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 