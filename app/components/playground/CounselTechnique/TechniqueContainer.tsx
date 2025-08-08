import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import TechniqueCard from './TechniqueCard';
import { Plus } from 'lucide-react';

import { usePromptStore } from '~/store/usePromptStore';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

interface TechniqueContainerProps {
  mode: 'ADDANDDELETE' | 'EDIT' | 'SELECT';
  techniques: CounselTechniqueResponseDto[];
  setTechniques: (techniques: CounselTechniqueResponseDto[]) => void;
  onAddTechnique?: () => void;
  onEditName?: (technique: CounselTechniqueResponseDto) => void;
}

const TechniqueContainer = ({
  mode,
  techniques,
  setTechniques,
  onAddTechnique,
  onEditName,
}: TechniqueContainerProps) => {
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique) || techniques[0];
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);

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

  if (mode !== 'EDIT') {
    return (
      <div className="flex flex-wrap gap-3">
        {techniques.map((technique) => {
          return (
            <TechniqueCard
              key={technique.id}
              mode={mode}
              technique={technique}
              selectedCounselTechnique={selectedCounselTechnique}
              setSelectedCounselTechnique={setSelectedCounselTechnique}
              setTechniques={setTechniques}
              techniques={techniques}
              onEditName={onEditName}
            />
          );
        })}

        {mode === 'ADDANDDELETE' && onAddTechnique && (
          <p className="flex h-14 items-center">
            <button
              onClick={onAddTechnique}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#A99FAA] text-[#A99FAA]"
            >
              <Plus className="h-6 w-6" />
            </button>
          </p>
        )}
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={techniques.map((technique) => technique.id!)} strategy={horizontalListSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {techniques.map((technique) => {
            return (
              <TechniqueCard
                mode={mode}
                key={technique.id}
                technique={technique}
                selectedCounselTechnique={selectedCounselTechnique}
                setSelectedCounselTechnique={setSelectedCounselTechnique}
                setTechniques={setTechniques}
                techniques={techniques}
                onEditName={onEditName}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TechniqueContainer;
