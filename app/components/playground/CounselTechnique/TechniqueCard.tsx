import { CounselTechnique } from '~/types/counselTechnique';

interface TechniqueCardProps {
  technique: CounselTechnique;
  isSelected: boolean;
  setSelected: (id: string) => void;
}
const TechniqueCard = ({ technique, isSelected, setSelected }: TechniqueCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setSelected(technique.id)}
        className={`h-14 w-20 break-keep rounded-lg border-2 px-2 py-1 text-center text-sm font-semibold leading-tight ${
          isSelected ? 'border-transparent bg-purpleGrad text-white' : 'border-[#A99FAA] text-[#A99FAA]'
        }`}
      >
        <span className="text-xs">{technique.name}</span>
      </button>
      <span className="rounded-lg bg-[#F2F2F7] py-1 text-center text-xs font-semibold text-[#848484]">
        {technique.sentences}문장
      </span>
    </div>
  );
};
export default TechniqueCard;
