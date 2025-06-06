import { Button } from "~/components/ui/button";
import EpisodeList from "./episode-list";
import AddEpisodeModal from "./add-episode-modal";
import { useState } from 'react';

interface Episode {
  id: string;
  title: string;
  level: number;
  createdAt: string;
  status: string;
  imageUrl: string;
}

interface CharacterTabsProps {
  characterName: string;
  episodes: Episode[];
}

const CharacterTabs = ({ characterName, episodes }: CharacterTabsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isDraftOnly, setIsDraftOnly] = useState(false);

  return (
    <div className="mt-4 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{characterName} 에피소드</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>에피소드 추가</Button>
      </div>
      <EpisodeList 
        episodes={episodes} 
        isDraftOnly={isDraftOnly} 
        characterName={characterName}
      />
      <div className="mt-6 text-center">
        <Button onClick={() => setIsDraftOnly(!isDraftOnly)} variant="outline">
          {isDraftOnly ? "전체 보기" : "임시저장만 보기"}
        </Button>
      </div>
      <AddEpisodeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
export default CharacterTabs; 