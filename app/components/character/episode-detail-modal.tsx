import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { useEpisodeStore } from "~/stores/episodeStore";
import StatusWarningModal from "./components/StatusWarningModal";
import EpisodeInfoSection from "./components/EpisodeInfoSection";
import ImageThumbnailsSection from "./components/ImageThumbnailsSection";
import SceneContentSection from "./components/SceneContentSection";

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
    closeModal,
    startEditing,
    saveChanges,
    cancelEditing,
    updateEditedEpisode,
    updateEditData,
    handleStatusChange,
    confirmStatusChange,
    cancelStatusChange,
  } = useEpisodeStore();

  if (!currentEpisode) return null;

  const handleTitleChange = (title: string) => {
    updateEditedEpisode({ title });
  };

  const handleLevelChange = (level: number) => {
    updateEditedEpisode({ level });
  };

  const handleSpeakerChange = (speaker: string) => {
    updateEditData({ speaker });
  };

  const handleDialogueChange = (dialogue: string) => {
    updateEditData({ dialogue });
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="p-4">
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
            />

            {/* Image Thumbnails Section */}
            <ImageThumbnailsSection />

            {/* Scene Content Section */}
            <SceneContentSection
              isEditing={isEditing}
              speaker={editData.speaker}
              dialogue={editData.dialogue}
              onSpeakerChange={handleSpeakerChange}
              onDialogueChange={handleDialogueChange}
            />

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