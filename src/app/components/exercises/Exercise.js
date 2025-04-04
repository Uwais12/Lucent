import MultipleChoice from './MultipleChoice';
import FillInBlanks from './FillInBlanks';
import ShortAnswer from './ShortAnswer';

export default function Exercise({ exercise, onComplete }) {
  switch (exercise.type) {
    case 'multiple-choice':
      return <MultipleChoice exercise={exercise} onComplete={onComplete} />;
    case 'fill-in-blanks':
      return <FillInBlanks exercise={exercise} onComplete={onComplete} />;
    case 'short-answer':
      return <ShortAnswer exercise={exercise} onComplete={onComplete} />;
    default:
      return <div>Unsupported exercise type: {exercise.type}</div>;
  }
} 