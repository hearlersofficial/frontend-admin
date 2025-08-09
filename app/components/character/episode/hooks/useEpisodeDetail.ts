import { useEffect } from 'react';
import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";
import { useEpisodeCreation } from './useEpisodeCreation';
import { useEpisodeAPIData } from './useEpisodeAPIData';
import { useEpisodeEditing } from './useEpisodeEditing';

// Episode 상세 모달 관리 메인 훅 - 조합된 로직
export const useEpisodeDetail = (counselorId?: string) => {
  const {
    isModalOpen,
    currentEpisode,
    showWarningModal,
    warningType,
    openModal,
    openNewEpisode,
    closeModal,
    handleStatusChange,
    confirmStatusChange,
    cancelStatusChange,
  } = useEpisodeDetailStore();

  // 새 에피소드인지 확인
  const isNewEpisode = !currentEpisode?.id;

  // 세분화된 훅들 사용
  const episodeCreation = useEpisodeCreation(counselorId, closeModal); // 성공 시 모달 닫기
  const episodeEditing = useEpisodeEditing();
  
  // API 데이터 페칭 (기존 에피소드일 때만)
  const episodeAPIData = useEpisodeAPIData(
    currentEpisode?.id || '',
    counselorId || '',
    !!currentEpisode?.id && !!counselorId && isModalOpen && !isNewEpisode
  );

  // API 데이터가 로드되면 편집 데이터와 동기화
  useEffect(() => {
    if (episodeAPIData.apiEpisodeDetail && currentEpisode && !episodeEditing.isEditing && !isNewEpisode) {
      const editData = episodeAPIData.getEditDataFromAPI(episodeAPIData.apiEpisodeDetail);
      if (editData) {
        episodeEditing.syncWithAPIData(editData);
      }
    }
  }, [
    episodeAPIData.apiEpisodeDetail, 
    currentEpisode, 
    episodeEditing.isEditing, 
    isNewEpisode,
    episodeEditing.syncWithAPIData,
    episodeAPIData.getEditDataFromAPI
  ]);

  // 통합된 저장 로직
  const saveChanges = () => {
    if (!episodeEditing.editedEpisode || !counselorId) return;

    if (isNewEpisode) {
      episodeCreation.executeCreation({
        title: episodeEditing.editedEpisode.title,
        level: episodeEditing.editedEpisode.level || 0,
        scenes: episodeEditing.editData.scenes,
      });
    } else {
      episodeEditing.saveExistingEpisode();
    }
  };

  return {
    // 상태
    isModalOpen,
    currentEpisode,
    editedEpisode: episodeEditing.editedEpisode,
    isEditing: episodeEditing.isEditing,
    editData: episodeEditing.editData,
    showWarningModal,
    warningType,
    isDetailLoading: !isNewEpisode ? episodeAPIData.isDetailLoading : false,
    isCreating: episodeCreation.isCreating,
    isNewEpisode,
    
    // 액션
    openModal,
    openNewEpisode,
    closeModal,
    startEditing: episodeEditing.startEditing,
    saveChanges,
    cancelEditing: episodeEditing.cancelEditing,
    handleStatusChange,
    confirmStatusChange,
    cancelStatusChange,
    
    // 핸들러
    onTitleChange: episodeEditing.onTitleChange,
    onLevelChange: episodeEditing.onLevelChange,
    onSpeakerChange: episodeEditing.onSpeakerChange,
    onDialogueChange: episodeEditing.onDialogueChange,
    onAddScene: episodeEditing.onAddScene,
  };
}; 