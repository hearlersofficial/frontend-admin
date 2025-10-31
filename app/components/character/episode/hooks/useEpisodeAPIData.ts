import { useEpisodeDetail as useEpisodeDetailAPI } from "~/hooks/queries/useEpisodeDetail";
import { useCounselor } from "~/hooks/queries/useCounselor";

export const useEpisodeAPIData = (
  episodeId: string,
  counselorId: string,
  shouldFetch: boolean
) => {
  const { data: apiEpisodeDetail, isLoading: isDetailLoading } = useEpisodeDetailAPI(
    episodeId,
    counselorId,
    shouldFetch
  );

  const { data: counselor, isLoading: isCounselorLoading } = useCounselor(
    counselorId,
    shouldFetch && !!counselorId
  );

  // API 데이터를 UI 형태로 변환하는 헬퍼 함수 (공통 유틸리티 사용)
  const transformAPIDataToScenes = (apiData: typeof apiEpisodeDetail) => {
    if (!apiData) return [];

  };

  // API 데이터를 editData 형태로 변환
  const getEditDataFromAPI = (apiData: typeof apiEpisodeDetail) => {
    if (!apiData) return null;

    return {
      scenes: transformAPIDataToScenes(apiData),
      tempStatus: apiData.data.isTemporary ? '임시' : '배포',
    };
  };

  return {
    apiEpisodeDetail,
    counselor,
    isDetailLoading: isDetailLoading || isCounselorLoading,
    transformAPIDataToScenes,
    getEditDataFromAPI,
  };
}; 