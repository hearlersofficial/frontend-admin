import type { FC } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { TechniqueCard } from "./TechniqueCard";

interface TechniqueContainerProps {
  cards: string[];
  setCards: (cards: string[]) => void;
}

export const TechniqueContainer: FC<TechniqueContainerProps> = ({
  cards,
  setCards,
  }) => {
    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        const oldIndex = cards.indexOf(active.id as string);
        const newIndex = cards.indexOf(over?.id as string);
        const updatedCards = [...cards];
        updatedCards.splice(oldIndex, 1);
        updatedCards.splice(newIndex, 0, active.id as string);
        setCards(updatedCards);
      }
    };

    return (
      <DndContext
        id="dnd-context"
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={cards} strategy={horizontalListSortingStrategy}>
          <div className="flex gap-3">
            {cards.map((card, index) => (
              <TechniqueCard key={card} id={card} text={card} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  };
