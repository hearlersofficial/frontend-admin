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
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  };

  return (
    <div ref={setNodeRef} className="flex-col gap-[10px]" style={style} {...attributes} {...listeners}>
      <div className="flex w-[88px] h-[51px] px-[10px] py-[8px] items-center justify-center bg-[#F2F2F7] rounded-[10px]">
        {text}
      </div>
    </div>
  );
};