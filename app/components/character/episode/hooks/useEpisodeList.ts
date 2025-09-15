import { useState, useEffect, useMemo } from 'react';
import { useEpisodes } from "~/hooks/queries";
import { filterEpisodes, paginateItems, mapAPIEpisodesToUIEpisodes } from '../utils';

// Episode 목록 관리 훅 (React Query 중심으로 단순화)
export const useEpisodeList = (counselorId: string) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDraftOnly, setIsDraftOnly] = useState(false);
  const itemsPerPage = 5;
  
  // React Query가 counselorId 변경 시 자동으로 새 데이터 페치
  const { data: apiEpisodes = [], isLoading, error } = useEpisodes(counselorId);

  // API 데이터를 UI 형태로 변환
  const episodes = useMemo(() => 
    mapAPIEpisodesToUIEpisodes(apiEpisodes), 
    [apiEpisodes]
  );

  // 필터링 및 페이지네이션
  const filteredEpisodes = useMemo(() => 
    filterEpisodes(episodes, isDraftOnly), 
    [episodes, isDraftOnly]
  );

  const { paginatedItems: paginatedEpisodes, totalPages } = useMemo(() => 
    paginateItems(filteredEpisodes, currentPage, itemsPerPage),
    [filteredEpisodes, currentPage, itemsPerPage]
  );

  // counselorId나 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [counselorId, isDraftOnly]);

  return {
    episodes: paginatedEpisodes,
    totalPages,
    currentPage,
    setCurrentPage,
    isDraftOnly,
    setIsDraftOnly,
    isLoading,
    error
  };
}; 