import TechniqueCard from './TechniqueCard';

import { CounselTechnique } from '~/types/counselTechnique';

interface TechniqueContainerProps {
  techniques: CounselTechnique[];
  selected: string;
  setSelected: (id: string) => void;
}

const TechniqueContainer = ({ techniques, selected, setSelected }: TechniqueContainerProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {techniques.map((technique) => {
        const isSelected = selected === technique.id;

        return (
          <TechniqueCard key={technique.id} technique={technique} isSelected={isSelected} setSelected={setSelected} />
        );
      })}
    </div>
  );
};
export default TechniqueContainer;
