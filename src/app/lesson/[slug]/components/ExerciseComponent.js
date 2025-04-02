import { useState } from 'react';
import { cn } from "@/lib/utils";
import ExerciseWrapper from "@/app/components/exercises/ExerciseWrapper";

export function ExerciseComponent({ exercise, isCompleted, onComplete }) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8 space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Practice Exercise
      </h3>
      
      <div className="space-y-4">
        <ExerciseWrapper 
          exercise={exercise}
          onComplete={(result) => {
            setFeedback({
              type: result.success ? 'success' : 'error',
              message: result.message
            });
            if (result.success) {
              onComplete();
            }
          }}
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
