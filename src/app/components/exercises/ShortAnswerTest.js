import { useState } from 'react';
import ShortAnswer from './ShortAnswer';

// Sample short answer exercise with basic structure
const sampleExercise = {
  type: "short-answer",
  title: "Basic OO Principle",
  description: "Test your knowledge of object-oriented design principles.",
  points: 10,
  difficulty: "beginner",
  content: {
    question: "What OO principle involves hiding implementation details behind a simpler interface?",
    correctAnswer: "Abstraction",
    acceptableAnswers: ["Abstraction", "abstraction", "data abstraction"],
    formatHint: "Enter the name of the OO principle (e.g., 'Polymorphism')",
    explanation: "Abstraction is the principle of hiding complex implementation details behind a simple interface, allowing users to interact with the object without knowing its internal workings."
  }
};

// Another sample with multiple acceptable answers
const advancedExercise = {
  type: "short-answer",
  title: "Design Principles",
  description: "Test your knowledge of the SOLID principles.",
  points: 15,
  difficulty: "intermediate",
  content: {
    question: "What does the 'S' in SOLID stand for?",
    correctAnswer: "Single Responsibility Principle",
    acceptableAnswers: [
      "Single Responsibility Principle", 
      "Single Responsibility", 
      "SRP"
    ],
    formatHint: "Enter the full name of the principle",
    explanation: "The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one responsibility or job."
  }
};

export default function ShortAnswerTest() {
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
      <h2 className="text-2xl font-bold mb-8">Short Answer Test</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-700">
          This is a test component with sample data to verify that the short-answer exercise functionality works correctly.
          It demonstrates format hints, multiple acceptable answers, and adaptive feedback.
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
      
      <ShortAnswer exercise={activeExercise} onComplete={handleComplete} />
      
      {completed && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <p className="text-green-700 font-bold">Exercise completed! Score: {score}</p>
        </div>
      )}
    </div>
  );
} 