import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import InstructionItemCard from './InstructionItemCard';

import { InstructionItemType } from '~/types/prompt';

interface InstructionContainerProps {
  cards: InstructionItemType[];
  setCards: (cards: InstructionItemType[]) => void;
  containerId: string;
  moveItem: (item: InstructionItemType, containerId: string) => void;
}

const InstructionContainer = ({ cards, setCards, containerId, moveItem }: InstructionContainerProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = cards.findIndex((card) => card?.id === active.id);
      const newIndex = cards.findIndex((card) => card?.id === over?.id);

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
            <div key={card.id} className="flex items-center justify-between gap-1">
              <InstructionItemCard key={card.id} id={card.id} text={card.body} />
              {containerId === 'available' && <button onClick={() => moveItem(card, containerId)}>{'->'}</button>}
              {containerId === 'selected' && <button onClick={() => moveItem(card, containerId)}>X</button>}
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
export default InstructionContainer;
