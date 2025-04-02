import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { cn } from "@/lib/utils";

export function DragAndDropExercise({ exercise, onChange, isCompleted }) {
  const [items, setItems] = useState(exercise?.items || []);

  // If no exercise or items, show placeholder
  if (!exercise || !exercise.items) {
    return (
      <div className="p-4 text-gray-500">
        Exercise content not available
      </div>
    );
  }

  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <p className="text-gray-700">{exercise.question}</p>
        <div className="space-y-2">
          {items.map((item, index) => (
            <DraggableItem
              key={item.id || index}
              index={index}
              text={item.text}
              moveItem={moveItem}
              isCompleted={isCompleted}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

function DraggableItem({ text, index, moveItem, isCompleted }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isCompleted,
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
      className={cn(
        "p-3 bg-white border rounded-lg cursor-move",
        "transition-colors duration-200",
        isDragging ? "opacity-50" : "opacity-100",
        isCompleted ? "cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"
      )}
    >
      {text}
    </div>
  );
} 