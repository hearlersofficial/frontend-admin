import TechniqueCard from './TechniqueCard';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { CounselTechnique } from '~/types/counselTechnique';

interface TechniqueContainerProps {
  mode: "ADDANDDELETE" | "EDIT" | "SELECT";
  techniques: CounselTechnique[];
  selected: string;
  setSelected: (id: string) => void;
  setTechniques: (techniques: CounselTechnique[]) => void;
}

const TechniqueContainer = ({ mode, techniques, selected, setSelected, setTechniques }: TechniqueContainerProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = techniques.findIndex((technique) => technique.id === active.id);
      const newIndex = techniques.findIndex((technique) => technique.id === over?.id);
      const updatedTechniques = [...techniques];
      const movedItem = updatedTechniques.splice(oldIndex, 1)[0];
      updatedTechniques.splice(newIndex, 0, movedItem);
      setTechniques(updatedTechniques);
    }
  };

  if (mode !== "EDIT") {
    return (
      <div className="flex flex-wrap gap-3">
        {techniques.map((technique) => {
          const isSelected = selected === technique.id;

          return (
            <TechniqueCard 
              key={technique.id} 
              mode={mode} 
              technique={technique} 
              isSelected={isSelected} 
              setSelected={setSelected}
              setTechniques={setTechniques}
              techniques={techniques} 
            />
          );
        })}
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={techniques.map((technique) => technique.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {techniques.map((technique) => {
            return (
              <TechniqueCard 
                mode={mode} 
                key={technique.id} 
                technique={technique} 
                isSelected={false} 
                setSelected={setSelected}
                setTechniques={setTechniques}
                techniques={techniques}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};
export default TechniqueContainer;
