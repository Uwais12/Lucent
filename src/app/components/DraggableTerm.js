"use client";
import { useDrag } from "react-dnd";

export function DraggableTerm({ term, index }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "term", // Must match droppable "accept" type
    item: { term, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className="p-2 bg-blue-600 text-white rounded my-2 cursor-move"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {term}
    </div>
  );
}
