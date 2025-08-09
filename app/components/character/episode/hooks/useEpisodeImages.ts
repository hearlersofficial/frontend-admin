import { useEpisodeImageStore } from "~/stores/episodeImageStore";

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