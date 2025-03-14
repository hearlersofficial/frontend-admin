import type { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


export interface TechniqueCardProps {
  id: string
  text: string
  index: number
}

export const TechniqueCard: FC<TechniqueCardProps> = ({ id, text, index}) => {
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    color: "#000",
    cursor: "grab",
    width: "100px",
    height: "100px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {text}
    </div>
  );
};