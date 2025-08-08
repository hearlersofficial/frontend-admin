import { Button } from "~/components/ui/button";
import EpisodeList from "./episode/EpisodeList";
import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";

interface CharacterTabsProps {
  characterName: string;
  counselorId: string;
  tag: string;
  profileImage?: string;
}

const CharacterTabs = ({ characterName, counselorId, tag, profileImage }: CharacterTabsProps) => {
  const { openNewEpisode } = useEpisodeDetailStore();

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt={characterName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300"></div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{characterName}</h2>
            <span className="text-sm text-white bg-[#A2BBFE99] px-2 py-1 rounded-[6px]">{tag}</span>
          </div>
        </div>
        <Button 
          onClick={openNewEpisode}
          className="bg-[#8A83A3] text-white hover:bg-[#6E648B] rounded-lg px-6 py-3"
        >
          에피소드 추가
        </Button>
      </div>
      
      <EpisodeList 
        counselorId={counselorId}
        characterName={characterName}
      />
    </div>
  );
};

export default CharacterTabs; 