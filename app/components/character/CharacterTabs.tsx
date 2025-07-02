import { Button } from "~/components/ui/button";
import EpisodeList from "./episode/EpisodeList";
import AddEpisodeModal from "./episode/AddEpisodeModal";
import { useState, useEffect } from 'react';
import { useEpisodeStore } from "~/stores/episodeStore";
import { Episode } from "./types/Episode";

interface CharacterTabsProps {
  characterName: string;
  episodes: Episode[];
  tag: string;
}

const CharacterTabs = ({ characterName, episodes: initialEpisodes, tag }: CharacterTabsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { episodes, setEpisodes } = useEpisodeStore();

  // Initialize episodes in store
  useEffect(() => {
    setEpisodes(initialEpisodes);
  }, [initialEpisodes, setEpisodes]);

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div>
            <h2 className="text-2xl font-bold">{characterName}</h2>
            <span className="text-sm text-white bg-[#A2BBFE99] px-2 py-1 rounded-[6px]">{tag}</span>
          </div>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#8A83A3] text-white hover:bg-[#6E648B] rounded-lg px-6 py-3"
        >
          에피소드 추가
        </Button>
      </div>
      <EpisodeList 
        episodes={episodes} 
        characterName={characterName}
      />
      <AddEpisodeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default CharacterTabs; 