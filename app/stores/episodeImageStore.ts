import { create } from 'zustand';

interface EpisodeImageStore {
  // 상태
  isOrderAdjustmentMode: boolean;
  selectedImageIndex: number;
  
  // 액션
  toggleOrderAdjustmentMode: () => void;
  setSelectedImageIndex: (index: number) => void;
  navigateImage: (direction: 'prev' | 'next', maxIndex: number) => void;
  resetImageState: () => void;
}

export const useEpisodeImageStore = create<EpisodeImageStore>((set, get) => ({
  // 초기 상태
  isOrderAdjustmentMode: false,
  selectedImageIndex: 0,

  // 액션
  toggleOrderAdjustmentMode: () => set((state) => ({
    isOrderAdjustmentMode: !state.isOrderAdjustmentMode
  })),
  
  setSelectedImageIndex: (index) => set({
    selectedImageIndex: index
  }),
  
  navigateImage: (direction, maxIndex) => {
    const { selectedImageIndex } = get();
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : maxIndex - 1;
    } else {
      newIndex = selectedImageIndex < maxIndex - 1 ? selectedImageIndex + 1 : 0;
    }
    
    set({ selectedImageIndex: newIndex });
  },
  
  resetImageState: () => set({
    isOrderAdjustmentMode: false,
    selectedImageIndex: 0,
  }),
})); 