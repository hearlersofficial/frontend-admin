import { useState } from 'react';

import CharacterList from './CharacterList';
import PromptEditor from './Prompt/Prompt';
import PromptActions from './Prompt/PromptActions';
import PromptLoader from './Prompt/PromptLoader';
import TechniqueSelector from './CounselTechnique/Technique';

const characters = [
  { id: '1', name: '다혜', description: '해결' },
  { id: '2', name: '다혜', description: '해결' },
  { id: '3', name: '다혜', description: '해결' },
  { id: '4', name: '다혜', description: '해결' },
];

const Playground = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0].id);

  return (
    <div className="flex pr-20">
      <div className="w-[100px]">
        <CharacterList characters={characters} selected={selectedCharacter} onSelect={setSelectedCharacter} />
      </div>

      <div
        className={`flex flex-1 rounded-xl bg-white px-8 py-6 ${selectedCharacter === characters[0].id && 'rounded-tl-none'}`}
      >
        <div className="flex flex-1 flex-col gap-6">
          <TechniqueSelector />
          <PromptEditor />

          <PromptActions />
          <PromptLoader />
        </div>
      </div>
    </div>
  );
};
export default Playground;
