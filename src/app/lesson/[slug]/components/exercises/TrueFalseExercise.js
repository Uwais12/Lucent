export function TrueFalseExercise({ exercise, onChange, isCompleted }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">{exercise.question}</p>
      <div className="flex gap-4">
        {['True', 'False'].map((option) => (
          <button
            key={option}
            onClick={() => !isCompleted && onChange(option === 'True')}
            className={cn(
              "flex-1 p-3 border rounded-lg transition-colors",
              isCompleted
                ? "cursor-not-allowed bg-gray-50"
                : "hover:bg-gray-50 cursor-pointer"
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