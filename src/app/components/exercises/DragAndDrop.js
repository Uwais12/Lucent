import { useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableItem = ({ id, text, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-3 bg-violet-50 border border-violet-100 rounded-lg cursor-move transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } hover:bg-violet-100 active:bg-violet-200 touch-manipulation`}
    >
      <div className="text-sm sm:text-base break-words">{text}</div>
    </div>
  );
};

const TargetZone = ({ target, items, matches, onDrop }) => {
  const matchedItem = items.find((item) => matches[target.id] === item.id);
  
  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item) => onDrop(item.id, target.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`p-3 rounded-lg transition-all min-h-[60px] ${
        matchedItem
          ? 'bg-violet-100 border-violet-200'
          : isOver
          ? 'bg-violet-50 border-violet-300'
          : 'bg-gray-50 border-gray-200'
      } border`}
    >
      <div className="text-sm sm:text-base text-gray-700 break-words">{target.text}</div>
      {matchedItem && (
        <div className="mt-2 p-2 bg-violet-200 rounded-md">
          <div className="text-sm sm:text-base text-violet-900 break-words">{matchedItem.text}</div>
        </div>
      )}
    </div>
  );
};

export default function DragAndDrop({ exercise, onComplete }) {
  const [items, setItems] = useState([]);
  const [matches, setMatches] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize with shuffled items
  useEffect(() => {
    const shuffledItems = [...exercise.content.items].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
  }, [exercise.content.items]);

  const moveItem = useCallback((fromIndex, toIndex) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return newItems;
    });
  }, []);

  const handleDrop = useCallback((itemId, targetId) => {
    setMatches((prev) => ({
      ...prev,
      [targetId]: itemId,
    }));
    setShowHint(false);
  }, []);

  const getSuccessFeedback = (attempts) => {
    if (attempts === 1) return 'Perfect! You got it right on your first try! 🎉';
    if (attempts <= 3) return 'Great job! You figured it out! 🌟';
    return 'Well done! You persevered and got it right! ⭐';
  };

  const getIncorrectFeedback = (attempts) => {
    if (attempts === 1) return 'Not quite right. Try again! Remember to think about the relationships between concepts.';
    if (attempts === 2) return 'Still not correct. Take a moment to review each pair carefully.';
    return 'Keep trying! Consider using a hint if you need help.';
  };

  const checkAnswer = useCallback(() => {
    setAttempts(prev => prev + 1);
    const isAnswerCorrect = exercise.content.correctPairs.every(([sourceId, targetId]) => {
      const matchedItemId = matches[targetId];
      return matchedItemId === sourceId;
    });

    setIsCorrect(isAnswerCorrect);
    setFeedback(
      isAnswerCorrect
        ? getSuccessFeedback(attempts)
        : getIncorrectFeedback(attempts)
    );

    if (isAnswerCorrect && onComplete) {
      const score = Math.max(exercise.points - (hintsUsed * 2), Math.floor(exercise.points * 0.6));
      onComplete(score);
    }
  }, [exercise, matches, onComplete, attempts, hintsUsed]);

  const resetExercise = useCallback(() => {
    const shuffledItems = [...exercise.content.items].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
    setMatches({});
    setIsCorrect(null);
    setFeedback('');
    setShowHint(false);
  }, [exercise.content.items]);

  const getHint = useCallback(() => {
    setHintsUsed(prev => prev + 1);
    setShowHint(true);
    // Find first incorrect match or unmatched item
    const incorrectMatch = exercise.content.correctPairs.find(([sourceId, targetId]) => {
      const matchedItemId = matches[targetId];
      return matchedItemId !== sourceId;
    });
    if (incorrectMatch) {
      setFeedback(`Hint: Try matching "${items.find(item => item.id === incorrectMatch[0]).text}" with a related concept.`);
    }
  }, [exercise.content.correctPairs, matches, items]);

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{exercise.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Source Items */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Items to Match</h4>
          <div className="space-y-2">
            {items.map((item, index) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                text={item.text}
                index={index}
                moveItem={moveItem}
              />
            ))}
          </div>
        </div>

        {/* Target Zones */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Target Concepts</h4>
          <div className="space-y-2">
            {exercise.content.targets.map((target) => (
              <TargetZone
                key={target.id}
                target={target}
                items={items}
                matches={matches}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 space-y-4">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={checkAnswer}
            className="flex-1 sm:flex-none px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm sm:text-base"
          >
            Check Answer
          </button>
          <button
            onClick={resetExercise}
            className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Shuffle & Reset
          </button>
          <button
            onClick={getHint}
            disabled={isCorrect || hintsUsed >= 3}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
              isCorrect || hintsUsed >= 3
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border border-violet-300 text-violet-700 hover:bg-violet-50'
            }`}
          >
            {hintsUsed >= 3 ? 'No More Hints' : 'Get Hint'}
            {hintsUsed > 0 && hintsUsed < 3 && ` (${3 - hintsUsed} left)`}
          </button>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg text-sm sm:text-base ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {feedback}
          </div>
        )}

        {hintsUsed > 0 && (
          <div className="text-xs sm:text-sm text-gray-500">
            Note: Using hints reduces the points earned for this exercise.
          </div>
        )}

        {isMobile && (
          <div className="text-xs sm:text-sm text-gray-500 mt-2">
            Tip: Tap and hold an item to drag it to a target zone.
          </div>
        )}
      </div>
    </div>
  );
} 