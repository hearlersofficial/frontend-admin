import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { useEpisodeStore } from "~/stores/episodeStore";
import StatusWarningModal from "./StatusWarningModal";
import EpisodeInfoSection from "./EpisodeInfoSection";
import ImageThumbnailsSection from "./ImageThumbnailsSection";
import SceneContentSection from "./SceneContentSection";

interface EpisodeDetailModalProps {
  characterName?: string;
}

const EpisodeDetailModal = ({ characterName }: EpisodeDetailModalProps) => {
  const {
    isModalOpen,
    currentEpisode,
    editedEpisode,
    isEditing,
    editData,
    showWarningModal,
    warningType,
    isOrderAdjustmentMode,
    imageOrder,
    selectedImageIndex,
    closeModal,
    startEditing,
    saveChanges,
    cancelEditing,
    updateEditedEpisode,
    updateEditData,
    updateSceneData,
    handleStatusChange,
    confirmStatusChange,
    cancelStatusChange,
    toggleOrderAdjustmentMode,
    reorderImages,
    setSelectedImageIndex,
    navigateImage,
  } = useEpisodeStore();

  if (!currentEpisode) return null;

  const handleTitleChange = (title: string) => {
    updateEditedEpisode({ title });
  };

  const handleLevelChange = (level: number) => {
    updateEditedEpisode({ level });
  };

  const handleSpeakerChange = (speaker: string) => {
    updateSceneData(selectedImageIndex, { speaker });
  };

  const handleDialogueChange = (dialogue: string) => {
    updateSceneData(selectedImageIndex, { dialogue });
  };

  // Additional handlers for new features
  const handleOrderAdjustment = () => {
    toggleOrderAdjustmentMode();
  };

  const handlePageDelete = () => {
    console.log('페이지 삭제 기능');
    // TODO: Implement page deletion logic
  };

  const handleExistingImages = () => {
    console.log('기존 이미지 기능');
    // TODO: Implement existing images browser
  };

  const handlePCUpload = () => {
    console.log('PC에서 추가 기능');
    // TODO: Implement PC file upload
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="w-full h-full max-w-[1420px] max-h-[700px] p-0">
          <div className="w-full h-full p-6 overflow-y-auto">
            {/* Character and Episode Info Row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {characterName && (
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <span className="font-medium">{characterName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Episode Information Section */}
            <EpisodeInfoSection
              episode={editedEpisode || currentEpisode}
              isEditing={isEditing}
              status={editData.tempStatus}
              onTitleChange={handleTitleChange}
              onLevelChange={handleLevelChange}
              onStatusChange={handleStatusChange}
              onOrderAdjustment={handleOrderAdjustment}
              isOrderAdjustmentMode={isOrderAdjustmentMode}
            />

            {/* Image Thumbnails Section */}
            <ImageThumbnailsSection 
              isOrderAdjustmentMode={isOrderAdjustmentMode}
              imageOrder={imageOrder}
              selectedImageIndex={selectedImageIndex}
              onReorderImages={reorderImages}
              onSelectImage={setSelectedImageIndex}
            />

            {/* Scene Content Section */}
            <SceneContentSection
              isEditing={isEditing}
              selectedImageIndex={selectedImageIndex}
              currentScene={editData.scenes[selectedImageIndex]}
              onSpeakerChange={handleSpeakerChange}
              onDialogueChange={handleDialogueChange}
              onNavigateImage={navigateImage}
            />

            {/* Image Management Buttons - Only visible when editing */}
            {isEditing && (
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handlePageDelete}>
                    페이지 삭제
                  </Button>
                  <Button variant="outline" onClick={handleExistingImages}>
                    기존 이미지
                  </Button>
                  <Button variant="outline" onClick={handlePCUpload}>
                    PC에서 추가
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-3">
              {!isEditing ? (
                <Button size="lg" className="px-8" onClick={startEditing}>
                  수정
                </Button>
              ) : (
                <>
                  <Button size="lg" className="px-8" onClick={saveChanges}>
                    저장
                  </Button>
                  <Button size="lg" variant="outline" className="px-8" onClick={cancelEditing}>
                    취소
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Warning Modal */}
      <StatusWarningModal
        isOpen={showWarningModal}
        onClose={() => {}}
        warningType={warningType}
        onConfirm={confirmStatusChange}
        onCancel={cancelStatusChange}
      />
    </>
  );
};

export default EpisodeDetailModal; 