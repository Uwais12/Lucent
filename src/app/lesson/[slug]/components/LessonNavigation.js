import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LessonNavigation({
  prevLesson,
  nextLesson,
  currentPartIndex,
  totalParts,
  onNavigate,
  showQuizButton,
  onStartQuiz
}) {
  return (
    <div className="flex items-center justify-between border-b pb-6 mb-6">
      {/* Previous Button */}
      <div>
        {currentPartIndex > 0 ? (
          <button
            onClick={() => onNavigate(currentPartIndex - 1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Previous Part</span>
          </button>
        ) : prevLesson ? (
          <Link
            href={`/lesson/${prevLesson.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Previous Lesson</span>
          </Link>
        ) : (
          <div className="w-[120px]" /> {/* Spacer for layout balance */}
        )}
      </div>

      {/* Part Counter */}
      <div className="text-sm font-medium text-gray-500">
        Part {currentPartIndex + 1} of {totalParts}
      </div>

      {/* Next/Quiz Button */}
      <div>
        {showQuizButton && onStartQuiz && (
          <button
            onClick={onStartQuiz}
            className="flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
          >
            <Trophy className="w-5 h-5" />
            <span>Take Quiz</span>
          </button>
        )}
        {!showQuizButton && currentPartIndex < totalParts - 1 && (
          <button
            onClick={() => onNavigate(currentPartIndex + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span className="font-medium">Next Part</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
        {!showQuizButton && currentPartIndex >= totalParts - 1 && nextLesson && (
          <Link
            href={`/lesson/${nextLesson.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span className="font-medium">Next Lesson</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
        {!showQuizButton && currentPartIndex >= totalParts - 1 && !nextLesson && (
          <div className="w-[120px]" /> {/* Spacer for layout balance */}
        )}
      </div>
    </div>
  );
} 