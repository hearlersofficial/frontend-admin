import { useState, useEffect, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useEpisodes } from "~/hooks/queries";
import { useEpisodeDetail as useEpisodeDetailAPI } from "~/hooks/queries/useEpisodeDetail";
import { useCreateEpisode } from "~/hooks/mutations";
import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";
import { useEpisodeImageStore } from "~/stores/episodeImageStore";
import { filterEpisodes, paginateItems, mapAPIEpisodesToUIEpisodes } from './utils';
import { Episode } from '../types';
import { queries } from '~/queries';

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

// Episode 상세 모달 관리 훅 - API 데이터와 통합
export const useEpisodeDetail = (counselorId?: string) => {
  const queryClient = useQueryClient();
  
  const {
    isModalOpen,
    currentEpisode,
    editedEpisode,
    isEditing,
    editData,
    showWarningModal,
    warningType,
    openModal,
    openNewEpisode,
    closeModal,
    startEditing,
    saveChanges: saveChangesStore,
    cancelEditing,
    updateEditedEpisode,
    updateSceneData,
    updateEditData,
    addScene,
    handleStatusChange,
    confirmStatusChange,
    cancelStatusChange,
  } = useEpisodeDetailStore();

  // 새 에피소드인지 확인
  const isNewEpisode = !currentEpisode?.id;

  // 에피소드 생성 mutation
  const { mutate: createEpisode, isPending: isCreating } = useCreateEpisode({
    onSuccess: () => {
      // React Query 캐시 무효화로 자동 업데이트
      if (counselorId) {
        queryClient.invalidateQueries({
          queryKey: queries.v1.getEpisodes(counselorId).queryKey,
        });
      }
      
      // 모달 닫기
      closeModal();
    },
    onError: (error) => {
      console.error('Failed to create episode:', error);
      alert('에피소드 생성에 실패했습니다.');
    },
  });

  // 실제 API에서 에피소드 상세 데이터 가져오기 (기존 에피소드일 때만)
  const { data: apiEpisodeDetail, isLoading: isDetailLoading } = useEpisodeDetailAPI(
    currentEpisode?.id || '',
    counselorId || '',
    !!currentEpisode?.id && !!counselorId && isModalOpen && !isNewEpisode
  );

  // API 데이터가 로드되면 store 업데이트 (기존 에피소드일 때만)
  useEffect(() => {
    if (apiEpisodeDetail && currentEpisode && !isEditing && !isNewEpisode) {
      // API의 cutScenes를 orderIndex 순서로 정렬 후 scenes로 변환
      const sortedCutScenes = apiEpisodeDetail.cutScenes?.sort((a, b) => 
        (a.orderIndex || 0) - (b.orderIndex || 0)
      ) || [];
      
      const scenes = sortedCutScenes.map(cutScene => ({
        speaker: cutScene.speaker === 'SPEAKER_COUNSELOR' ? 'jihoo' : 
                cutScene.speaker === 'SPEAKER_USER' ? 'dahye' : 
                cutScene.speaker || '',
        dialogue: cutScene.content || '',
      }));

      // editData 업데이트
      updateEditData({
        scenes: scenes,
        tempStatus: apiEpisodeDetail.isTemporary ? '임시' : '배포',
      });
    }
  }, [apiEpisodeDetail, currentEpisode, isEditing, updateEditData, isNewEpisode]);

  // 실제 저장 로직
  const saveChanges = () => {
    if (!editedEpisode || !counselorId) return;

    if (isNewEpisode) {
      // 새 에피소드 생성
      if (!editedEpisode.title.trim()) {
        alert('에피소드 제목을 입력해주세요.');
        return;
      }

      // editData.scenes를 cutScenes 형태로 변환
      const cutScenes = editData.scenes.map((scene, index) => ({
        speaker: (scene.speaker === 'jihoo' ? 'SPEAKER_COUNSELOR' : 
                 scene.speaker === 'dahye' ? 'SPEAKER_USER' : 
                 'SPEAKER_UNSPECIFIED') as 'SPEAKER_COUNSELOR' | 'SPEAKER_USER' | 'SPEAKER_UNSPECIFIED',
        content: scene.dialogue,
        orderIndex: index + 1, // 서버는 1부터 시작
        image: '', // TODO: 이미지 기능 구현 시 실제 이미지 URL로 변경
      }));

      createEpisode({
        counselorId,
        data: {
          title: editedEpisode.title.trim(),
          isTemporary: editData.tempStatus === '임시',
          requiredRapportThreshold: editedEpisode.level || 0,
          cutScenes,
        },
      });
    } else {
      // 기존 에피소드 수정 (TODO: 실제 API 연결)
      saveChangesStore();
    }
  };

  // 간단한 핸들러들
  const handlers = {
    onTitleChange: (title: string) => updateEditedEpisode({ title }),
    onLevelChange: (level: number) => updateEditedEpisode({ level }),
    onSpeakerChange: (speaker: string, selectedIndex: number) => 
      updateSceneData(selectedIndex, { speaker }),
    onDialogueChange: (dialogue: string, selectedIndex: number) => 
      updateSceneData(selectedIndex, { dialogue }),
    onAddScene: addScene,
  };

  return {
    // 상태
    isModalOpen,
    currentEpisode,
    editedEpisode,
    isEditing,
    editData,
    showWarningModal,
    warningType,
    isDetailLoading: !isNewEpisode ? isDetailLoading : false,
    isCreating,
    isNewEpisode,
    
    // 액션
    openModal,
    openNewEpisode,
    closeModal,
    startEditing,
    saveChanges,
    cancelEditing,
    handleStatusChange,
    confirmStatusChange,
    cancelStatusChange,
    
    // 핸들러
    ...handlers,
  };
};

// Episode 이미지 관리 훅
export const useEpisodeImages = () => {
  const {
    isOrderAdjustmentMode,
    imageOrder,
    selectedImageIndex,
    toggleOrderAdjustmentMode,
    reorderImages,
    setSelectedImageIndex,
    navigateImage,
  } = useEpisodeImageStore();

  return {
    isOrderAdjustmentMode,
    imageOrder,
    selectedImageIndex,
    toggleOrderAdjustmentMode,
    reorderImages,
    setSelectedImageIndex,
    navigateImage,
  };
}; 