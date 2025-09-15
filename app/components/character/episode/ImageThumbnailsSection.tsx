import { useMemo } from 'react';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";
import { useEpisodeImageStore } from "~/stores/episodeImageStore";

const ImageThumbnail = ({ 
  scene, 
  index, 
  isSelected, 
  onSelect, 
  isDraggable 
}: { 
  scene: { id: string; speaker: string; dialogue: string; image?: string };
  index: number; 
  isSelected: boolean; 
  onSelect: (index: number) => void; 
  isDraggable: boolean; 
}) => {
  const sortable = useSortable({ id: scene.id, disabled: !isDraggable });

  const style = isDraggable ? {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  } : {};

  return (
    <div 
      ref={sortable.setNodeRef}
      style={style}
      {...(isDraggable ? sortable.attributes : {})}
      {...(isDraggable ? sortable.listeners : {})}
      className={`w-[90px] h-[120px] rounded-lg ${isSelected ? 'bg-pink-200' : 'bg-white'} ${isDraggable ? 'cursor-grab' : 'cursor-pointer'} mr-2 overflow-hidden`}
      onClick={() => !isDraggable && onSelect(index)}
    >
      <div className="flex items-center justify-center py-1 text-sm font-medium">{index + 1}</div>
      <div className="mx-[7.5px] w-[75px] h-[75px] rounded-lg bg-gray-300 overflow-hidden">
        {scene.image ? (
          <img 
            src={scene.image} 
            alt={`Scene ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>
    </div>
  );
};

const AddPageButton = () => {
  const addScene = useEpisodeDetailStore(state => state.addScene);
  
  return (
    <Button
      variant="outline"
      onClick={addScene}
      className="w-[90px] h-[120px] rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 bg-transparent flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
    >
      <Plus size={24} />
      <span className="text-xs mt-1">페이지 추가</span>
    </Button>
  );
};

const ImageThumbnailsSection = () => {
  const isEditing = useEpisodeDetailStore(state => state.isEditing);
  const scenes = useEpisodeDetailStore(state => state.editData.scenes);
  const reorderScenes = useEpisodeDetailStore(state => state.reorderScenes);
  
  const isOrderAdjustmentMode = useEpisodeImageStore(state => state.isOrderAdjustmentMode);
  const selectedImageIndex = useEpisodeImageStore(state => state.selectedImageIndex);
  const setSelectedImageIndex = useEpisodeImageStore(state => state.setSelectedImageIndex);

  // 드래그 센서 설정 - 클릭과 드래그를 구분하고 영역 제한
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px 이상 움직여야 드래그 시작
      },
    })
  );

  // 플레이그라운드 방식: 직접 scenes 배열 reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = scenes.findIndex(scene => scene.id === active.id);
      const newIndex = scenes.findIndex(scene => scene.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedScenes = [...scenes];
        const [movedItem] = updatedScenes.splice(oldIndex, 1);
        updatedScenes.splice(newIndex, 0, movedItem);
        
        // 직접 scenes 배열을 reorder
        reorderScenes(updatedScenes);
      }
    }
  };

  const adjustedSelectedIndex = Math.min(selectedImageIndex, scenes.length - 1);
  const showAddButton = isEditing && !isOrderAdjustmentMode && scenes.length < 15;

  // 빈 배열일 때 안전한 처리
  if (scenes.length === 0) {
    return (
      <div className="mb-6">
        <div className="flex items-center overflow-x-auto">
          {showAddButton && <AddPageButton />}
        </div>
      </div>
    );
  }

  const content = (
    <div className="flex items-center overflow-x-auto pb-2" style={{ maxHeight: '140px' }}>
      {scenes.map((scene, index) => (
        <ImageThumbnail
          key={scene.id}
          scene={scene}
          index={index}
          isSelected={index === adjustedSelectedIndex}
          onSelect={setSelectedImageIndex}
          isDraggable={isOrderAdjustmentMode}
        />
      ))}
      {showAddButton && <AddPageButton />}
    </div>
  );

  return (
    <div className="mb-6" style={{ overflow: 'hidden' }}>
      {isOrderAdjustmentMode ? (
        <DndContext 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={scenes.map(scene => scene.id)} strategy={horizontalListSortingStrategy}>
            {content}
          </SortableContext>
        </DndContext>
      ) : (
        content
      )}
    </div>
  );
};

export default ImageThumbnailsSection; 