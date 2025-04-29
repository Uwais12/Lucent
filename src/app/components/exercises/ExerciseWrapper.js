import { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import FillInBlanks from './FillInBlanks';
import MultipleChoice from './MultipleChoice';
import CodeChallenge from './CodeChallenge';
import ShortAnswer from './ShortAnswer';

export default function ExerciseWrapper({ exercise, onComplete }) {
  const [error, setError] = useState(null);

  // Basic validation for exercise data
  if (!exercise) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <p className="text-red-600">No exercise data provided</p>
      </div>
    );
  }

  // Handle completion with better error handling
  const handleComplete = (score) => {
    try {
      if (typeof onComplete === 'function') {
        onComplete({
          success: true,
          message: 'Exercise completed successfully!',
          score: score || 0
        });
      }
    } catch (error) {
      console.error('Error in exercise completion:', error);
      setError('Failed to record exercise completion');
    }
  };

  const renderExercise = () => {
    try {
    switch (exercise.type) {
      case 'drag-and-drop':
          return <DragAndDrop exercise={exercise} onComplete={handleComplete} />;
      case 'fill-in-blanks':
          return <FillInBlanks exercise={exercise} onComplete={handleComplete} />;
      case 'multiple-choice':
          return <MultipleChoice exercise={exercise} onComplete={handleComplete} />;
      case 'code-challenge':
          return <CodeChallenge exercise={exercise} onComplete={handleComplete} />;
        case 'short-answer':
          return <ShortAnswer exercise={exercise} onComplete={handleComplete} />;
      default:
          return (
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <p className="text-amber-600">
                Exercise type &apos;{exercise.type}&apos; is not currently supported
              </p>
            </div>
          );
      }
    } catch (err) {
      console.error('Error rendering exercise:', err);
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <p className="text-red-600">
            Error rendering exercise: {err.message || 'Unknown error'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="my-8">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {renderExercise()}
    </div>
  );
} 