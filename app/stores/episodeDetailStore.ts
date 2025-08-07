import { create } from 'zustand';
import { Episode } from '~/components/character/types';

interface SceneData {
  speaker: string;
  dialogue: string;
}

interface EpisodeEditData {
  scenes: SceneData[];
  tempStatus: string;
}

interface EpisodeDetailStore {
  // Modal 상태
  isModalOpen: boolean;
  currentEpisode: Episode | null;
  
  // 편집 상태
  isEditing: boolean;
  editedEpisode: Episode | null;
  editData: EpisodeEditData;
  
  // Warning modal 상태
  showWarningModal: boolean;
  pendingStatusChange: string | null;
  warningType: 'deploy' | 'undeploy' | null;
  
  // 액션
  openModal: (episode: Episode) => void;
  openNewEpisode: () => void;
  closeModal: () => void;
  startEditing: () => void;
  saveChanges: () => void;
  cancelEditing: () => void;
  updateEditedEpisode: (updates: Partial<Episode>) => void;
  updateEditData: (updates: Partial<EpisodeEditData>) => void;
  updateSceneData: (sceneIndex: number, updates: Partial<SceneData>) => void;
  addScene: () => void;
  handleStatusChange: (newStatus: string) => void;
  confirmStatusChange: () => void;
  cancelStatusChange: () => void;
}

const createEmptyScene = (): SceneData => ({
  speaker: 'jihoo',
  dialogue: '',
});

const createNewEpisode = (): Episode => ({
  id: '', // 빈 ID로 새 에피소드임을 표시
  title: '새 에피소드 1',
  level: 1,
  createdAt: '',
  status: '임시',
  imageUrl: '',
});

export const useEpisodeDetailStore = create<EpisodeDetailStore>((set, get) => ({
  // 초기 상태
  isModalOpen: false,
  currentEpisode: null,
  isEditing: false,
  editedEpisode: null,
  editData: {
    scenes: [],
    tempStatus: '임시',
  },
  showWarningModal: false,
  pendingStatusChange: null,
  warningType: null,

  // 액션
  openModal: (episode) => set({ 
    isModalOpen: true, 
    currentEpisode: episode,
    editedEpisode: { ...episode },
    editData: {
      scenes: [], // API에서 로드될 때까지 빈 배열
      tempStatus: episode.status,
    }
  }),

  openNewEpisode: () => {
    const newEpisode = createNewEpisode();
    set({ 
      isModalOpen: true, 
      currentEpisode: newEpisode,
      isEditing: true, // 바로 편집 모드로 시작
      editedEpisode: { ...newEpisode },
      editData: {
        scenes: [createEmptyScene()], // 새 에피소드는 빈 씬 하나로 시작
        tempStatus: '임시',
      }
    });
  },
  
  closeModal: () => set({ 
    isModalOpen: false, 
    currentEpisode: null,
    isEditing: false,
    editedEpisode: null,
    showWarningModal: false,
    pendingStatusChange: null,
    warningType: null,
  }),
  
  startEditing: () => {
    const { currentEpisode } = get();
    if (!currentEpisode) return;
    
    set({ 
      isEditing: true,
      editedEpisode: { ...currentEpisode },
      editData: {
        ...get().editData,
        tempStatus: currentEpisode.status,
      }
    });
  },
  
  saveChanges: () => {
    const { editedEpisode, editData } = get();
    if (!editedEpisode) return;

    // TODO: API call to save changes or create new episode
    const isNewEpisode = !editedEpisode.id;
    console.log(`${isNewEpisode ? 'Creating' : 'Updating'} episode:`, {
      episode: editedEpisode,
      ...editData
    });

    if (isNewEpisode) {
      // 새 에피소드 생성 후 모달 닫기
      set({ 
        isModalOpen: false,
        currentEpisode: null,
        isEditing: false,
        editedEpisode: null,
      });
    } else {
      // 기존 에피소드 수정 후 편집 모드만 해제
      set({ 
        currentEpisode: { ...editedEpisode, status: editData.tempStatus },
        isEditing: false 
      });
    }
  },
  
  cancelEditing: () => {
    const { currentEpisode } = get();
    if (!currentEpisode) return;
    
    // 새 에피소드인 경우 모달을 닫음
    if (!currentEpisode.id) {
      set({ 
        isModalOpen: false,
        currentEpisode: null,
        isEditing: false,
        editedEpisode: null,
        showWarningModal: false,
        pendingStatusChange: null,
        warningType: null,
      });
    } else {
      // 기존 에피소드인 경우 편집 모드만 해제
      set({ 
        isEditing: false,
        editedEpisode: { ...currentEpisode },
        editData: {
          ...get().editData, // 기존 씬 데이터 유지
          tempStatus: currentEpisode.status,
        }
      });
    }
  },
  
  updateEditedEpisode: (updates) => set((state) => ({
    editedEpisode: state.editedEpisode ? { ...state.editedEpisode, ...updates } : null
  })),
  
  updateEditData: (updates) => set((state) => ({
    editData: { ...state.editData, ...updates }
  })),
  
  updateSceneData: (sceneIndex, updates) => set((state) => {
    const newScenes = [...state.editData.scenes];
    if (sceneIndex < newScenes.length) {
      newScenes[sceneIndex] = { ...newScenes[sceneIndex], ...updates };
    }
    return {
      editData: { ...state.editData, scenes: newScenes }
    };
  }),

  addScene: () => set((state) => ({
    editData: {
      ...state.editData,
      scenes: [...state.editData.scenes, createEmptyScene()]
    }
  })),
  
  handleStatusChange: (newStatus) => {
    const { editData } = get();
    const currentStatus = editData.tempStatus;
    
    // 배포에서 임시로 변경하는 경우 경고 모달 표시
    if (currentStatus === "배포" && newStatus === "임시") {
      set({
        pendingStatusChange: newStatus,
        warningType: 'undeploy',
        showWarningModal: true,
      });
    } 
    // 임시에서 배포로 변경하는 경우 경고 모달 표시
    else if (currentStatus === "임시" && newStatus === "배포") {
      set({
        pendingStatusChange: newStatus,
        warningType: 'deploy',
        showWarningModal: true,
      });
    } 
    else {
      // 다른 경우는 바로 변경
      set((state) => ({
        editData: { ...state.editData, tempStatus: newStatus }
      }));
    }
  },
  
  confirmStatusChange: () => {
    const { pendingStatusChange } = get();
    if (pendingStatusChange) {
      set((state) => ({
        editData: { ...state.editData, tempStatus: pendingStatusChange },
        showWarningModal: false,
        pendingStatusChange: null,
        warningType: null,
      }));
    }
  },
  
  cancelStatusChange: () => set({
    showWarningModal: false,
    pendingStatusChange: null,
    warningType: null,
  }),
})); 