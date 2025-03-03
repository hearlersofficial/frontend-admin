import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import InstructionItemCard from './InstructionItemCard';

import { InstructionItemType } from '~/types/modal';

interface InstructionContainerProps {
  cards: InstructionItemType[];
  setCards: (cards: InstructionItemType[]) => void;
}

const InstructionContainer = ({ cards, setCards }: InstructionContainerProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeId = Number(active.id);
    const overId = Number(over?.id);

    if (active.id !== over?.id) {
      const oldIndex = cards.findIndex((card) => card?.id === activeId);
      const newIndex = cards.findIndex((card) => card?.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedCards = [...cards];
        const [movedCard] = updatedCards.splice(oldIndex, 1);
        updatedCards.splice(newIndex, 0, movedCard);
        setCards(updatedCards);
      }
    }
  };

  return (
    <DndContext id="dnd-context" collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={cards.map((card) => card.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {cards.map((card) => (
            <InstructionItemCard key={card.id} id={card.id} text={card.body} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
export default InstructionContainer;
