import { Button } from "~/components/ui/button";
import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";
import { useEpisodeList } from './hooks';
import { Episode } from "../types";
import EpisodePagination from "./EpisodePagination";
import EpisodeDetailModal from "./EpisodeDetailModal";

interface EpisodeListProps {
  counselorId: string;
  characterName?: string;
}

// 에피소드 아이템 컴포넌트 분리
const EpisodeItem = ({ episode, onViewDetails, onDelete }: {
  episode: Episode;
  onViewDetails: (episode: Episode) => void;
  onDelete: (episode: Episode) => void;
}) => (
  <div className="grid grid-cols-12 gap-4 items-center p-2 border-b last:border-b-0">
    {/* Status */}
    <div className="col-span-1 flex justify-start">
      <span className={`px-3 py-1 rounded-md text-sm font-semibold ${
        episode.status === "배포" 
        ? "bg-[#FCEEEE] text-[#E56D6D]" 
        : "bg-gray-200 text-gray-600"
      }`}>
        {episode.status}
      </span>
    </div>
    
    {/* Title & Thumbnail */}
    <div className="col-span-5 flex items-center space-x-4">
      <div className="w-24 h-16 rounded-lg bg-gray-200"></div>
      <span className="font-medium text-gray-700">{episode.title}</span>
    </div>
    
    {/* Level */}
    <div className="col-span-2 text-center text-gray-600">{episode.level}</div>
    
    {/* Created At */}
    <div className="col-span-2 text-center text-gray-600">{episode.createdAt}</div>
    
    {/* Actions */}
    <div className="col-span-2 flex justify-end space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-[#E9E8ED] border-0 text-gray-600 hover:bg-gray-300 rounded-md"
        onClick={() => onViewDetails(episode)}
      >
        자세히 보기
      </Button>
      <Button
        variant="destructive"
        size="sm"
        className="bg-[#FCEEEE] text-[#E56D6D] hover:bg-red-200 rounded-md"
        onClick={() => onDelete(episode)}
      >
        삭제
      </Button>
    </div>
  </div>
);

// 테이블 헤더 컴포넌트
const TableHeader = () => (
  <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 mb-2 px-4">
    <div className="col-span-1"></div>
    <div className="col-span-5">에피소드 제목</div>
    <div className="col-span-2 text-center">기준 레벨</div>
    <div className="col-span-2 text-center">생성 시각</div>
    <div className="col-span-2"></div>
  </div>
);

const EpisodeList = ({ counselorId, characterName }: EpisodeListProps) => {
  const { openModal } = useEpisodeDetailStore();
  const {
    episodes,
    totalPages,
    currentPage,
    setCurrentPage,
    isDraftOnly,
    setIsDraftOnly,
    isLoading,
    error
  } = useEpisodeList(counselorId);

  const handleViewDetails = (episode: Episode) => {
    console.log(episode);
    openModal(episode);
    
  };

  const handleDelete = (episode: Episode) => {
    console.log('Delete episode:', episode.id);
    // TODO: 삭제 로직 구현
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading episodes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-500">Error loading episodes</div>
      </div>
    );
  }

  console.log(episodes);

  return (
    <div>
      <TableHeader />
      
      {/* Episode List */}
      <div className="space-y-2">
        {episodes.map((episode) => (
          <EpisodeItem
            key={episode.id}
            episode={episode}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
          />
        ))}
      </div>
      
      {/* Controls */}
      <div className="flex justify-between items-center mt-6">
        <Button 
          onClick={() => setIsDraftOnly(!isDraftOnly)} 
          variant="outline" 
          className="rounded-lg"
        >
          {isDraftOnly ? "전체 보기" : "임시저장만 보기"}
        </Button>
        
        <div className="flex-grow">
          <div className="flex justify-center">
            <EpisodePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        
        <div className="w-[120px]"></div>
      </div>

      {/* Episode Detail Modal */}
      <EpisodeDetailModal 
        characterName={characterName}
        counselorId={counselorId}
      />
    </div>
  );
};

export default EpisodeList; 