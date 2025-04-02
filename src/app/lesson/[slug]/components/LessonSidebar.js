import { ChevronRight, CheckCircle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LessonSidebar({ lesson, course, currentPartIndex, completedExercises, onPartClick }) {
  if (!lesson || !course) {
    return (
      <div className="h-full bg-white p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalParts = lesson.parts.length;
  const completedCount = completedExercises.size;
  const progressPercentage = Math.round((completedCount / totalParts) * 100);

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Course Title */}
      <div className="p-4 border-b">
        <Link 
          href={`/course/${course._id}`}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          {course.title}
        </Link>
        <h2 className="text-lg font-semibold text-gray-900 mt-1">
          {lesson.title}
        </h2>
      </div>

      {/* Parts List - Make it scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Lesson Parts</h3>
          <div className="space-y-2">
            {lesson.parts.map((part, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  currentPartIndex === index
                    ? "bg-violet-50 text-violet-900"
                    : "hover:bg-gray-50",
                  "cursor-pointer"
                )}
                onClick={() => onPartClick(index)}
              >
                <div className="flex-shrink-0">
                  {part.exercise && completedExercises.has(index) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <PlayCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-medium truncate",
                    currentPartIndex === index ? "text-violet-900" : "text-gray-900"
                  )}>
                    {part.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {part.duration} minutes
                    {part.exercise && " • Practice Exercise"}
                  </p>
                </div>

                <ChevronRight 
                  className={cn(
                    "w-5 h-5",
                    currentPartIndex === index ? "text-violet-500" : "text-gray-400"
                  )} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar - Fixed at bottom */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Progress</span>
          <span className="text-sm font-medium text-violet-600">
            {progressPercentage}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
} 