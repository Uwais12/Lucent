import { useState } from 'react';
import FillInBlanks from './FillInBlanks';

// Sample fill-in-the-blanks exercise with the format from seedCourse.js
const sampleExercise = {
  type: "fill-in-blanks",
  title: "Fill in the Blanks Test",
  description: "Fill in the blanks to complete this description of database concepts.",
  points: 10,
  difficulty: "beginner",
  content: {
    text: "In a database system, [1] refers to the ability to handle increasing load by adding resources. [2] ensures the database works correctly even when hardware fails. [3] allows modifications to be done efficiently over time.",
    blanks: [
      { id: "1", answer: "scalability" },
      { id: "2", answer: "reliability" },
      { id: "3", answer: "maintainability" }
    ],
    distractors: ["availability", "consistency", "partitioning", "throughput"]
  }
};

// Another sample with more blanks
const advancedExercise = {
  type: "fill-in-blanks",
  title: "System Design Concepts",
  description: "Complete these statements about distributed systems design.",
  points: 15,
  difficulty: "intermediate",
  content: {
    text: "The [1] theorem states that in a distributed system, you can have at most two of: [2], [3], and [4].",
    blanks: [
      { id: "1", answer: "CAP" },
      { id: "2", answer: "Consistency" },
      { id: "3", answer: "Availability" },
      { id: "4", answer: "Partition tolerance" }
    ],
    distractors: ["ACID", "BASE", "PACELC", "Scalability", "Performance", "Reliability"]
  }
};

export default function FillInBlanksTest() {
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
      <h2 className="text-2xl font-bold mb-8">Fill in the Blanks Test</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-700">
          This is a test component with sample data to verify that the fill-in-the-blanks exercise works with the enhanced feedback system.
        </p>
      </div>
      
      <div className="mb-6 flex gap-4">
        <button 
          onClick={() => switchExercise(sampleExercise)}
          className={`px-4 py-2 rounded-lg ${activeExercise === sampleExercise ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Basic Exercise
        </button>
        <button 
          onClick={() => switchExercise(advancedExercise)}
          className={`px-4 py-2 rounded-lg ${activeExercise === advancedExercise ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Advanced Exercise
        </button>
      </div>
      
      <FillInBlanks exercise={activeExercise} onComplete={handleComplete} />
      
      {completed && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <p className="text-green-700 font-bold">Exercise completed! Score: {score}</p>
        </div>
      )}
    </div>
  );
} 