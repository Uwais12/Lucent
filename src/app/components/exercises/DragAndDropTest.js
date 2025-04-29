import { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Sample exercise data matching the exact structure in seedCourse.js
const sampleExercise = {
  type: "drag-and-drop",
  title: "Mini Exercise: Key Concerns & Goals",
  description: "Match each key design concern with its primary goal.",
  points: 10,
  difficulty: "beginner",
  content: {
    items: ["Reliability", "Scalability", "Maintainability"],
    targets: [
      "[System works correctly despite faults]",
      "[System handles load growth gracefully]",
      "[System can be worked on productively by different people over time]"
    ],
    correctPairs: [
      ["Reliability", "[System works correctly despite faults]"],
      ["Scalability", "[System handles load growth gracefully]"],
      [
        "Maintainability",
        "[System can be worked on productively by different people over time]"
      ]
    ]
  }
};

// Sample data for window types as another example
const windowTypesExercise = {
  type: "drag-and-drop",
  title: "Mini Exercise: Window Types Examples",
  description: "Match window types to use cases.",
  points: 10,
  difficulty: "beginner",
  content: {
    items: ["Tumbling", "Hopping", "Sliding", "Session"],
    targets: [
      "[Calculate metrics every minute for the preceding minute]",
      "[Calculate metrics every 10 seconds for the preceding minute]",
      "[Calculate metrics for the last 5 minutes from now]",
      "[Group user clicks separated by >30 mins inactivity]"
    ],
    correctPairs: [
      ["Tumbling", "[Calculate metrics every minute for the preceding minute]"],
      ["Hopping", "[Calculate metrics every 10 seconds for the preceding minute]"],
      ["Sliding", "[Calculate metrics for the last 5 minutes from now]"],
      ["Session", "[Group user clicks separated by >30 mins inactivity]"]
    ]
  }
};

export default function DragAndDropTest() {
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeExercise, setActiveExercise] = useState(sampleExercise);

  const handleComplete = (points) => {
    setCompleted(true);
    setScore(points);
    console.log('Exercise completed with score:', points);
  };

  const switchExercise = (exercise) => {
    setActiveExercise(exercise);
    setCompleted(false);
    setScore(0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Drag and Drop Test</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-700">
          This is a test component with sample data from the course to verify that drag and drop functionality works.
        </p>
      </div>
      
      <div className="mb-6 flex gap-4">
        <button 
          onClick={() => switchExercise(sampleExercise)}
          className={`px-4 py-2 rounded-lg ${activeExercise === sampleExercise ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Key Concerns Exercise
        </button>
        <button 
          onClick={() => switchExercise(windowTypesExercise)}
          className={`px-4 py-2 rounded-lg ${activeExercise === windowTypesExercise ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Window Types Exercise
        </button>
      </div>
      
      <DragAndDrop exercise={activeExercise} onComplete={handleComplete} />
      
      {completed && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <p className="text-green-700 font-bold">Exercise completed! Score: {score}</p>
        </div>
      )}
    </div>
  );
} 