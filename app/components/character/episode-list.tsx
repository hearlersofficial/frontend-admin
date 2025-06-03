import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

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
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  // Pagination logic will be added later
  const currentPage = 1;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(episodes.length / itemsPerPage);

  const paginatedEpisodes = episodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="space-y-4">
        {paginatedEpisodes.map((episode) => (
          <div
            key={episode.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <Badge
                variant={episode.status === "배포" ? "default" : "outline"}
                className={episode.status === "배포" ? "bg-red-500 text-white" : ""}
              >
                {episode.status}
              </Badge>
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
                <Button variant="outline" size="sm">자세히 보기</Button>
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
    </div>
  );
} 