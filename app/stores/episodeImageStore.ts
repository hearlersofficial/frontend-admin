import { create } from 'zustand';

interface EpisodeImageStore {
  // 상태
  isOrderAdjustmentMode: boolean;
  imageOrder: number[];
  selectedImageIndex: number;
  
  // 액션
  toggleOrderAdjustmentMode: () => void;
  reorderImages: (newOrder: number[]) => void;
  setSelectedImageIndex: (index: number) => void;
  navigateImage: (direction: 'prev' | 'next') => void;
  resetImageState: () => void;
}

const defaultImageOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const useEpisodeImageStore = create<EpisodeImageStore>((set, get) => ({
  // 초기 상태
  isOrderAdjustmentMode: false,
  imageOrder: defaultImageOrder,
  selectedImageIndex: 0,

  // 액션
  toggleOrderAdjustmentMode: () => set((state) => ({
    isOrderAdjustmentMode: !state.isOrderAdjustmentMode
  })),
  
  reorderImages: (newOrder) => set({
    imageOrder: newOrder
  }),
  
  setSelectedImageIndex: (index) => set({
    selectedImageIndex: index
  }),
  
  navigateImage: (direction) => {
    const { imageOrder, selectedImageIndex } = get();
    const currentIndex = imageOrder.indexOf(selectedImageIndex);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : imageOrder.length - 1;
    } else {
      newIndex = currentIndex < imageOrder.length - 1 ? currentIndex + 1 : 0;
    }
    
    set({ selectedImageIndex: imageOrder[newIndex] });
  },
  
  resetImageState: () => set({
    isOrderAdjustmentMode: false,
    imageOrder: defaultImageOrder,
    selectedImageIndex: 0,
  }),
})); 