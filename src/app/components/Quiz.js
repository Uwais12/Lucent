import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Quiz({ questions, lessonSlug, onComplete }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (questionId, answer) => {
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
    setIsSubmitting(true);
    // Calculate score
    let correctAnswers = 0;
    console.log('Answers submitted:', answers);
    console.log('Questions:', questions);
    
    questions.forEach((question, index) => {
      console.log('Checking question:', question.question);
      console.log('Selected answer:', answers[index]);
      console.log('Correct answer:', question.correctAnswer);
      
      switch (question.type) {
        case 'true-false':
          if (answers[index]?.toLowerCase() === question.correctAnswer.toLowerCase()) {
            correctAnswers++;
            console.log('True/False correct!');
          }
          break;
        case 'multiple-choice':
          if (answers[index] === question.correctAnswer) {
            correctAnswers++;
            console.log('Multiple choice correct!');
          }
          break;
        case 'fill-blank':
          const allBlanksCorrect = question.blanks.every((blank, blankIndex) => {
            const answer = answers[`${index}-${blankIndex}`]?.toLowerCase().trim();
            const correctAnswer = blank.correctAnswer.toLowerCase().trim();
            return answer === correctAnswer;
          });
          if (allBlanksCorrect) {
            correctAnswers++;
            console.log('Fill in the blank correct!');
          }
          break;
        default:
          console.warn(`Unknown question type: ${question.type}`);
      }
    });

    console.log('Total correct answers:', correctAnswers);
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    console.log('Final score:', finalScore);
    
    setScore(finalScore);
    setShowResults(true);

    // Call onComplete with the score
    if (onComplete) {
      await onComplete(finalScore);
    }

    setIsSubmitting(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestionContent = (question, questionIndex) => {
    switch (question.type) {
      case 'true-false':
        return (
          <div className="flex gap-4">
            {['true', 'false'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(questionIndex, option)}
                className={`flex-1 px-6 py-3 rounded-lg border transition-colors ${
                  answers[questionIndex] === option
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
                  value={answers[`${questionIndex}-${index}`] || ''}
                  onChange={(e) => handleAnswerSelect(`${questionIndex}-${index}`, e.target.value)}
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
                onClick={() => handleAnswerSelect(questionIndex, option)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  answers[questionIndex] === option
                    ? 'border-violet-600 bg-violet-50'
                    : 'border-gray-200 hover:border-violet-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers[questionIndex] === option
                        ? 'border-violet-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {answers[questionIndex] === option && (
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

  if (showResults) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h2>
          <div className="text-4xl font-bold text-violet-600 mb-4">{score}%</div>
          <p className="text-gray-600 mb-6">
            {score >= 80 
              ? "Excellent work! You've mastered this lesson! 🎉"
              : score >= 60
              ? "Good job! You've got a solid understanding! 🌟"
              : "Keep practicing! You might want to review some concepts."}
          </p>
          <button
            onClick={() => router.push(`/lesson/${lessonSlug}`)}
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Return to Lesson
          </button>
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
        <div className={`text-sm font-medium ${
          timeLeft < 60 ? 'text-red-600' : 'text-gray-600'
        }`}>
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentQuestion.question}</h3>
        {renderQuestionContent(currentQuestion, currentQuestionIndex)}
        {feedback && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 text-amber-700 text-sm">
            {feedback}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
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
          disabled={(!answers[currentQuestionIndex] && currentQuestion.type !== 'fill-blank') || isSubmitting}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            (!answers[currentQuestionIndex] && currentQuestion.type !== 'fill-blank') || isSubmitting
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