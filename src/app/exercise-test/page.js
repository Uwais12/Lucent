"use client";

import { useState, Suspense } from 'react';
import DragAndDropTest from '../components/exercises/DragAndDropTest';
import FillInBlanksTest from '../components/exercises/FillInBlanksTest';
import MultipleChoiceTest from '../components/exercises/MultipleChoiceTest';
import ShortAnswerTest from '../components/exercises/ShortAnswerTest';
import Navbar from "../components/Navbar";

export default function ExerciseTestPage() {
  const [activeExercise, setActiveExercise] = useState('fill-in-blanks');
  
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exercise Testing Page</h1>
          <p className="text-gray-600 mt-2">
            This page allows you to test different types of exercises. Select an exercise type below.
          </p>
        </div>
        
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveExercise('fill-in-blanks')}
            className={`px-4 py-2 rounded-lg ${activeExercise === 'fill-in-blanks' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Fill in the Blanks
          </button>
          <button
            onClick={() => setActiveExercise('drag-and-drop')}
            className={`px-4 py-2 rounded-lg ${activeExercise === 'drag-and-drop' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Drag and Drop
          </button>
          <button
            onClick={() => setActiveExercise('multiple-choice')}
            className={`px-4 py-2 rounded-lg ${activeExercise === 'multiple-choice' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Multiple Choice
          </button>
          <button
            onClick={() => setActiveExercise('short-answer')}
            className={`px-4 py-2 rounded-lg ${activeExercise === 'short-answer' ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Short Answer
          </button>
        </div>
        
        <Suspense fallback={<div>Loading test component...</div>}>
          {activeExercise === 'fill-in-blanks' && <FillInBlanksTest />}
          {activeExercise === 'drag-and-drop' && <DragAndDropTest />}
          {activeExercise === 'multiple-choice' && <MultipleChoiceTest />}
          {activeExercise === 'short-answer' && <ShortAnswerTest />}
        </Suspense>
      </main>
    </>
  );
} 