import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { ExerciseComponent } from "./ExerciseComponent";
import { useState } from "react";
import { marked } from "marked";
import DOMPurify from 'dompurify';

// Configure marked options for consistent rendering
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
  smartLists: true,
  smartypants: true
});

const renderer = new marked.Renderer();
renderer.code = (code, language) => {
  return `<pre class="relative overflow-x-auto p-4 bg-gray-100 rounded-lg text-sm mb-4">
    <code class="language-${language || 'text'} whitespace-pre font-mono block">${code}</code>
  </pre>`;
};

renderer.codespan = (code) => {
  return `<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">${code}</code>`;
};

marked.use({ renderer });

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
              <span className="text-base sm:text-lg font-medium text-gray-900 break-words">
                Optional Practice Exercise
              </span>
              {progress.completedExercises.has(currentPartIndex) && (
                <span className="text-sm text-green-600">(Completed)</span>
              )}
            </div>
            {isExerciseOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
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
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
          {currentPart.title}
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{currentPart.duration} minutes</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-violet max-w-none prose-headings:font-bold prose-headings:break-words prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-li:mb-1 prose-li:break-words prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-blockquote:border-l-4 prose-blockquote:border-violet-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-img:rounded-lg prose-img:max-w-full prose-img:h-auto">
        <div 
          className="break-words"
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(marked(currentPart.content.trim()))
          }}
        />
      </div>
    </div>
  );
} 