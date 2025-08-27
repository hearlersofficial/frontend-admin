import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

interface TechniqueCardProps {
  mode: 'ADDANDDELETE' | 'EDIT' | 'SELECT';
  technique: CounselTechniqueResponseDto;
  selectedCounselTechnique: CounselTechniqueResponseDto;
  setSelectedCounselTechnique: (technique: CounselTechniqueResponseDto) => void;
  setTechniques?: (techniques: CounselTechniqueResponseDto[]) => void;
  techniques?: CounselTechniqueResponseDto[];
  onEditName?: (technique: CounselTechniqueResponseDto) => void;
  onCardClick?: (technique: CounselTechniqueResponseDto) => void;
  mutationModeSelectedTechnique?: CounselTechniqueResponseDto | null;
  techniquesPointingTo?: string[];
}

const TechniqueCard = ({
  mode,
  technique,
  selectedCounselTechnique,
  setSelectedCounselTechnique,
  setTechniques,
  techniques,
  onEditName,
  onCardClick,
  mutationModeSelectedTechnique,
  techniquesPointingTo,
}: TechniqueCardProps) => {
  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id: technique.id! });
  const [theme, setTheme] = useState<'PRIMARY' | 'NORMAL' | 'DISABLED'>('NORMAL');

  useEffect(() => {
    if (mode === 'SELECT' && technique.id === selectedCounselTechnique.id) {
      setTheme('PRIMARY');
    } else if (mode === 'ADDANDDELETE' && mutationModeSelectedTechnique?.id === technique.id) {
      setTheme('PRIMARY');
    } else if (
      mode === 'ADDANDDELETE' &&
      mutationModeSelectedTechnique &&
      techniquesPointingTo?.includes(mutationModeSelectedTechnique.id!)
    ) {
      setTheme('DISABLED');
    } else {
      setTheme('NORMAL');
    }
  }, [mode, technique.id, selectedCounselTechnique.id, mutationModeSelectedTechnique?.id, techniquesPointingTo]);

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

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'PRIMARY':
        return 'border-transparent bg-purpleGrad text-white';
      case 'NORMAL':
        return 'border-[#A99FAA] bg-white text-[#A99FAA]';
      case 'DISABLED':
        return 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none';
      default:
        return 'border-[#A99FAA] bg-white text-[#A99FAA]';
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(technique);
    }
    if (mode === 'SELECT') {
      setSelectedCounselTechnique(technique);
    }
  };

  return (
    <div ref={setNodeRef} className="relative flex flex-col gap-2" style={style} {...attributes} {...listeners}>
      <button
        className={`h-14 w-20 cursor-pointer rounded-lg border-2 p-1 transition-colors ${getThemeClasses(theme)} hover:border-gray-400`}
        onClick={handleCardClick}
        onDoubleClick={handleNameDoubleClick}
      >
        <div
          className={`flex h-full w-full items-center justify-center text-center text-xs font-semibold ${
            theme === 'PRIMARY' ? 'text-white' : 'text-[#A99FAA]'
          }`}
        >
          {technique.name}
        </div>
      </button>
      {mode === 'ADDANDDELETE' && (
        <button
          onClick={handleDelete}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#A99FAA] text-white transition-colors hover:bg-[#A99FAA]/80"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default TechniqueCard;
