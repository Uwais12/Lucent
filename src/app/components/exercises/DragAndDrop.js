import { useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  const matchedItemText = Object.entries(matches).find(([targetId, itemText]) => 
    targetId === target.id
  )?.[1];
  
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
        matchedItemText
          ? 'bg-violet-100 border-violet-200'
          : isOver
          ? 'bg-violet-50 border-violet-300'
          : 'bg-gray-50 border-gray-200'
      } border`}
    >
      <div className="text-sm sm:text-base text-gray-700 break-words">{target.text}</div>
      {matchedItemText && (
        <div className="mt-2 p-2 bg-violet-200 rounded-md">
          <div className="text-sm sm:text-base text-violet-900 break-words">{matchedItemText}</div>
        </div>
      )}
    </div>
  );
};

// Mobile-friendly selection component
const SelectionBased = ({ targets, items, matches, onMatch }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSelectedTarget(null);
  };

  const handleTargetSelect = (target) => {
    setSelectedTarget(target);
    if (selectedItem) {
      onMatch(selectedItem.id, target.id);
      setSelectedItem(null);
      setSelectedTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Step 1: Select an Item</h4>
        <div className="space-y-2">
          {items.map((item, index) => (
            <button
              key={`item-${item.id}-${index}`}
              onClick={() => handleItemSelect(item)}
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                selectedItem && selectedItem.id === item.id
                  ? 'bg-violet-100 border-violet-300'
                  : 'bg-violet-50 border-violet-100 hover:bg-violet-100'
              }`}
            >
              <div className="text-sm sm:text-base break-words">{item.text || item}</div>
            </button>
          ))}
        </div>
      </div>

      <div className={`${!selectedItem ? 'opacity-50' : ''}`}>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Step 2: Select a Target</h4>
        <div className="space-y-2">
          {targets.map((target, index) => {
            const matchedItem = Object.entries(matches).find(([targetId]) => 
              targetId === target.id
            )?.[1];
            
            return (
              <button
                key={`target-${target.id || target.text}-${index}`}
                onClick={() => selectedItem && handleTargetSelect(target)}
                disabled={!selectedItem}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  matchedItem
                    ? 'bg-violet-100 border-violet-200'
                    : selectedTarget && selectedTarget.id === target.id
                    ? 'bg-violet-100 border-violet-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-sm sm:text-base text-gray-700 break-words">{target.text}</div>
                {matchedItem && (
                  <div className="mt-2 p-2 bg-violet-200 rounded-md">
                    <div className="text-sm sm:text-base text-violet-900 break-words">{matchedItem}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function DragAndDrop({ exercise, onComplete }) {
  const [items, setItems] = useState([]);
  const [targets, setTargets] = useState([]);
  const [matches, setMatches] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [useMobileUI, setUseMobileUI] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setUseMobileUI(mobile); // Default to mobile UI on mobile devices
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Process the exercise content to handle both string-based and object-based formats
  useEffect(() => {
    if (!exercise?.content) return;
    
    // Process items - convert from strings to objects if needed
    const processedItems = exercise.content.items.map((item, index) => {
      if (typeof item === 'string') {
        return { id: item, text: item, index };
      }
      return { ...item, index };
    });
    
    // Process targets - convert from strings to objects if needed
    const processedTargets = exercise.content.targets.map((target, index) => {
      if (typeof target === 'string') {
        return { id: target, text: target, index };
      }
      return { ...target, index };
    });
    
    // Shuffle the items for the exercise
    const shuffledItems = [...processedItems].sort(() => Math.random() - 0.5);
    
    setItems(shuffledItems);
    setTargets(processedTargets);
  }, [exercise]);

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
    if (!exercise?.content?.correctPairs || !exercise.content.correctPairs.length) {
      setFeedback("Cannot check answer: exercise data is incomplete");
      return;
    }
    
    setAttempts(prev => prev + 1);
    
    // Check if all matches are correct
    const isAnswerCorrect = exercise.content.correctPairs.every(([itemText, targetText]) => {
      // Find the target with matching text
      const target = targets.find(t => t.text === targetText);
      if (!target) return false;
      
      // Get the matched item for this target
      const matchedItemId = matches[target.id];
      if (!matchedItemId) return false;
      
      // Get the matched item's text
      const matchedItem = items.find(item => item.id === matchedItemId);
      return matchedItem && (matchedItem.text === itemText || matchedItem.id === itemText);
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
  }, [exercise, matches, onComplete, attempts, hintsUsed, items, targets]);

  const resetExercise = useCallback(() => {
    if (!items.length) return;
    
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
    setMatches({});
    setIsCorrect(null);
    setFeedback('');
    setShowHint(false);
  }, [items]);

  const getHint = useCallback(() => {
    if (!exercise?.content?.correctPairs || !exercise.content.correctPairs.length || !targets.length) {
      setFeedback("Cannot provide hint: exercise data is incomplete");
      return;
    }
    
    setHintsUsed(prev => prev + 1);
    setShowHint(true);
    
    // Find first incorrect match or unmatched target
    const unmatched = targets.find(target => !matches[target.id]);
    
    if (unmatched) {
      // Find the correct item for this target
      const correctPair = exercise.content.correctPairs.find(([_, targetText]) => 
        targetText === unmatched.text
      );
      
      if (correctPair) {
        const correctItemText = correctPair[0];
        const correctItem = items.find(item => 
          item.text === correctItemText || item.id === correctItemText
        );
        
        if (correctItem) {
          setFeedback(`Hint: Try matching "${correctItem.text}" with "${unmatched.text}".`);
          return;
        }
      }
    }
    
    // If we got here, look for incorrectly matched targets
    for (const [itemText, targetText] of exercise.content.correctPairs) {
      const target = targets.find(t => t.text === targetText);
      if (!target) continue;
      
      const matchedItemId = matches[target.id];
      if (!matchedItemId) continue;
      
      const matchedItem = items.find(item => item.id === matchedItemId);
      const isCorrect = matchedItem && (matchedItem.text === itemText || matchedItem.id === itemText);
      
      if (!isCorrect) {
        setFeedback(`Hint: The match for "${target.text}" is incorrect. Try a different item.`);
        return;
      }
    }
    
    setFeedback("Keep going, you're on the right track!");
  }, [exercise, matches, items, targets]);

  // If exercise data is not properly formatted, show an error
  if (!exercise?.content || !items.length || !targets.length) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {items.length === 0 || targets.length === 0 
          ? "Loading exercise content..." 
          : "Exercise data is incomplete or improperly formatted."
        }
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
        <p className="text-gray-600 text-sm sm:text-base">{exercise.description}</p>
      </div>

      {/* Toggle between drag-and-drop and selection-based UIs */}
      {isMobile && (
        <div className="mb-4">
          <button
            onClick={() => setUseMobileUI(!useMobileUI)}
            className="text-sm text-violet-600 underline"
          >
            Switch to {useMobileUI ? "drag and drop" : "selection-based"} mode
          </button>
        </div>
      )}

      {/* Main exercise UI */}
      <DndProvider backend={HTML5Backend}>
        {useMobileUI ? (
          <SelectionBased
            targets={targets}
            items={items}
            matches={matches}
            onMatch={handleDrop}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Source Items */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Items to Match</h4>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <DraggableItem
                    key={`item-${item.id || index}`}
                    id={item.id}
                    text={item.text || item.id}
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
                {targets.map((target, index) => (
                  <TargetZone
                    key={`target-${target.id || index}`}
                    target={target}
                    items={items}
                    matches={matches}
                    onDrop={handleDrop}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </DndProvider>

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

        {isMobile && !useMobileUI && (
          <div className="text-xs sm:text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
            Tip: On mobile devices, you may find the selection-based mode easier to use. 
            You can switch modes using the button above.
          </div>
        )}
      </div>
    </div>
  );
} 