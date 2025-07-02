import React from "react";
import { Button } from "~/components/ui/button";
import EpisodeDetailModal from "./EpisodeDetailModal";
import { useEpisodeStore } from "~/stores/episodeStore";
import { Episode } from "../types/Episode";
import Pagination from "~/components/Pagination";

interface EpisodeListProps {
  episodes: Episode[];
  characterName?: string;
}

const EpisodeList = ({ episodes, characterName }: EpisodeListProps) => {
  const { openModal } = useEpisodeStore();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isDraftOnly, setIsDraftOnly] = React.useState(false);
  const itemsPerPage = 5;

  const filteredEpisodes = episodes.filter((episode) => isDraftOnly ? episode.status === "임시" : true);
  const totalPages = Math.ceil(filteredEpisodes.length / itemsPerPage);

  const paginatedEpisodes = filteredEpisodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (episode: Episode) => {
    openModal(episode);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [isDraftOnly]);

  return (
    <div>
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 mb-2 px-4">
        <div className="col-span-1"></div> {/* Status */}
        <div className="col-span-5">에피소드 제목</div>
        <div className="col-span-2 text-center">기준 레벨</div>
        <div className="col-span-2 text-center">생성 시각</div>
        <div className="col-span-2"></div> {/* Actions */}
      </div>

      {/* Episode List */}
      <div className="space-y-2">
        {paginatedEpisodes.map((episode) => (
          <div
            key={episode.id}
            className="grid grid-cols-12 gap-4 items-center p-2 border-b last:border-b-0"
          >
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
                onClick={() => handleViewDetails(episode)}
              >
                자세히 보기
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="bg-[#FCEEEE] text-[#E56D6D] hover:bg-red-200 rounded-md"
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls & Filter Button */}
      <div className="flex justify-between items-center mt-6">
        <Button onClick={() => setIsDraftOnly(!isDraftOnly)} variant="outline" className="rounded-lg">
          {isDraftOnly ? "전체 보기" : "임시저장만 보기"}
        </Button>
        
        <div className="flex-grow">
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <div className="w-[120px]"></div> {/* Spacer to balance the left button */}
      </div>

      {/* Episode Detail Modal */}
      <EpisodeDetailModal characterName={characterName} />
    </div>
  );
};

export default EpisodeList; 