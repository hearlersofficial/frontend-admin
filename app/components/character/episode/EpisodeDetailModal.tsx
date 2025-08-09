import { Button } from '~/components/ui/button';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import { useEpisodeDetail, useEpisodeImages } from './hooks';
import StatusWarningModal from './StatusWarningModal';
import EpisodeInfoSection from './EpisodeInfoSection';
import ImageThumbnailsSection from './ImageThumbnailsSection';
import SceneContentSection from './SceneContentSection';

interface EpisodeDetailModalProps {
  characterName?: string;
  counselorId: string;
}

// 캐릭터 헤더 컴포넌트 분리 - 모드 정보 추가
const CharacterHeader = ({ characterName, isNewEpisode }: { characterName?: string; isNewEpisode: boolean }) => {
  if (!characterName) return null;

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="h-12 w-12 rounded-full bg-gray-200" />
          <div>
            <span className="font-medium">{characterName}</span>
            {isNewEpisode && <div className="text-sm text-gray-500">새 에피소드</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// 이미지 관리 버튼들 컴포넌트 분리
const ImageManagementButtons = ({ isEditing }: { isEditing: boolean }) => {
  if (!isEditing) return null;

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
    <div className="mb-6 flex items-center justify-between">
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
  );
};

// 액션 버튼들 컴포넌트 분리
const ActionButtons = ({
  isEditing,
  isNewEpisode,
  isCreating,
  onStartEditing,
  onSave,
  onCancel,
}: {
  isEditing: boolean;
  isNewEpisode: boolean;
  isCreating?: boolean;
  onStartEditing: () => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="flex justify-center space-x-3">
    {!isEditing ? (
      <Button size="lg" className="px-8" onClick={onStartEditing}>
        수정
      </Button>
    ) : (
      <>
        <Button size="lg" className="px-8" onClick={onSave} disabled={isCreating}>
          {isNewEpisode ? (isCreating ? '생성 중...' : '생성') : '저장'}
        </Button>
        <Button size="lg" variant="outline" className="px-8" onClick={onCancel} disabled={isCreating}>
          취소
        </Button>
      </>
    )}
  </div>
);

const EpisodeDetailModal = ({ characterName, counselorId }: EpisodeDetailModalProps) => {
  const {
    isModalOpen,
    currentEpisode,
    editedEpisode,
    isEditing,
    editData,
    showWarningModal,
    warningType,
    isDetailLoading,
    isCreating,
    isNewEpisode,
    closeModal,
    startEditing,
    saveChanges,
    cancelEditing,
    handleStatusChange,
    confirmStatusChange,
    cancelStatusChange,
    onTitleChange,
    onLevelChange,
    onSpeakerChange,
    onDialogueChange,
    onAddScene,
  } = useEpisodeDetail(counselorId);

  const {
    isOrderAdjustmentMode,
    imageOrder,
    selectedImageIndex,
    toggleOrderAdjustmentMode,
    reorderImages,
    setSelectedImageIndex,
    navigateImage,
  } = useEpisodeImages();

  if (!currentEpisode) return null;

  // 실제 씬 개수에 맞춰 imageOrder 조정
  const sceneCount = editData.scenes.length;
  const adjustedImageOrder = Array.from({ length: sceneCount }, (_, i) => i);
  const adjustedSelectedIndex = Math.min(selectedImageIndex, sceneCount - 1);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="h-full max-h-[700px] w-full max-w-[1420px] p-0">
          <div className="h-full w-full overflow-y-auto p-6">
            <CharacterHeader characterName={characterName} isNewEpisode={isNewEpisode} />

            {isDetailLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-lg">에피소드 상세 정보를 불러오는 중...</div>
              </div>
            ) : (
              <>
                <EpisodeInfoSection
                  episode={editedEpisode || currentEpisode}
                  isEditing={isEditing}
                  status={editData.tempStatus}
                  onTitleChange={onTitleChange}
                  onLevelChange={onLevelChange}
                  onStatusChange={handleStatusChange}
                  onOrderAdjustment={toggleOrderAdjustmentMode}
                  isOrderAdjustmentMode={isOrderAdjustmentMode}
                />

                <ImageThumbnailsSection
                  isOrderAdjustmentMode={isOrderAdjustmentMode}
                  imageOrder={adjustedImageOrder}
                  selectedImageIndex={adjustedSelectedIndex}
                  isEditing={isEditing}
                  sceneCount={sceneCount}
                  onReorderImages={reorderImages}
                  onSelectImage={setSelectedImageIndex}
                  onAddScene={onAddScene}
                />

                <SceneContentSection
                  isEditing={isEditing}
                  selectedImageIndex={adjustedSelectedIndex}
                  currentScene={editData.scenes[adjustedSelectedIndex] || { speaker: 'jihoo', dialogue: '' }}
                  onSpeakerChange={(speaker) => onSpeakerChange(speaker, adjustedSelectedIndex)}
                  onDialogueChange={(dialogue) => onDialogueChange(dialogue, adjustedSelectedIndex)}
                  onNavigateImage={navigateImage}
                />

                <ImageManagementButtons isEditing={isEditing} />

                <ActionButtons
                  isEditing={isEditing}
                  isNewEpisode={isNewEpisode}
                  isCreating={isCreating}
                  onStartEditing={startEditing}
                  onSave={saveChanges}
                  onCancel={cancelEditing}
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
