import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function FillInBlanks({ exercise, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [allOptions, setAllOptions] = useState([]);
  const [blankStatuses, setBlankStatuses] = useState({});

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
    
    // Reset blank status when answer changes
    if (blankStatuses[blankId]) {
      setBlankStatuses(prev => ({
        ...prev,
        [blankId]: null
      }));
    }
  };

  const checkAnswers = () => {
    let allCorrect = true;
    const newBlankStatuses = {};
    
    // Check each blank and set individual status
    exercise.content.blanks.forEach(blank => {
      const isCorrect = answers[blank.id]?.toLowerCase() === blank.answer.toLowerCase();
      newBlankStatuses[blank.id] = isCorrect;
      
      if (!isCorrect) {
        allCorrect = false;
      }
    });
    
    setBlankStatuses(newBlankStatuses);

    if (allCorrect) {
      setFeedback('Correct! All answers are right! 🎉');
      setIsCompleted(true);
      if (onComplete) {
        onComplete(exercise.points);
      }
    } else {
      // Count number of correct answers
      const correctCount = Object.values(newBlankStatuses).filter(Boolean).length;
      const totalCount = exercise.content.blanks.length;
      
      setFeedback(`You got ${correctCount} out of ${totalCount} correct. Check the highlighted answers and try again.`);
    }
  };

  // Split the text by blanks and create select dropdowns
  const renderContent = () => {
    const parts = exercise.content.text.split(/(\[\d+\])/);
    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const blankId = match[1];
        const status = blankStatuses[blankId];
        // Only show status after an answer has been checked
        const showStatus = status !== undefined && status !== null;
        
        return (
          <select
            key={index}
            value={answers[blankId] || ''}
            onChange={(e) => handleAnswerChange(blankId, e.target.value)}
            disabled={isCompleted}
            className={cn(
              "mx-1 px-2 py-1 border-b-2 focus:border-violet-600 outline-none text-center transition-colors rounded",
              isCompleted ? "bg-gray-100 cursor-not-allowed" : "bg-white",
              showStatus && status ? "border-green-500 bg-green-50" : "",
              showStatus && !status ? "border-red-500 bg-red-50" : "",
              !showStatus ? "border-violet-300" : ""
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

  // Render answers with their correct/incorrect status
  const renderAnswerFeedback = () => {
    if (Object.keys(blankStatuses).length === 0) return null;
    
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Answer Status:</h4>
        <ul className="space-y-2">
          {exercise.content.blanks.map(blank => {
            const status = blankStatuses[blank.id];
            const userAnswer = answers[blank.id] || '(no answer)';
            
            return (
              <li key={blank.id} className="flex items-start gap-2">
                <span className={cn(
                  "inline-block w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center text-white text-xs",
                  status ? "bg-green-500" : "bg-red-500"
                )}>
                  {status ? "✓" : "✗"}
                </span>
                <div>
                  <span className="text-gray-700">Blank #{blank.id}: </span>
                  <span className={status ? "text-green-700" : "text-red-700 line-through"}>
                    {userAnswer}
                  </span>

                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
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
          
          {Object.keys(blankStatuses).length > 0 && !isCompleted && (
            <button
              onClick={() => {
                // Reset blank statuses but keep answers
                setBlankStatuses({});
                setFeedback('');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Feedback
            </button>
          )}
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
        
        {Object.keys(blankStatuses).length > 0 && renderAnswerFeedback()}
      </div>
    </div>
  );
} 