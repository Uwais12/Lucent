import { useState } from 'react';

export default function ShortAnswer({ exercise, onComplete }) {
  const [answer, setAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    const isCorrect = answer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase();
    
    if (isCorrect) {
      setFeedback('Correct! Well done! 🎉');
      setIsCompleted(true);
      if (onComplete) {
        onComplete(exercise.points);
      }
    } else {
      setFeedback('Not quite right. Try again!');
      setShowExplanation(true);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title || 'Short Answer Question'}</h3>
      <p className="text-gray-600 mb-6">{exercise.question}</p>

      <div className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isCompleted}
          placeholder="Type your answer here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-colors"
        />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleSubmit}
            disabled={isCompleted}
            className={`px-4 py-2 bg-violet-600 text-white rounded-lg transition-colors ${
              isCompleted ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-violet-700'
            }`}
          >
            Submit Answer
          </button>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg ${
              isCompleted ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {feedback}
          </div>
        )}

        {showExplanation && !isCompleted && (
          <div className="p-3 bg-blue-50 text-blue-700 rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p>{exercise.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
} 