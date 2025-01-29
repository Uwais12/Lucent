"use client";
import { useDrop } from "react-dnd";

export function DefinitionDropZone({ definition, onDropTerm }) {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "term",
    drop: (dragItem) => {
      // Called when a term is dropped
      onDropTerm(dragItem, definition);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className="p-4 bg-gray-700 text-white rounded my-2 min-h-[50px]"
      style={{
        backgroundColor: isOver ? "rgba(0,255,0,0.2)" : "transparent",
        border: canDrop ? "2px dashed green" : "2px dashed gray",
      }}
    >
      <strong>Definition:</strong> {definition}
    </div>
  );
}
