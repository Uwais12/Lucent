import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { ExerciseComponent } from "./ExerciseComponent";
import { useState } from "react";

export function LessonContent({
  lesson,
  currentPartIndex,
  progress,
  onExerciseComplete,
  onPartComplete,
  exerciseOnly = false
}) {
  const currentPart = lesson.parts[currentPartIndex];
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);

  // If exerciseOnly is true, only render the exercise section
  if (exerciseOnly) {
    return currentPart.exercise ? (
      <div className="mt-8">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setIsExerciseOpen(!isExerciseOpen)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-900">
                Optional Practice Exercise
              </span>
              {progress.completedExercises.has(currentPartIndex) && (
                <span className="text-sm text-green-600">(Completed)</span>
              )}
            </div>
            {isExerciseOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {isExerciseOpen && (
            <div className="p-6">
              <ExerciseComponent
                exercise={currentPart.exercise}
                isCompleted={progress.completedExercises.has(currentPartIndex)}
                onComplete={onExerciseComplete}
              />
            </div>
          )}
        </div>
      </div>
    ) : null;
  }

  return (
    <div className="space-y-8">
      {/* Part Header */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
          {currentPart.title}
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>{currentPart.duration} minutes</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="break-words overflow-wrap-anywhere">
          {currentPart.content}
        </div>
      </div>
    </div>
  );
} 