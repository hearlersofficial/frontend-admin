import { useQueryClient } from '@tanstack/react-query';
import { useUpdateEpisode } from "~/hooks/mutations";
import { useCounselor } from "~/hooks/queries/useCounselor";
import { queries } from '~/queries';
import { transformSceneToCutScene } from "../utils";
import type { SceneData } from "~/stores/episodeDetailStore";

export const useEpisodeUpdate = (
  counselorId?: string,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  const { data: counselor } = useCounselor(counselorId || '', !!counselorId);

  const { mutate: updateEpisode, isPending: isUpdating } = useUpdateEpisode({
    onSuccess: () => {
      // React Query 캐시 무효화로 자동 업데이트
      if (counselorId) {
        queryClient.invalidateQueries({
          queryKey: queries.v1.getEpisodes(counselorId).queryKey,
        });
      }
      
      // 외부에서 전달된 성공 콜백 실행
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Failed to update episode:', error);
      alert('에피소드 업데이트에 실패했습니다.');
    },
  });

  const transformScenesToCutScenes = (scenes: SceneData[]) => {
    return scenes.map((scene, index) => 
      transformSceneToCutScene(scene, index, counselor)
    );
  };

  const executeUpdate = (updateData: {
    episodeId: string;
    title: string;
    level: number;
    status: string;
    scenes: SceneData[];
  }) => {
    if (!counselorId) {
      console.error('counselorId is required for episode update');
      return;
    }

    if (!updateData.title.trim()) {
      alert('에피소드 제목을 입력해주세요.');
      return;
    }

    const cutScenes = transformScenesToCutScenes(updateData.scenes);

    console.log({
        episodeId: updateData.episodeId,
        counselorId,
        data: {
          title: updateData.title.trim(),
          isTemporary: updateData.status === '임시',
          requiredRapportThreshold: updateData.level || 0,
          cutScenes,
        },
      });

    updateEpisode({
      episodeId: updateData.episodeId,
      counselorId,
      data: {
        title: updateData.title.trim(),
        isTemporary: updateData.status === '임시',
        requiredRapportThreshold: updateData.level || 0,
        cutScenes,
      },
    });
  };

  return {
    executeUpdate,
    isUpdating,
    counselor,
  };
}; 