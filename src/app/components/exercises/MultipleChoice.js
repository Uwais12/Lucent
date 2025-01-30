import { useState } from 'react';

export default function MultipleChoice({ exercise, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    const isAnswerCorrect = selectedAnswer === exercise.content.correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect && onComplete) {
      onComplete(exercise.points);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title}</h3>
      <p className="text-gray-600 mb-6">{exercise.description}</p>

      <div className="space-y-4 mb-8">
        <p className="font-medium text-gray-900">{exercise.content.question}</p>

        <div className="space-y-2">
          {exercise.content.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                selectedAnswer === option
                  ? 'border-violet-600 bg-violet-50'
                  : 'border-gray-200 hover:border-violet-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option
                      ? 'border-violet-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedAnswer === option && (
                    <div className="w-2 h-2 rounded-full bg-violet-600" />
                  )}
                </div>
                <span className={selectedAnswer === option ? 'text-violet-900' : 'text-gray-700'}>
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={checkAnswer}
          disabled={selectedAnswer === null}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedAnswer === null
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          Check Answer
        </button>

        {isCorrect !== null && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isCorrect
              ? 'Correct! Well done!'
              : `Incorrect. The correct answer is: ${exercise.content.correctAnswer}`}
          </div>
        )}
      </div>
    </div>
  );
} 