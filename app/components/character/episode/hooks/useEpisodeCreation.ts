import { useQueryClient } from '@tanstack/react-query';
import { useCreateEpisode } from "~/hooks/mutations";
import { useCounselor } from "~/hooks/queries/useCounselor";
import { queries } from '~/queries';
import { transformSceneToCutScene } from "../utils";

export const useEpisodeCreation = (
  counselorId?: string,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  const { data: counselor } = useCounselor(counselorId || '', !!counselorId);

  const { mutate: createEpisode, isPending: isCreating } = useCreateEpisode({
    onSuccess: () => {
      // React Query 캐시 무효화로 자동 업데이트
      if (counselorId) {
        queryClient.invalidateQueries({
          queryKey: queries.v1.getEpisodes(counselorId).queryKey,
        });
      }
      
      // 외부에서 전달된 성공 콜백 실행 (예: 모달 닫기)
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Failed to create episode:', error);
      alert('에피소드 생성에 실패했습니다.');
    },
  });

  const transformScenesToCutScenes = (scenes: Array<{ id: string; speaker: string; dialogue: string; image?: string }>) => {
    return scenes.map((scene, index) => 
      transformSceneToCutScene(scene, index, counselor)
    );
  };

  const executeCreation = (episodeData: {
    title: string;
    level: number;
    scenes: Array<{ id: string; speaker: string; dialogue: string; image?: string }>;
  }) => {
    if (!counselorId) {
      console.error('counselorId is required for episode creation');
      return;
    }

    if (!episodeData.title.trim()) {
      alert('에피소드 제목을 입력해주세요.');
      return;
    }

    const cutScenes = transformScenesToCutScenes(episodeData.scenes);

    createEpisode({
      counselorId,
      data: {
        title: episodeData.title.trim(),
        isTemporary: true, // 생성 시에는 항상 임시 상태
        requiredRapportThreshold: episodeData.level || 0,
        cutScenes,
      },
    });
  };

  return {
    executeCreation,
    isCreating,
    counselor,
  };
}; 