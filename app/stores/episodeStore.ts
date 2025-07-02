import { create } from 'zustand';
import { Episode } from '~/components/character/types/Episode';

interface EpisodeEditData {
  speaker: string;
  dialogue: string;
  tempStatus: string;
}

interface EpisodeStore {
  // Episodes data
  episodes: Episode[];
  
  // Modal state
  isModalOpen: boolean;
  currentEpisode: Episode | null;
  
  // Edit state
  isEditing: boolean;
  editedEpisode: Episode | null;
  editData: EpisodeEditData;
  
  // Warning modal state
  showWarningModal: boolean;
  pendingStatusChange: string | null;
  warningType: 'deploy' | 'undeploy' | null;
  
  // Image order state
  isOrderAdjustmentMode: boolean;
  imageOrder: number[];
  
  // Actions
  setEpisodes: (episodes: Episode[]) => void;
  openModal: (episode: Episode) => void;
  closeModal: () => void;
  startEditing: () => void;
  saveChanges: () => void;
  cancelEditing: () => void;
  updateEditedEpisode: (updates: Partial<Episode>) => void;
  updateEditData: (updates: Partial<EpisodeEditData>) => void;
  handleStatusChange: (newStatus: string) => void;
  confirmStatusChange: () => void;
  cancelStatusChange: () => void;
  toggleOrderAdjustmentMode: () => void;
  reorderImages: (newOrder: number[]) => void;
}

export const useEpisodeStore = create<EpisodeStore>((set, get) => ({
  // Initial state
  episodes: [],
  isModalOpen: false,
  currentEpisode: null,
  isEditing: false,
  editedEpisode: null,
  editData: {
    speaker: 'jihoo',
    dialogue: '방 안은 지저분하고 말끔하다.\n가지런히 정돈되어있는 전문 서적들과 벽에 걸려 있는 각종 수료증서가 신뢰감을 더해주는 느낌이다.',
    tempStatus: '임시',
  },
  showWarningModal: false,
  pendingStatusChange: null,
  warningType: null,
  isOrderAdjustmentMode: false,
  imageOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

  // Actions
  setEpisodes: (episodes) => set({ episodes }),
  
  openModal: (episode) => set({ 
    isModalOpen: true, 
    currentEpisode: episode,
    editedEpisode: { ...episode },
    editData: {
      speaker: 'jihoo',
      dialogue: '방 안은 지저분하고 말끔하다.\n가지런히 정돈되어있는 전문 서적들과 벽에 걸려 있는 각종 수료증서가 신뢰감을 더해주는 느낌이다.',
      tempStatus: episode.status,
    }
  }),
  
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
    const { editedEpisode, editData, episodes } = get();
    if (!editedEpisode) return;

    // TODO: API call to save changes
    console.log('Saving changes:', {
      episode: editedEpisode,
      ...editData
    });

    // Update episodes list
    const updatedEpisodes = episodes.map(ep => 
      ep.id === editedEpisode.id ? { ...editedEpisode, status: editData.tempStatus } : ep
    );

    set({ 
      episodes: updatedEpisodes,
      currentEpisode: { ...editedEpisode, status: editData.tempStatus },
      isEditing: false 
    });
  },
  
  cancelEditing: () => {
    const { currentEpisode } = get();
    if (!currentEpisode) return;
    
    set({ 
      isEditing: false,
      editedEpisode: { ...currentEpisode },
      editData: {
        speaker: 'jihoo',
        dialogue: '방 안은 지저분하고 말끔하다.\n가지런히 정돈되어있는 전문 서적들과 벽에 걸려 있는 각종 수료증서가 신뢰감을 더해주는 느낌이다.',
        tempStatus: currentEpisode.status,
      }
    });
  },
  
  updateEditedEpisode: (updates) => set((state) => ({
    editedEpisode: state.editedEpisode ? { ...state.editedEpisode, ...updates } : null
  })),
  
  updateEditData: (updates) => set((state) => ({
    editData: { ...state.editData, ...updates }
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
  
  toggleOrderAdjustmentMode: () => set((state) => ({
    isOrderAdjustmentMode: !state.isOrderAdjustmentMode
  })),
  
  reorderImages: (newOrder) => set({
    imageOrder: newOrder
  }),
})); 