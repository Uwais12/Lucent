import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function DragAndDrop({ exercise, onComplete }) {
  const [items, setItems] = useState(exercise.content.items);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const checkAnswer = () => {
    const isAnswerCorrect = exercise.content.correctPairs.every(([sourceId, targetId], index) => {
      const item = items[index];
      return item.id === sourceId;
    });

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect && onComplete) {
      onComplete(exercise.points);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title}</h3>
      <p className="text-gray-600 mb-6">{exercise.description}</p>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Items to Match</h4>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 bg-violet-50 border border-violet-100 rounded-lg cursor-move hover:bg-violet-100 transition-colors"
                        >
                          {item.text}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Target Concepts</h4>
          <div className="space-y-2">
            {exercise.content.targets.map((target) => (
              <div
                key={target.id}
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                {target.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={checkAnswer}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Check Answer
        </button>

        {isCorrect !== null && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isCorrect ? 'Correct! Well done!' : 'Not quite right. Try again!'}
          </div>
        )}
      </div>
    </div>
  );
} 