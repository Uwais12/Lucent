import { useState, useCallback } from 'react';

export default function FillInBlanks({ exercise, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [hintsUsed, setHintsUsed] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [partialMatches, setPartialMatches] = useState({});

  const handleAnswerChange = (blankId, value) => {
    setAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));
    // Clear partial match when answer changes
    setPartialMatches(prev => ({
      ...prev,
      [blankId]: null
    }));
  };

  const handleHintClick = (event) => {
    const blankId = event.target.dataset.blankId;
    const blank = exercise.content.blanks.find(b => b.id === blankId);
    if (!blank || hintsUsed[blankId]) return;

    const answer = blank.answer;
    let hint = '';

    if (!hintsUsed[blankId]) {
      // First hint: Show length and first letter
      hint = `${answer[0]}${'_'.repeat(answer.length - 1)} (${answer.length} letters)`;
    }

    setHintsUsed(prev => ({
      ...prev,
      [blankId]: true
    }));

    setFeedback(`Hint for blank #${blankId}: ${hint}`);
  };

  const checkAnswers = () => {
    setAttempts(prev => prev + 1);
    let correctCount = 0;
    const newPartialMatches = {};

    const results = exercise.content.blanks.map(blank => {
      const userAnswer = answers[blank.id]?.trim().toLowerCase() || '';
      const correctAnswer = blank.answer.toLowerCase();
      
      // Check for exact match
      if (userAnswer === correctAnswer) {
        correctCount++;
        newPartialMatches[blank.id] = 'correct';
        return true;
      }
      
      // Check for close match (e.g., typos)
      const similarity = calculateSimilarity(userAnswer, correctAnswer);
      if (similarity > 0.8) {
        newPartialMatches[blank.id] = 'close';
      } else if (similarity > 0.5) {
        newPartialMatches[blank.id] = 'partial';
      } else {
        newPartialMatches[blank.id] = 'incorrect';
      }
      
      return false;
    });

    const isAllCorrect = results.every(r => r);
    setIsCorrect(isAllCorrect);
    setPartialMatches(newPartialMatches);

    // Generate feedback
    if (isAllCorrect) {
      setFeedback(getSuccessFeedback(attempts));
      if (onComplete) {
        const score = Math.max(
          exercise.points - (Object.keys(hintsUsed).length * 2),
          Math.floor(exercise.points * 0.6)
        );
        onComplete(score);
      }
    } else {
      const progress = (correctCount / exercise.content.blanks.length * 100).toFixed(0);
      setFeedback(getIncorrectFeedback(attempts, progress));
    }
  };

  const calculateSimilarity = (str1, str2) => {
    if (str1.length < 1 || str2.length < 1) return 0;
    
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    const longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longerLength - editDistance) / longerLength;
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const getSuccessFeedback = (attempts) => {
    if (attempts === 1) return 'Perfect! You got everything right on your first try! 🎉';
    if (attempts <= 3) return 'Great job! You figured it all out! 🌟';
    return 'Well done! You persevered and got everything correct! ⭐';
  };

  const getIncorrectFeedback = (attempts, progress) => {
    const baseMessage = `Progress: ${progress}% correct. `;
    if (attempts === 1) return baseMessage + 'Keep going! Try to fill in the remaining blanks.';
    if (attempts === 2) return baseMessage + 'Getting closer! Check for any typos.';
    return baseMessage + 'Consider using hints for the tricky ones.';
  };

  const renderContent = () => {
    let content = exercise.content.text;
    exercise.content.blanks.forEach((blank, index) => {
      const isCorrect = partialMatches[blank.id] === 'correct';
      const isClose = partialMatches[blank.id] === 'close';
      const isPartial = partialMatches[blank.id] === 'partial';
      
      const borderColor = isCorrect ? 'border-green-300'
        : isClose ? 'border-yellow-300'
        : isPartial ? 'border-orange-300'
        : 'border-violet-300';
      
      const focusBorderColor = isCorrect ? 'focus:border-green-600'
        : isClose ? 'focus:border-yellow-600'
        : isPartial ? 'focus:border-orange-600'
        : 'focus:border-violet-600';

      const hintButton = !isCorrect && !hintsUsed[blank.id]
        ? `<button
            type="button"
            class="hint-button absolute right-0 top-0 -mt-4 text-xs text-violet-600 hover:text-violet-800"
            data-blank-id="${blank.id}"
          >
            Need a hint?
          </button>`
        : '';

      content = content.replace(
        `[${blank.id}]`,
        `<div class="inline-block relative">
          <input
            type="text"
            class="mx-1 px-2 py-1 w-32 border-b-2 ${borderColor} ${focusBorderColor} outline-none text-center transition-colors"
            data-blank-id="${blank.id}"
            placeholder="Type answer..."
            value="${answers[blank.id] || ''}"
          />
          ${hintButton}
        </div>`
      );
    });

    return content;
  };

  const attachHintHandlers = () => {
    // Add event listeners to hint buttons after the content is rendered
    const hintButtons = document.querySelectorAll('.hint-button');
    hintButtons.forEach(button => {
      button.addEventListener('click', handleHintClick);
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title}</h3>
      <p className="text-gray-600 mb-6">{exercise.description}</p>

      <div 
        ref={node => {
          if (node) {
            // Clean up old listeners
            const oldButtons = node.querySelectorAll('.hint-button');
            oldButtons.forEach(button => {
              button.removeEventListener('click', handleHintClick);
            });
            // Attach new listeners
            attachHintHandlers();
          }
        }}
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

      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={checkAnswers}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Check Answers
          </button>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {feedback}
          </div>
        )}

        {Object.keys(hintsUsed).length > 0 && (
          <div className="text-sm text-gray-500">
            Note: Using hints reduces the points earned for this exercise.
          </div>
        )}

        <div className="text-sm text-gray-500">
          {Object.entries(partialMatches).map(([blankId, status]) => {
            if (status === 'close') {
              return (
                <div key={blankId} className="text-yellow-600">
                  Blank #{blankId}: You're very close! Check for typos.
                </div>
              );
            }
            if (status === 'partial') {
              return (
                <div key={blankId} className="text-orange-600">
                  Blank #{blankId}: You're on the right track, but not quite there.
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
} 