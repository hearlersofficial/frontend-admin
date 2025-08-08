import { Episode as APIEpisode } from "~/__generated__/data-contracts";
import { Episode } from "../types";

// API Episode를 UI Episode로 변환
export const mapAPIEpisodeToUIEpisode = (apiEpisode: APIEpisode): Episode => ({
  id: apiEpisode.id || '',
  title: apiEpisode.title || '',
  level: 1, // requiredRapportThreshold 기반으로 매핑 가능
  createdAt: apiEpisode.createdAt 
    ? new Date(apiEpisode.createdAt).toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\. /g, '.').replace(/\./g, '.').slice(0, -1) 
    : '',
  status: apiEpisode.isTemporary ? "임시" : "배포",
  imageUrl: apiEpisode.cutScenes?.[0]?.image || "",
});

// 여러 API Episode를 UI Episode 배열로 변환
export const mapAPIEpisodesToUIEpisodes = (apiEpisodes: APIEpisode[]): Episode[] => 
  apiEpisodes.map(mapAPIEpisodeToUIEpisode);

// 페이지네이션 로직
export const paginateItems = <T>(items: T[], currentPage: number, itemsPerPage: number) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    paginatedItems: items.slice(startIndex, endIndex),
    totalPages
  };
};

// 에피소드 필터링
export const filterEpisodes = (episodes: Episode[], isDraftOnly: boolean): Episode[] => 
  episodes.filter(episode => isDraftOnly ? episode.status === "임시" : true); 