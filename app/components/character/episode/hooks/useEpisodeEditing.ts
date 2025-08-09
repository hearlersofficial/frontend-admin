import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";

// 에피소드 편집 및 폼 핸들링 전용 훅
export const useEpisodeEditing = () => {
  const {
    editedEpisode,
    isEditing,
    editData,
    startEditing,
    saveChanges: saveChangesStore,
    cancelEditing,
    updateEditedEpisode,
    updateSceneData,
    updateEditData,
    addScene,
  } = useEpisodeDetailStore();

  // 폼 핸들러들
  const handlers = {
    onTitleChange: (title: string) => updateEditedEpisode({ title }),
    onLevelChange: (level: number) => updateEditedEpisode({ level }),
    onSpeakerChange: (speaker: string, selectedIndex: number) => 
      updateSceneData(selectedIndex, { speaker }),
    onDialogueChange: (dialogue: string, selectedIndex: number) => 
      updateSceneData(selectedIndex, { dialogue }),
    onAddScene: addScene,
  };

  // 편집 데이터 업데이트 (API 데이터와 동기화 시 사용)
  const syncWithAPIData = (apiEditData: {
    scenes: Array<{ speaker: string; dialogue: string }>;
    tempStatus: string;
  }) => {
    updateEditData(apiEditData);
  };

  // 기존 에피소드 수정 로직 (TODO: 실제 API 연결)
  const saveExistingEpisode = () => {
    saveChangesStore();
  };

  return {
    // 상태
    editedEpisode,
    isEditing,
    editData,
    
    // 액션
    startEditing,
    cancelEditing,
    saveExistingEpisode,
    syncWithAPIData,
    
    // 핸들러
    ...handlers,
  };
}; 