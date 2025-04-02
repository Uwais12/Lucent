export function FillInBlanksExercise({ exercise, onChange, isCompleted }) {
  const handleChange = (index, value) => {
    const answers = exercise.blanks.map((_, i) => 
      i === index ? value : document.querySelector(`input[name="blank-${i}"]`)?.value || ''
    );
    onChange(answers);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-700">{exercise.question}</p>
      <div className="space-y-3">
        {exercise.blanks.map((blank, index) => (
          <input
            key={index}
            type="text"
            name={`blank-${index}`}
            placeholder={blank.placeholder || "Type your answer"}
            onChange={(e) => handleChange(index, e.target.value)}
            disabled={isCompleted}
            className={cn(
              "w-full p-2 border rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              isCompleted ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
} 