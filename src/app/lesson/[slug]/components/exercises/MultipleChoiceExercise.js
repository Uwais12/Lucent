export function MultipleChoiceExercise({ exercise, onChange, isCompleted }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">{exercise.question}</p>
      <div className="space-y-2">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isCompleted && onChange(option)}
            className={cn(
              "w-full p-3 text-left border rounded-lg transition-colors",
              isCompleted
                ? "cursor-not-allowed bg-gray-50"
                : "hover:bg-gray-50 cursor-pointer",
            )}
            disabled={isCompleted}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 