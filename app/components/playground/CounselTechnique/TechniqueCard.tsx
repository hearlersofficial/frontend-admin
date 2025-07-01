import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

interface TechniqueCardProps {
  mode: 'ADDANDDELETE' | 'EDIT' | 'SELECT';
  technique: CounselTechniqueResponseDto;
  isSelected: boolean;
  setSelected: (id: string) => void;
  setTechniques?: (techniques: CounselTechniqueResponseDto[]) => void;
  techniques?: CounselTechniqueResponseDto[];
}

const TechniqueCard = ({ mode, technique, isSelected, setSelected, setTechniques, techniques }: TechniqueCardProps) => {
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

  return (
    <div ref={setNodeRef} className="flex flex-col gap-2" style={style} {...attributes} {...listeners}>
      <button
        onClick={() => setSelected(technique.id!)}
        className={`h-14 w-20 break-keep rounded-lg border-2 px-2 py-1 text-center text-sm font-semibold leading-tight ${
          isSelected ? 'border-transparent bg-purpleGrad text-white' : 'border-[#A99FAA] text-[#A99FAA]'
        }`}
      >
        <span className="text-xs">{technique.name}</span>
      </button>
      {mode === 'ADDANDDELETE' ? (
        <button
          className="rounded-lg bg-[#F7F2F2] py-1 text-center text-xs font-semibold text-[#D39393]"
          onClick={handleDelete}
        >
          삭제
        </button>
      ) : (
        <span className="rounded-lg bg-[#F2F2F7] py-1 text-center text-xs font-semibold text-[#848484]">
          {technique.messageThreshold}문장
        </span>
      )}
    </div>
  );
};
export default TechniqueCard;
