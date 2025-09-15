import { useEpisodeDetail as useEpisodeDetailAPI } from "~/hooks/queries/useEpisodeDetail";
import { useCounselor } from "~/hooks/queries/useCounselor";
import { transformCutSceneToScene } from "../utils";

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
    if (!apiData?.cutScenes) return [];

    // API의 cutScenes를 orderIndex 순서로 정렬 후 scenes로 변환
    const sortedCutScenes = apiData.cutScenes.sort((a, b) => 
      (a.orderIndex || 0) - (b.orderIndex || 0)
    );
    
    return sortedCutScenes.map(cutScene => 
      transformCutSceneToScene(cutScene, counselor)
    );
  };

  // API 데이터를 editData 형태로 변환
  const getEditDataFromAPI = (apiData: typeof apiEpisodeDetail) => {
    if (!apiData) return null;

    return {
      scenes: transformAPIDataToScenes(apiData),
      tempStatus: apiData.isTemporary ? '임시' : '배포',
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