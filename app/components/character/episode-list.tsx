import { useState } from "react";
import { Button } from "~/components/ui/button";
import EpisodeDetailModal from "./episode-detail-modal";

interface Episode {
  id: string;
  title: string;
  level: number;
  createdAt: string;
  status: string;
  imageUrl: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  isDraftOnly: boolean;
  characterName?: string;
}

const EpisodeList = ({ episodes, isDraftOnly, characterName }: EpisodeListProps) => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const currentPage = 1;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(episodes.length / itemsPerPage);

  const paginatedEpisodes = episodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEpisode(null);
  };

  return (
    <div>
      <div className="space-y-4">
        {paginatedEpisodes.filter((episode) => isDraftOnly ? episode.status === "임시" : true).map((episode) => (
          <div
            key={episode.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div
                className={episode.status === "배포" ? "bg-red-500 text-white px-2 py-1 rounded text-sm" : "px-2 py-1 rounded text-sm bg-gray-200"}
              >
                {episode.status}
              </div>
              <img
                src={episode.imageUrl}
                alt={episode.title}
                className="w-20 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium">{episode.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">{episode.level}</p>
                <p className="text-sm text-gray-500">{episode.createdAt}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewDetails(episode)}
                >
                  자세히 보기
                </Button>
                <Button variant="destructive" size="sm">삭제</Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls - Basic for now */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          {
            '<'
          }
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            size="sm"
          >
            {i + 1}
          </Button>
        ))}
         <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
          {
            '>'
          }
        </Button>
      </div>

      {/* Episode Detail Modal */}
      <EpisodeDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        episode={selectedEpisode}
        characterName={characterName}
      />
    </div>
  );
};
export default EpisodeList; 