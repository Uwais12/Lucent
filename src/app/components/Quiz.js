import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight, Send, RotateCcw, BookOpen } from 'lucide-react';

export default function Quiz({ questions, lessonSlug, onComplete, duration }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration ? duration * 60 : 300);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewAnswers, setReviewAnswers] = useState(null);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isTimeUp && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      setIsTimeUp(true);
      handleSubmit();
    }
  }, [timeLeft, isTimeUp, isCompleted]);

  const handleAnswerSelect = useCallback((questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    setFeedback('');
  }, []);

  // Fixed: Store fill-blank answers as an array under the question ID
  const handleFillBlankAnswer = useCallback((questionId, blankIndex, value) => {
    setAnswers(prev => {
      const currentBlanks = Array.isArray(prev[questionId]) ? [...prev[questionId]] : [];
      currentBlanks[blankIndex] = value;
      return { ...prev, [questionId]: currentBlanks };
    });
    setFeedback('');
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setFeedback('');
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setFeedback('');
    }
  };

  const handleSubmit = async () => {
    if (isCompleted) return;

    setIsSubmitting(true);
    try {
      // Convert answers to array format matching question order
      const answersArray = questions.map((question) => {
        const answer = answers[question._id];
        if (question.type === 'fill-blank') {
          return Array.isArray(answer) ? answer : [];
        }
        return answer || '';
      });

      const results = await onComplete(answersArray);
      setQuizResults(results);
      setIsCompleted(true);

      // Build review data
      const reviewData = questions.map((question) => {
        let isCorrect = false;
        const userAnswer = answers[question._id];

        switch (question.type) {
          case 'true-false':
            isCorrect = userAnswer?.toLowerCase() === question.correctAnswer?.toLowerCase();
            break;
          case 'multiple-choice':
            isCorrect = userAnswer === question.correctAnswer;
            break;
          case 'fill-blank':
            if (Array.isArray(userAnswer)) {
              isCorrect = question.blanks?.every((blank, blankIndex) => {
                const ans = userAnswer[blankIndex]?.toLowerCase().trim();
                return ans === blank.correctAnswer?.toLowerCase().trim();
              }) ?? false;
            }
            break;
          case 'short-answer':
            isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim();
            break;
          default:
            isCorrect = userAnswer === question.correctAnswer;
        }

        return {
          question: question.question,
          userAnswer,
          correctAnswer: question.correctAnswer,
          type: question.type,
          isCorrect,
          explanation: question.explanation,
          options: question.options,
          blanks: question.blanks,
        };
      });

      setReviewAnswers(reviewData);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setFeedback(error.message || 'Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 30) return 'text-red-600 bg-red-50 border-red-200';
    if (timeLeft <= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-violet-600 bg-violet-50 border-violet-200';
  };

  const answeredCount = questions.filter(q => {
    const answer = answers[q._id];
    if (q.type === 'fill-blank') return Array.isArray(answer) && answer.some(a => a);
    return !!answer;
  }).length;

  const progressPercent = (answeredCount / questions.length) * 100;

  const renderQuestionContent = (question) => {
    switch (question.type) {
      case 'true-false':
        return (
          <div className="grid grid-cols-2 gap-3">
            {['true', 'false'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(question._id, option)}
                className={`px-6 py-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                  answers[question._id] === option
                    ? 'border-violet-600 bg-violet-50 text-violet-700 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]'
                    : 'border-gray-200 hover:border-violet-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            {question.blanks?.map((blank, index) => (
              <div key={index} className="flex items-center gap-3 flex-wrap">
                {blank.prefix && (
                  <span className="text-gray-700 text-sm">{blank.prefix}</span>
                )}
                <input
                  type="text"
                  value={(answers[question._id] || [])[index] || ''}
                  onChange={(e) => handleFillBlankAnswer(question._id, index, e.target.value)}
                  className="flex-1 min-w-[150px] px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none"
                  placeholder="Type your answer..."
                />
                {blank.suffix && (
                  <span className="text-gray-700 text-sm">{blank.suffix}</span>
                )}
              </div>
            ))}
          </div>
        );

      case 'short-answer':
        return (
          <div>
            <input
              type="text"
              value={answers[question._id] || ''}
              onChange={(e) => handleAnswerSelect(question._id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none"
              placeholder="Type your answer here..."
            />
          </div>
        );

      case 'multiple-choice':
      default:
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
              const isSelected = answers[question._id] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(question._id, option)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 group ${
                    isSelected
                      ? 'border-violet-600 bg-violet-50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]'
                      : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-semibold transition-colors ${
                        isSelected
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-violet-100 group-hover:text-violet-600'
                      }`}
                    >
                      {letters[index]}
                    </div>
                    <span className={`pt-1 ${isSelected ? 'text-violet-700 font-medium' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        );
    }
  };

  const renderReviewContent = () => {
    return (
      <div className="space-y-6 mt-6">
        {reviewAnswers.map((answer, index) => (
          <div key={index} className={`p-5 rounded-xl border-2 ${
            answer.isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
              {answer.isCorrect ? (
                <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <CheckCircle className="w-4 h-4" /> Correct
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                  <XCircle className="w-4 h-4" /> Incorrect
                </span>
              )}
            </div>

            <p className="text-gray-900 font-medium mb-3">{answer.question}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-500 shrink-0">Your answer:</span>
                <span className={answer.isCorrect ? 'text-emerald-700' : 'text-red-700'}>
                  {Array.isArray(answer.userAnswer)
                    ? answer.userAnswer.join(', ')
                    : (answer.userAnswer || 'No answer')}
                </span>
              </div>

              {!answer.isCorrect && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-500 shrink-0">Correct:</span>
                  <span className="text-emerald-700">{answer.correctAnswer}</span>
                </div>
              )}
            </div>

            {answer.explanation && (
              <div className="mt-3 p-3 bg-white/60 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Explanation: </span>
                  {answer.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Results modal
  if (isTimeUp || isCompleted) {
    const passed = quizResults?.score >= 70;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                passed ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-gradient-to-br from-amber-400 to-amber-600'
              }`}>
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {passed ? 'Excellent Work!' : 'Keep Going!'}
              </h3>
            </div>

            {quizResults ? (
              <div>
                {/* Score circle */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                      <circle
                        cx="60" cy="60" r="50" fill="none"
                        stroke={passed ? '#10b981' : '#f59e0b'}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${(quizResults.score / 100) * 314} 314`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{quizResults.score}%</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-600 mb-6">
                  {passed
                    ? "Congratulations! You've passed the quiz!"
                    : "You didn't pass this time. Review the material and try again."}
                </p>

                {/* Rewards */}
                {passed && (
                  <div className="flex justify-center gap-6 mb-6 p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl border border-violet-100">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-violet-600">+{quizResults.xpGained}</span>
                      <p className="text-xs text-gray-500 mt-0.5">XP Earned</p>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="text-center">
                      <span className="text-2xl font-bold text-emerald-600">+{quizResults.gemsGained}</span>
                      <p className="text-xs text-gray-500 mt-0.5">Gems Earned</p>
                    </div>
                  </div>
                )}

                {/* Review content */}
                {isReviewing && renderReviewContent()}

                {/* Action buttons */}
                <div className="flex flex-col gap-3 mt-6">
                  {!isReviewing && passed && (
                    <button
                      onClick={() => setIsReviewing(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Review Answers
                    </button>
                  )}
                  <button
                    onClick={() => onComplete(null, true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Return to Course
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  {timeLeft <= 0
                    ? "Time's up! Your answers have been submitted."
                    : "Your answers have been submitted."}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Show Results'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswer = (() => {
    const answer = answers[currentQuestion._id];
    if (currentQuestion.type === 'fill-blank') return Array.isArray(answer) && answer.some(a => a);
    return !!answer;
  })();

  return (
    <div className="space-y-6">
      {/* Top bar: progress + timer */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {answeredCount} of {questions.length} answered
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-sm font-semibold ${getTimerColor()}`}>
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question dots navigation */}
      <div className="flex gap-1.5 flex-wrap">
        {questions.map((q, i) => {
          const isAnswered = (() => {
            const a = answers[q._id];
            if (q.type === 'fill-blank') return Array.isArray(a) && a.some(v => v);
            return !!a;
          })();
          return (
            <button
              key={i}
              onClick={() => { setCurrentQuestionIndex(i); setFeedback(''); }}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                i === currentQuestionIndex
                  ? 'bg-violet-600 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]'
                  : isAnswered
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2 leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>
        {renderQuestionContent(currentQuestion)}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">
          {typeof feedback === 'object' ? feedback.message : feedback}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            currentQuestionIndex === 0 || isSubmitting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={currentQuestionIndex === questions.length - 1 ? handleSubmit : handleNext}
          disabled={!hasAnswer || isSubmitting}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            !hasAnswer || isSubmitting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : currentQuestionIndex === questions.length - 1
              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]'
              : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : currentQuestionIndex === questions.length - 1 ? (
            <>
              <Send className="w-4 h-4" />
              Submit Quiz
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
