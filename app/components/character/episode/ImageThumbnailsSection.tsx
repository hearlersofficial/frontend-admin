import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

interface ImageThumbnailsSectionProps {
  isOrderAdjustmentMode?: boolean;
  imageOrder?: number[];
  selectedImageIndex?: number;
  isEditing?: boolean;
  sceneCount?: number;
  onReorderImages?: (newOrder: number[]) => void;
  onSelectImage?: (index: number) => void;
  onAddScene?: () => void;
}

const ImageThumbnail = ({ 
  id, 
  index, 
  isSelected, 
  onSelect, 
  isDraggable 
}: { 
  id: number; 
  index: number; 
  isSelected: boolean; 
  onSelect: (id: number) => void; 
  isDraggable: boolean; 
}) => {
  const sortable = useSortable({ id: id.toString(), disabled: !isDraggable });

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
      className={`w-[90px] h-[120px] rounded-lg ${isSelected ? 'bg-pink-200' : 'bg-white'} ${isDraggable ? 'cursor-grab' : 'cursor-pointer'} mr-2`}
      onClick={() => !isDraggable && onSelect(id)}
    >
      <div className="flex items-center justify-center">{index + 1}</div>
      <div className="mx-[7.5px] w-[75px] h-[75px] rounded-lg bg-gray-300" />
    </div>
  );
};

const AddPageButton = ({ onAddScene }: { onAddScene: () => void }) => (
  <Button
    variant="outline"
    onClick={onAddScene}
    className="w-[90px] h-[120px] rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 bg-transparent flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
  >
    <Plus size={24} />
    <span className="text-xs mt-1">페이지 추가</span>
  </Button>
);

const ImageThumbnailsSection = ({ 
  isOrderAdjustmentMode = false, 
  imageOrder = [], 
  selectedImageIndex = 0,
  isEditing = false,
  sceneCount = 0,
  onReorderImages,
  onSelectImage,
  onAddScene
}: ImageThumbnailsSectionProps) => {

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && onReorderImages) {
      const oldIndex = imageOrder.indexOf(Number(active.id));
      const newIndex = imageOrder.indexOf(Number(over?.id));
      const newOrder = [...imageOrder];
      const [movedItem] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, movedItem);
      onReorderImages(newOrder);
    }
  };

  // 페이지 추가 버튼을 표시할지 결정
  const showAddButton = isEditing && !isOrderAdjustmentMode && sceneCount < 15 && onAddScene;

  const content = (
    <div className="flex items-center overflow-x-auto">
      {imageOrder.map((id, index) => (
        <ImageThumbnail
          key={id}
          id={id}
          index={index}
          isSelected={selectedImageIndex === id}
          onSelect={onSelectImage || (() => {})}
          isDraggable={isOrderAdjustmentMode}
        />
      ))}
      {showAddButton && (
        <AddPageButton onAddScene={onAddScene} />
      )}
    </div>
  );

  return (
    <div className="mb-6">
      {isOrderAdjustmentMode ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={imageOrder.map(id => id.toString())} strategy={horizontalListSortingStrategy}>
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