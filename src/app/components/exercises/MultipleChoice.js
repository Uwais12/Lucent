import { useState } from 'react';

export default function MultipleChoice({ exercise, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setShowExplanation(false);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    setAttempts(prev => prev + 1);
    const isAnswerCorrect = selectedAnswer === exercise.content.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);

    if (isAnswerCorrect) {
      setFeedback(getSuccessFeedback(attempts));
      if (onComplete) {
        const score = Math.max(
          exercise.points - (Math.max(0, attempts - 1) * 2),
          Math.floor(exercise.points * 0.6)
        );
        onComplete(score);
      }
    } else {
      setFeedback(getIncorrectFeedback(attempts));
    }
  };

  const getSuccessFeedback = (attempts) => {
    if (attempts === 1) return 'Perfect! You got it right on your first try! 🎉';
    if (attempts <= 2) return 'Great job! You figured it out! 🌟';
    return 'Well done! You persevered and found the correct answer! ⭐';
  };

  const getIncorrectFeedback = (attempts) => {
    if (attempts === 1) return 'Not quite right. Try again! Think about the context carefully.';
    if (attempts === 2) return 'Still not correct. Take a moment to review all options.';
    return 'Keep trying! Read the question and each option carefully.';
  };

  const getOptionStyle = (option) => {
    if (!showExplanation) {
      return selectedAnswer === option
        ? 'border-violet-600 bg-violet-50'
        : 'border-gray-200 hover:border-violet-300';
    }

    if (option === exercise.content.correctAnswer) {
      return 'border-green-600 bg-green-50';
    }

    if (selectedAnswer === option && option !== exercise.content.correctAnswer) {
      return 'border-red-300 bg-red-50';
    }

    return 'border-gray-200 opacity-60';
  };

  const getOptionTextStyle = (option) => {
    if (!showExplanation) {
      return selectedAnswer === option ? 'text-violet-900' : 'text-gray-700';
    }

    if (option === exercise.content.correctAnswer) {
      return 'text-green-700';
    }

    if (selectedAnswer === option && option !== exercise.content.correctAnswer) {
      return 'text-red-700';
    }

    return 'text-gray-400';
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{exercise.description}</p>
      </div>

      <div className="space-y-4 mb-6 sm:mb-8">
        <p className="font-medium text-gray-900 text-sm sm:text-base">{exercise.content.question}</p>

        <div className="space-y-2">
          {exercise.content.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswerSelect(option)}
              disabled={showExplanation}
              className={`w-full p-3 sm:p-4 text-left rounded-lg border transition-all ${getOptionStyle(option)}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAnswer === option
                      ? option === exercise.content.correctAnswer && showExplanation
                        ? 'border-green-600'
                        : 'border-violet-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedAnswer === option && (
                    <div 
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                        showExplanation && option === exercise.content.correctAnswer
                          ? 'bg-green-600'
                          : 'bg-violet-600'
                      }`} 
                    />
                  )}
                </div>
                <span className={`text-sm sm:text-base ${getOptionTextStyle(option)}`}>
                  {option}
                </span>
              </div>
              {showExplanation && option === exercise.content.correctAnswer && (
                <div className="mt-2 text-xs sm:text-sm text-green-600 pl-7">
                  ✓ Correct Answer
                </div>
              )}
              {showExplanation && selectedAnswer === option && option !== exercise.content.correctAnswer && (
                <div className="mt-2 text-xs sm:text-sm text-red-600 pl-7">
                  ✗ Your Answer
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 space-y-4">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {!showExplanation ? (
            <button
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                selectedAnswer === null
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedAnswer(null);
                setIsCorrect(null);
                setShowExplanation(false);
                setFeedback('');
              }}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              disabled={isCorrect}
            >
              Try Again
            </button>
          )}
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg text-sm sm:text-base ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {feedback}
          </div>
        )}

        {showExplanation && exercise.content.explanation && (
          <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
            <div className="font-medium mb-1 text-sm sm:text-base">Explanation:</div>
            <div className="text-xs sm:text-sm">{exercise.content.explanation}</div>
          </div>
        )}

        {attempts > 1 && !isCorrect && (
          <div className="text-xs sm:text-sm text-gray-500">
            Note: Multiple attempts will reduce the points earned for this exercise.
          </div>
        )}
      </div>
    </div>
  );
} 