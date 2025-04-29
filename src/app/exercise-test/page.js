"use client";

import { Suspense } from 'react';
import DragAndDropTest from '../components/exercises/DragAndDropTest';
import Navbar from "../components/Navbar";

export default function ExerciseTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exercise Testing Page</h1>
          <p className="text-gray-600 mt-2">
            This page is used to test exercise components with sample data.
          </p>
        </div>
        
        <Suspense fallback={<div>Loading test component...</div>}>
          <DragAndDropTest />
        </Suspense>
      </main>
    </div>
  );
} 