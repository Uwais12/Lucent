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
              <span className="text-base sm:text-lg font-medium text-gray-900">
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
            <div className="p-4 sm:p-6">
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
    <div className="space-y-6 sm:space-y-8">
      {/* Part Header */}
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
          {currentPart.title}
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>{currentPart.duration} minutes</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
        <div className="break-words">
          {/* Add custom styles for code blocks */}
          <style jsx global>{`
            .prose pre {
              overflow-x: auto;
              white-space: pre;
              padding: 1rem;
              border-radius: 0.5rem;
              background-color: #f3f4f6;
              margin: 1.5rem 0;
              font-size: 0.875rem;
              line-height: 1.5;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: thin;
              scrollbar-color: #9ca3af #f3f4f6;
            }
            
            .prose pre::-webkit-scrollbar {
              height: 6px;
            }

            .prose pre::-webkit-scrollbar-track {
              background: #f3f4f6;
              border-radius: 3px;
            }

            .prose pre::-webkit-scrollbar-thumb {
              background-color: #9ca3af;
              border-radius: 3px;
            }
            
            .prose code {
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
              font-size: 0.875rem;
              padding: 0.2rem 0.4rem;
              border-radius: 0.25rem;
              background-color: #f3f4f6;
            }

            .prose pre code {
              padding: 0;
              background-color: transparent;
              border-radius: 0;
              white-space: pre;
            }

            @media (max-width: 640px) {
              .prose pre {
                font-size: 0.75rem;
                padding: 0.75rem;
              }
              
              .prose code {
                font-size: 0.75rem;
                padding: 0.15rem 0.3rem;
              }
            }

            /* Ensure tables are responsive */
            .prose table {
              display: block;
              width: 100%;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }

            /* Ensure images are responsive */
            .prose img {
              max-width: 100%;
              height: auto;
            }
          `}</style>
          {currentPart.content}
        </div>
      </div>
    </div>
  );
} 