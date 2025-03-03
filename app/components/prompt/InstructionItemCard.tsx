import type { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface InstructionItemCardProps {
  id: number;
  text: string;
}

const InstructionItemCard: FC<InstructionItemCardProps> = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    backgroundColor: 'white',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {text}
    </div>
  );
};

export default InstructionItemCard;
