import { Dispatch, SetStateAction, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface InstructionItemTypeWIthColumn {
  id: number;
  index: number;
  body: string;
  column: string;
}
interface DraggableItemProps {
  id: number;
  index: number;
  body: string;
  column: string;
  setItems: Dispatch<SetStateAction<InstructionItemTypeWIthColumn[]>>;
  moveCardHandler: (dragIndex: number, hoverIndex: number, columnName: string) => void;
}

const DraggableItem = ({ id, index, body, column, setItems, moveCardHandler }: DraggableItemProps) => {
  const changeItemColumn = (currentItem: InstructionItemTypeWIthColumn, columnName: string) => {
    setItems((prevState: InstructionItemTypeWIthColumn[]) =>
      prevState.map((e: InstructionItemTypeWIthColumn) => {
        return {
          ...e,
          column: e.body === currentItem.body ? columnName : e.column,
        };
      })
    );
  };
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'INSTRUCTION_ITEM',
    hover(item: { index: number; body: string; columnName: string }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCardHandler(dragIndex, hoverIndex, item.columnName);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'INSTRUCTION_ITEM',
    item: { id, index, body, column },
    end: (item, monitor) => {
      const dropResult: { dropEffect: string; name: string } | null = monitor.getDropResult();
      if (dropResult) {
        const { name } = dropResult;
        switch (name) {
          case 'available':
            changeItemColumn(item, 'available');
            break;
          case 'selected':
            changeItemColumn(item, 'selected');
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="rounded border bg-white p-2" style={{ opacity }}>
      {body}
    </div>
  );
};

export default DraggableItem;
