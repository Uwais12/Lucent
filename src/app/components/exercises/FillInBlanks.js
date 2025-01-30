import { useState } from 'react';

export default function FillInBlanks({ exercise, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerChange = (blankId, value) => {
    setAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));
  };

  const checkAnswers = () => {
    const isAnswerCorrect = exercise.content.blanks.every(blank => 
      answers[blank.id]?.trim().toLowerCase() === blank.answer.toLowerCase()
    );

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect && onComplete) {
      onComplete(exercise.points);
    }
  };

  const renderContent = () => {
    let content = exercise.content.text;
    exercise.content.blanks.forEach((blank, index) => {
      content = content.replace(
        `[${blank.id}]`,
        `<input
          type="text"
          class="mx-1 px-2 py-1 w-32 border-b-2 border-violet-300 focus:border-violet-600 outline-none text-center"
          data-blank-id="${blank.id}"
          placeholder="Type answer..."
        />`
      );
    });

    return content;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title}</h3>
      <p className="text-gray-600 mb-6">{exercise.description}</p>

      <div 
        className="prose prose-violet max-w-none mb-6"
        dangerouslySetInnerHTML={{ 
          __html: renderContent()
        }}
        onChange={(e) => {
          if (e.target.tagName === 'INPUT') {
            handleAnswerChange(e.target.dataset.blankId, e.target.value);
          }
        }}
      />

      <div className="mt-8">
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Check Answers
        </button>

        {isCorrect !== null && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isCorrect ? 'All answers are correct!' : 'Some answers are incorrect. Try again!'}
          </div>
        )}
      </div>
    </div>
  );
} 