import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function FillInBlanks({ exercise, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [allOptions, setAllOptions] = useState([]);

  // Create a list of all possible answers for the dropdowns
  useEffect(() => {
    if (exercise && exercise.content && exercise.content.blanks) {
      // Extract all correct answers
      const options = exercise.content.blanks.map(blank => blank.answer);
      
      // Add some common distractors if provided
      if (exercise.content.distractors && Array.isArray(exercise.content.distractors)) {
        options.push(...exercise.content.distractors);
      }
      
      // If no distractors are provided, we'll still have the correct options
      setAllOptions([...new Set(options)].sort(() => Math.random() - 0.5));
    }
  }, [exercise]);

  const handleAnswerChange = (blankId, value) => {
    setAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));
  };

  const checkAnswers = () => {
    const isCorrect = exercise.content.blanks.every(blank => 
      answers[blank.id]?.toLowerCase() === blank.answer.toLowerCase()
    );

    if (isCorrect) {
      setFeedback('Correct! Well done! 🎉');
      setIsCompleted(true);
      if (onComplete) {
        onComplete(exercise.points);
      }
    } else {
      setFeedback('Not quite right. Try again!');
    }
  };

  // Split the text by blanks and create select dropdowns
  const renderContent = () => {
    const parts = exercise.content.text.split(/(\[\d+\])/);
    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const blankId = match[1];
        return (
          <select
            key={index}
            value={answers[blankId] || ''}
            onChange={(e) => handleAnswerChange(blankId, e.target.value)}
            disabled={isCompleted}
            className={cn(
              "mx-1 px-2 py-1 border-b-2 border-violet-300 focus:border-violet-600 outline-none text-center transition-colors rounded",
              isCompleted ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            )}
          >
            <option value="">Select an answer</option>
            {allOptions.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title}</h3>
      <p className="text-gray-600 mb-6">{exercise.description}</p>

      <div className="prose prose-violet max-w-none mb-6">
        {renderContent()}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={checkAnswers}
            disabled={isCompleted}
            className={cn(
              "px-4 py-2 bg-violet-600 text-white rounded-lg transition-colors",
              isCompleted ? "bg-gray-400 cursor-not-allowed" : "hover:bg-violet-700"
            )}
          >
            Check Answers
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
      </div>
    </div>
  );
} 