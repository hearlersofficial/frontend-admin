import { useState } from 'react';

import CharacterList from './CharacterList';
import DeploymentHistoryButton from './DeploymentHistoryButton';
import GptVersionButton from './GptVersionButton';

const characters = [
  { id: '1', name: '다혜', description: '해결' },
  { id: '2', name: '다혜', description: '해결' },
  { id: '3', name: '다혜', description: '해결' },
  { id: '4', name: '다혜', description: '해결' },
];

const Sidebar = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0].id);

  return (
    <div className="flex w-[100px] flex-col justify-between">
      <CharacterList characters={characters} selected={selectedCharacter} onSelect={setSelectedCharacter} />

      <div className="flex flex-col gap-1 pr-2">
        <GptVersionButton />
        <DeploymentHistoryButton />
      </div>
    </div>
  );
};
export default Sidebar;
