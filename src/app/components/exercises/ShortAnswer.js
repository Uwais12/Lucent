import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ShortAnswer({ exercise, onComplete }) {
  const [answer, setAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkAnswer = () => {
    if (!answer.trim()) return;

    setAttempts(prev => prev + 1);
    
    // Handle array of acceptable answers or single answer
    const correctAnswers = Array.isArray(exercise.content?.acceptableAnswers) 
      ? exercise.content.acceptableAnswers 
      : [exercise.content?.correctAnswer || exercise.correctAnswer];
    
    // Check if answer matches any of the acceptable answers
    const userAnswer = answer.toLowerCase().trim();
    const isCorrect = correctAnswers.some(correct => 
      userAnswer === (typeof correct === 'string' ? correct.toLowerCase().trim() : '')
    );
    
    if (isCorrect) {
      setFeedback(getSuccessFeedback(attempts));
      setIsCompleted(true);
      if (onComplete) {
        // Reduce points for multiple attempts
        const score = Math.max(
          exercise.points - (Math.max(0, attempts - 1) * 2),
          Math.floor(exercise.points * 0.6)
        );
        onComplete(score);
      }
    } else {
      setFeedback(getIncorrectFeedback(attempts));
      setShowExplanation(true);
    }
  };

  const getSuccessFeedback = (attempts) => {
    if (attempts === 1) return 'Perfect! You got it right on your first try! 🎉';
    if (attempts <= 2) return 'Great job! You figured it out! 🌟';
    return 'Well done! You persevered and found the correct answer! ⭐';
  };

  const getIncorrectFeedback = (attempts) => {
    if (attempts === 1) return 'Not quite right. Try again!';
    if (attempts === 2) return 'Still not correct. Check your spelling and formatting.';
    return 'Keep trying! Remember to be precise with your answer.';
  };

  // Get format hint from exercise if available
  const getFormatHint = () => {
    if (exercise.content?.formatHint) return exercise.content.formatHint;
    if (exercise.formatHint) return exercise.formatHint;
    return "Enter the exact answer (spelling and formatting matter)";
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title || 'Short Answer Question'}</h3>
      <p className="text-gray-600 mb-6">{exercise.content?.question || exercise.question}</p>

      <div className="space-y-4">
        <div>
          <div className="mb-2">
            <p className="text-sm text-gray-500 italic">{getFormatHint()}</p>
          </div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isCompleted}
            placeholder="Type your answer here..."
            className={cn(
              "w-full px-4 py-2 border rounded-lg outline-none transition-colors",
              isCompleted 
                ? "bg-gray-100 cursor-not-allowed border-gray-300" 
                : "border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isCompleted) {
                checkAnswer();
              }
            }}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={checkAnswer}
            disabled={isCompleted || !answer.trim()}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              isCompleted 
                ? "bg-gray-400 cursor-not-allowed text-white" 
                : !answer.trim()
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-violet-600 text-white hover:bg-violet-700"
            )}
          >
            Submit Answer
          </button>
          
          {attempts > 0 && !isCompleted && (
            <button
              onClick={() => {
                setAnswer('');
                setFeedback('');
                setShowExplanation(false);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear & Try Again
            </button>
          )}
        </div>

        {feedback && (
          <div
            className={cn(
              "p-3 rounded-lg",
              isCompleted ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'
            )}
          >
            {feedback}
          </div>
        )}

        {showExplanation && (
          <div className="p-3 bg-blue-50 text-blue-700 rounded-lg">
            <p className="font-medium">Hint:</p>
            <p>{exercise.content?.explanation || exercise.explanation}</p>
          </div>
        )}
        
        {attempts > 1 && !isCompleted && (
          <div className="text-xs text-gray-500">
            Note: Multiple attempts will reduce the points earned for this exercise.
          </div>
        )}
      </div>
    </div>
  );
} 