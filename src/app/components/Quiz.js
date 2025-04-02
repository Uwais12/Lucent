import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy } from 'lucide-react';

export default function Quiz({ questions, lessonSlug, onComplete }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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

  const handleAnswerSelect = (questionId, answer) => {
    console.log('Selected answer:', { questionId, answer }); // Debug log
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    setFeedback('');
  };

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
    if (isCompleted) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    try {
      // Convert answers object to array format
      const answersArray = questions.map((question) => {
        const answer = answers[question._id];
        if (!answer) {
          throw new Error(`No answer provided for question "${question.question}"`);
        }

        if (question.type === 'fill-blank') {
          // For fill-in-the-blank questions, ensure we have an array of answers
          return Array.isArray(answer) ? answer : [answer];
        }

        return answer;
      });

      console.log('Submitting answers array:', answersArray);
      await onComplete(answersArray);
      setIsCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setFeedback({
        type: 'error',
        message: error.message || 'Failed to submit quiz. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestionContent = (question) => {
    switch (question.type) {
      case 'true-false':
        return (
          <div className="flex gap-4">
            {['true', 'false'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(question._id, option)}
                className={`flex-1 px-6 py-3 rounded-lg border transition-colors ${
                  answers[question._id] === option
                    ? 'border-violet-600 bg-violet-50 text-violet-700'
                    : 'border-gray-200 hover:border-violet-300 text-gray-700'
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
            {question.blanks.map((blank, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-gray-700">{blank.prefix}</span>
                <input
                  type="text"
                  value={answers[`${question._id}-${index}`] || ''}
                  onChange={(e) => handleAnswerSelect(`${question._id}-${index}`, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Type your answer"
                />
                <span className="text-gray-700">{blank.suffix}</span>
              </div>
            ))}
          </div>
        );

      case 'multiple-choice':
      default:
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question._id, option)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  answers[question._id] === option
                    ? 'border-violet-600 bg-violet-50'
                    : 'border-gray-200 hover:border-violet-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers[question._id] === option
                        ? 'border-violet-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {answers[question._id] === option && (
                      <div className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                    )}
                  </div>
                  <span className="text-gray-700">{option}</span>
                </div>
              </button>
            ))}
          </div>
        );
    }
  };

  if (isTimeUp || isCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz Completed!</h3>
            <p className="text-gray-600 mb-6">
              {timeLeft <= 0 
                ? "Time's up! Your answers have been submitted."
                : "Your answers have been submitted successfully."}
            </p>
            <button
              onClick={() => {
                if (!isCompleted) {
                  // Convert answers object to array format before submitting
                  const answersArray = questions.map((question) => {
                    const answer = answers[question._id];
                    if (!answer) {
                      throw new Error(`No answer provided for question "${question.question}"`);
                    }

                    if (question.type === 'fill-blank') {
                      return Array.isArray(answer) ? answer : [answer];
                    }

                    return answer;
                  });
                  onComplete(answersArray);
                } else {
                  // If already completed, just redirect to the course
                  router.push(`/course-details/${lessonSlug.split('/')[0]}`);
                }
              }}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Return to Course'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      {/* Progress and Timer */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="text-sm font-medium text-violet-600">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>
        {renderQuestionContent(currentQuestion)}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {feedback}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentQuestionIndex === 0 || isSubmitting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
          }`}
        >
          Previous
        </button>
        <button
          onClick={currentQuestionIndex === questions.length - 1 ? handleSubmit : handleNext}
          disabled={(!answers[currentQuestion._id] && currentQuestion.type !== 'fill-blank') || isSubmitting}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            (!answers[currentQuestion._id] && currentQuestion.type !== 'fill-blank') || isSubmitting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <span>{currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next'}</span>
          )}
        </button>
      </div>
    </div>
  );
} 