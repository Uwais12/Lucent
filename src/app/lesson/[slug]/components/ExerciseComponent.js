import { useState } from 'react';
import { cn } from "@/lib/utils";
import ExerciseWrapper from "@/app/components/exercises/ExerciseWrapper";

export function ExerciseComponent({ exercise, isCompleted, onComplete }) {
  const [feedback, setFeedback] = useState("");

  // Handler for exercise completion
  const handleExerciseComplete = (result) => {
    // Set feedback message from the result
    setFeedback({
      type: result.success ? 'success' : 'error',
      message: result.message
    });
    
    // If successful, call the parent's onComplete with the score
    if (result.success && typeof onComplete === 'function') {
      onComplete(result.score);
    }
  };

  if (!exercise) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8 space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Practice Exercise
      </h3>
      
      <div className="space-y-4">
        <ExerciseWrapper 
          exercise={exercise}
          onComplete={handleExerciseComplete}
        />

        {feedback && (
          <div className={cn(
            "p-4 rounded-lg",
            feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          )}>
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
} 
