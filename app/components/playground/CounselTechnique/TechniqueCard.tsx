import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

interface TechniqueCardProps {
  mode: 'ADDANDDELETE' | 'EDIT' | 'SELECT';
  technique: CounselTechniqueResponseDto;
  selectedCounselTechnique: CounselTechniqueResponseDto;
  setSelectedCounselTechnique: (technique: CounselTechniqueResponseDto) => void;
  setTechniques?: (techniques: CounselTechniqueResponseDto[]) => void;
  techniques?: CounselTechniqueResponseDto[];
  onEditName?: (technique: CounselTechniqueResponseDto) => void;
}

const TechniqueCard = ({
  mode,
  technique,
  selectedCounselTechnique,
  setSelectedCounselTechnique,
  setTechniques,
  techniques,
  onEditName,
}: TechniqueCardProps) => {
  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id: technique.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  const handleDelete = () => {
    if (!techniques || !setTechniques) return;

    const updatedTechniques = techniques.filter((tech) => tech.id !== technique.id);
    setTechniques(updatedTechniques);
  };

  const handleNameDoubleClick = () => {
    if (mode === 'EDIT' && onEditName) {
      onEditName(technique);
    }
  };

  return (
    <div ref={setNodeRef} className="relative flex flex-col gap-2" style={style} {...attributes} {...listeners}>
      {mode === 'EDIT' ? (
        <div
          className="h-14 w-20 cursor-pointer rounded-lg border-2 border-[#A99FAA] p-1 hover:border-[#736A84]"
          onDoubleClick={handleNameDoubleClick}
        >
          <div className="flex h-full w-full items-center justify-center text-center text-xs font-semibold text-[#A99FAA]">
            {technique.name}
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setSelectedCounselTechnique(technique);
          }}
          className={`h-14 w-20 break-keep rounded-lg border-2 px-2 py-1 text-center text-sm font-semibold leading-tight ${
            technique.id == selectedCounselTechnique.id
              ? 'border-transparent bg-purpleGrad text-white'
              : 'border-[#A99FAA] bg-white text-[#A99FAA]'
          }`}
        >
          <span className="text-xs">{technique.name}</span>
        </button>
      )}

      {/* 삭제 버튼 - ADDANDDELETE 모드에서만 표시 */}
      {mode === 'ADDANDDELETE' && (
        <button
          onClick={handleDelete}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default TechniqueCard;
