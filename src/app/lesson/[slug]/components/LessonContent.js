import { Clock } from "lucide-react";
import { ExerciseComponent } from "./ExerciseComponent";
export function LessonContent({
  lesson,
  currentPartIndex,
  progress,
  onExerciseComplete,
  onPartComplete
}) {
  const currentPart = lesson.parts[currentPartIndex];

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

      {/* Exercise Section */}
      {currentPart.exercise && (
        <ExerciseComponent
          exercise={currentPart.exercise}
          isCompleted={progress.completedExercises.has(currentPartIndex)}
          onComplete={onExerciseComplete}
        />
      )}
    </div>
  );
} 