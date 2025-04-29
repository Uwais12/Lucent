import { useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CheckCircle, XCircle } from 'lucide-react';

const DraggableItem = ({ id, text, index, moveItem, status }) => {
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

  // Add status indicator (correct/incorrect)
  const getStatusStyle = () => {
    if (status === 'correct') return 'border-green-300 bg-green-50';
    if (status === 'incorrect') return 'border-red-300 bg-red-50';
    return 'border-violet-100 bg-violet-50 hover:bg-violet-100';
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-3 border rounded-lg cursor-move transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${getStatusStyle()}`}
    >
      <div className="relative text-sm sm:text-base break-words">
        {text}
        {status === 'correct' && (
          <CheckCircle className="absolute right-0 top-0 w-4 h-4 text-green-500 -mt-2 -mr-2" />
        )}
        {status === 'incorrect' && (
          <XCircle className="absolute right-0 top-0 w-4 h-4 text-red-500 -mt-2 -mr-2" />
        )}
      </div>
    </div>
  );
};

const TargetZone = ({ target, items, matches, onDrop, status }) => {
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

  // Add status indicator styles
  const getStatusStyle = () => {
    if (status === 'correct') return 'border-green-300 bg-green-50';
    if (status === 'incorrect') return 'border-red-300 bg-red-50';
    return matchedItemText 
      ? 'bg-violet-100 border-violet-200'
      : isOver 
      ? 'bg-violet-50 border-violet-300'
      : 'bg-gray-50 border-gray-200';
  };

  return (
    <div
      ref={drop}
      className={`p-3 rounded-lg transition-all min-h-[60px] ${getStatusStyle()} border`}
    >
      <div className="text-sm sm:text-base text-gray-700 break-words">
        {target.text}
        {status === 'correct' && (
          <CheckCircle className="inline-block ml-2 w-4 h-4 text-green-500" />
        )}
        {status === 'incorrect' && (
          <XCircle className="inline-block ml-2 w-4 h-4 text-red-500" />
        )}
      </div>
      {matchedItemText && (
        <div className={`mt-2 p-2 rounded-md ${status === 'correct' ? 'bg-green-200' : status === 'incorrect' ? 'bg-red-200' : 'bg-violet-200'}`}>
          <div className="text-sm sm:text-base text-gray-900 break-words">
            {matchedItemText}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile-friendly selection component
const SelectionBased = ({ targets, items, matches, onMatch, matchStatuses }) => {
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

  // Get status of an item
  const getItemStatus = (itemId) => {
    for (const [targetId, status] of Object.entries(matchStatuses)) {
      if (matches[targetId] === itemId) {
        return status;
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Step 1: Select an Item</h4>
        <div className="space-y-2">
          {items.map((item, index) => {
            const status = getItemStatus(item.id);
            const getStatusStyle = () => {
              if (status === 'correct') return 'bg-green-100 border-green-300';
              if (status === 'incorrect') return 'bg-red-100 border-red-300';
              if (selectedItem && selectedItem.id === item.id) return 'bg-violet-100 border-violet-300';
              return 'bg-violet-50 border-violet-100 hover:bg-violet-100';
            };
            
            return (
              <button
                key={`item-${item.id}-${index}`}
                onClick={() => handleItemSelect(item)}
                className={`w-full p-3 text-left rounded-lg border transition-all ${getStatusStyle()}`}
              >
                <div className="relative text-sm sm:text-base break-words">
                  {item.text || item}
                  {status === 'correct' && (
                    <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                  {status === 'incorrect' && (
                    <XCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`${!selectedItem ? 'opacity-50' : ''}`}>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Step 2: Select a Target</h4>
        <div className="space-y-2">
          {targets.map((target, index) => {
            const matchedItem = Object.entries(matches).find(([targetId]) => 
              targetId === target.id
            )?.[1];
            
            const status = matchStatuses[target.id];
            const getStatusStyle = () => {
              if (status === 'correct') return 'bg-green-100 border-green-300';
              if (status === 'incorrect') return 'bg-red-100 border-red-300';
              if (matchedItem) return 'bg-violet-100 border-violet-200';
              if (selectedTarget && selectedTarget.id === target.id) return 'bg-violet-100 border-violet-300';
              return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
            };
            
            return (
              <button
                key={`target-${target.id || target.text}-${index}`}
                onClick={() => selectedItem && handleTargetSelect(target)}
                disabled={!selectedItem}
                className={`w-full p-3 text-left rounded-lg border transition-all ${getStatusStyle()}`}
              >
                <div className="relative text-sm sm:text-base text-gray-700 break-words">
                  {target.text}
                  {status === 'correct' && (
                    <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                  {status === 'incorrect' && (
                    <XCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                  )}
                </div>
                {matchedItem && (
                  <div className={`mt-2 p-2 rounded-md ${status === 'correct' ? 'bg-green-200' : status === 'incorrect' ? 'bg-red-200' : 'bg-violet-200'}`}>
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
  const [matchStatuses, setMatchStatuses] = useState({});
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

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
    // Reset match statuses when exercise changes
    setMatchStatuses({});
    setShowCorrectAnswers(false);
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
    
    // Reset match status when a new match is made
    setMatchStatuses(prev => ({
      ...prev,
      [targetId]: null
    }));
  }, []);

  const getSuccessFeedback = (attempts) => {
    if (attempts === 1) return 'Perfect! You got it right on your first try! 🎉';
    if (attempts <= 3) return 'Great job! You figured it out! 🌟';
    return 'Well done! You persevered and got it right! ⭐';
  };

  const getIncorrectFeedback = (attempts, correctCount, totalCount) => {
    if (correctCount === 0) {
      return 'None of your matches are correct. Take another look and try different combinations.';
    }
    
    if (correctCount === totalCount - 1) {
      return 'So close! Just one match is incorrect. Check the highlighted pairs and try again.';
    }
    
    return `You have ${correctCount} out of ${totalCount} correct matches. Review the highlighted pairs and try again.`;
  };

  const checkAnswer = useCallback(() => {
    if (!exercise?.content?.correctPairs || !exercise.content.correctPairs.length) {
      setFeedback("Cannot check answer: exercise data is incomplete");
      return;
    }
    
    setAttempts(prev => prev + 1);
    
    // Check each match and track correctness
    const newMatchStatuses = {};
    let correctCount = 0;
    const totalCount = exercise.content.correctPairs.length;
    
    // First, evaluate each matched target
    for (const [targetId, itemId] of Object.entries(matches)) {
      const target = targets.find(t => t.id === targetId);
      if (!target) continue;
      
      // Find the correct pair for this target
      const correctPair = exercise.content.correctPairs.find(([_, targetText]) => 
        targetText === target.text
      );
      
      if (!correctPair) continue;
      
      // Check if the matched item is correct
      const correctItemText = correctPair[0];
      const matchedItem = items.find(item => item.id === itemId);
      
      const isCorrectMatch = matchedItem && 
        (matchedItem.text === correctItemText || matchedItem.id === correctItemText);
      
      newMatchStatuses[targetId] = isCorrectMatch ? 'correct' : 'incorrect';
      
      if (isCorrectMatch) {
        correctCount++;
      }
    }
    
    // Update match statuses
    setMatchStatuses(newMatchStatuses);
    
    // Check if all matches are correct and all targets have matches
    const allCorrect = correctCount === totalCount && 
      Object.keys(matches).length === totalCount;
    
    setIsCorrect(allCorrect);
    
    if (allCorrect) {
      setFeedback(getSuccessFeedback(attempts));
      if (onComplete) {
        const score = Math.max(exercise.points - (hintsUsed * 2), Math.floor(exercise.points * 0.6));
        onComplete(score);
      }
    } else {
      setFeedback(getIncorrectFeedback(attempts, correctCount, totalCount));
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
    setMatchStatuses({});
    setShowCorrectAnswers(false);
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

  // Function to show correct answers
  const revealCorrectAnswers = useCallback(() => {
    const newMatches = {};
    const newMatchStatuses = {};
    
    // Create correct matches based on correctPairs
    exercise.content.correctPairs.forEach(([itemText, targetText]) => {
      const target = targets.find(t => t.text === targetText);
      if (!target) return;
      
      const item = items.find(i => i.text === itemText || i.id === itemText);
      if (!item) return;
      
      newMatches[target.id] = item.id;
      newMatchStatuses[target.id] = 'correct';
    });
    
    setMatches(newMatches);
    setMatchStatuses(newMatchStatuses);
    setShowCorrectAnswers(true);
    setFeedback("Here are the correct answers. Take a moment to study them.");
  }, [exercise, items, targets]);

  // Get the status of an item for displaying in the UI
  const getItemStatus = useCallback((itemId) => {
    for (const [targetId, status] of Object.entries(matchStatuses)) {
      if (matches[targetId] === itemId) {
        return status;
      }
    }
    return null;
  }, [matches, matchStatuses]);

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

  // Render a summary of the match results
  const renderMatchSummary = () => {
    if (Object.keys(matchStatuses).length === 0) return null;
    
    const correctCount = Object.values(matchStatuses).filter(status => status === 'correct').length;
    const incorrectCount = Object.values(matchStatuses).filter(status => status === 'incorrect').length;
    const totalCount = exercise.content.correctPairs.length;
    
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Match Summary:</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-green-100 rounded-md">
            <div className="text-xl font-bold text-green-700">{correctCount}</div>
            <div className="text-sm text-green-600">Correct</div>
          </div>
          <div className="p-2 bg-red-100 rounded-md">
            <div className="text-xl font-bold text-red-700">{incorrectCount}</div>
            <div className="text-sm text-red-600">Incorrect</div>
          </div>
          <div className="p-2 bg-blue-100 rounded-md">
            <div className="text-xl font-bold text-blue-700">{totalCount}</div>
            <div className="text-sm text-blue-600">Total</div>
          </div>
        </div>
      </div>
    );
  };

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
            matchStatuses={matchStatuses}
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
                    status={getItemStatus(item.id)}
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
                    status={matchStatuses[target.id]}
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
          
          <div className="flex-1 sm:flex-none sm:ml-auto flex gap-2">
            <button
              onClick={getHint}
              disabled={isCorrect || hintsUsed >= 3 || showCorrectAnswers}
              className={`px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                isCorrect || hintsUsed >= 3 || showCorrectAnswers
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border border-violet-300 text-violet-700 hover:bg-violet-50'
              }`}
            >
              {hintsUsed >= 3 ? 'No More Hints' : 'Get Hint'}
              {hintsUsed > 0 && hintsUsed < 3 && ` (${3 - hintsUsed} left)`}
            </button>
            
            {!isCorrect && attempts >= 2 && !showCorrectAnswers && (
              <button
                onClick={revealCorrectAnswers}
                className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
              >
                Show Answers
              </button>
            )}
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg text-sm sm:text-base ${
              isCorrect ? 'bg-green-100 text-green-700' : 
              showCorrectAnswers ? 'bg-blue-100 text-blue-700' :
              'bg-amber-50 text-amber-700'
            }`}
          >
            {feedback}
          </div>
        )}

        {Object.keys(matchStatuses).length > 0 && renderMatchSummary()}

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