import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageThumbnailsSectionProps {
  isOrderAdjustmentMode?: boolean;
  imageOrder?: number[];
  selectedImageIndex?: number;
  onReorderImages?: (newOrder: number[]) => void;
  onSelectImage?: (index: number) => void;
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
      className={`w-[90px] h-[120px] rounded-lg ${isSelected ? 'bg-pink-200' : 'bg-white'} ${isDraggable ? 'cursor-grab' : 'cursor-pointer'}`}
      onClick={() => !isDraggable && onSelect(id)}
    >
      <div className="flex items-center justify-center">{index + 1}</div>
      <div className="mx-[7.5px] w-[75px] h-[75px] rounded-lg bg-gray-300" />
    </div>
  );
};

const ImageThumbnailsSection = ({ 
  isOrderAdjustmentMode = false, 
  imageOrder = Array.from({ length: 15 }, (_, i) => i), 
  selectedImageIndex = 0,
  onReorderImages,
  onSelectImage 
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