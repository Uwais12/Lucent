import DragAndDrop from './DragAndDrop';
import FillInBlanks from './FillInBlanks';
import MultipleChoice from './MultipleChoice';
import CodeChallenge from './CodeChallenge';

export default function ExerciseWrapper({ exercise, onComplete }) {
  const renderExercise = () => {
    switch (exercise.type) {
      case 'drag-and-drop':
        return <DragAndDrop exercise={exercise} onComplete={onComplete} />;
      case 'fill-in-blanks':
        return <FillInBlanks exercise={exercise} onComplete={onComplete} />;
      case 'multiple-choice':
        return <MultipleChoice exercise={exercise} onComplete={onComplete} />;
      case 'code-challenge':
        return <CodeChallenge exercise={exercise} onComplete={onComplete} />;
      default:
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <p className="text-red-600">
              Unknown exercise type: {exercise.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="my-8">
      {renderExercise()}
    </div>
  );
} 