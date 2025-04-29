import { useState } from 'react';
import MultipleChoice from './MultipleChoice';

// Sample multiple choice exercise data matching the structure from seedCourse.js
const sampleExercise = {
  type: "multiple-choice",
  title: "Data System Properties",
  description: "Test your knowledge of fundamental data system properties.",
  points: 10,
  difficulty: "beginner",
  content: {
    question: "Which property ensures a data system remains operational despite hardware failures?",
    options: [
      "Scalability",
      "Reliability",
      "Maintainability",
      "Availability"
    ],
    correctAnswer: "Reliability",
    explanation: "Reliability refers to the system's ability to continue functioning correctly even in the face of hardware or software faults. Scalability is about handling growth, maintainability is about engineering teams making changes over time, and availability is a component of reliability that focuses on uptime."
  }
};

// Another sample exercise with different content
const advancedExercise = {
  type: "multiple-choice",
  title: "Database Transactions",
  description: "Select the correct statement about ACID transactions.",
  points: 15,
  difficulty: "intermediate",
  content: {
    question: "Which statement about ACID transactions is correct?",
    options: [
      "Atomicity means that transactions are executed in parallel for performance",
      "Consistency ensures that a transaction can only see completed changes from other transactions",
      "Isolation means the database is protected against hardware failures",
      "Durability guarantees that completed transactions remain committed even after system failures"
    ],
    correctAnswer: "Durability guarantees that completed transactions remain committed even after system failures",
    explanation: "Durability is the property that ensures once a transaction has been committed, it will remain committed even in the case of a system failure (crash). Atomicity means all operations in a transaction succeed or all fail. Consistency ensures data integrity constraints are maintained. Isolation prevents concurrent transactions from interfering with each other."
  }
};

export default function MultipleChoiceTest() {
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
      <h2 className="text-2xl font-bold mb-8">Multiple Choice Test</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-700">
          This is a test component with sample data to verify that the multiple-choice exercise functionality works correctly.
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
      
      <MultipleChoice exercise={activeExercise} onComplete={handleComplete} />
      
      {completed && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <p className="text-green-700 font-bold">Exercise completed! Score: {score}</p>
        </div>
      )}
    </div>
  );
} 