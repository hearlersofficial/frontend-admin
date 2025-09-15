import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";
import { useEpisodeAPIData } from './hooks/useEpisodeAPIData';
import { useEpisodeCreation } from './hooks/useEpisodeCreation';
import { useEpisodeUpdate } from './hooks/useEpisodeUpdate';
import StatusWarningModal from './StatusWarningModal';
import EpisodeInfoSection from './EpisodeInfoSection';
import ImageThumbnailsSection from './ImageThumbnailsSection';
import SceneContentSection from './SceneContentSection';

interface EpisodeDetailModalProps {
  characterName?: string;
  counselorId: string;
}

// 캐릭터 헤더 컴포넌트 분리 - 모드 정보 추가
const CharacterHeader = ({ characterName }: { characterName?: string }) => {
  const currentEpisode = useEpisodeDetailStore(state => state.currentEpisode);
  const isNewEpisode = !currentEpisode?.id;

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

// 액션 버튼들 컴포넌트 분리
const ActionButtons = ({ counselorId }: { counselorId: string }) => {
  const isEditing = useEpisodeDetailStore(state => state.isEditing);
  const currentEpisode = useEpisodeDetailStore(state => state.currentEpisode);
  const editedEpisode = useEpisodeDetailStore(state => state.editedEpisode);
  const editData = useEpisodeDetailStore(state => state.editData);
  const startEditing = useEpisodeDetailStore(state => state.startEditing);
  const cancelEditing = useEpisodeDetailStore(state => state.cancelEditing);
  const closeModal = useEpisodeDetailStore(state => state.closeModal);
  
  const isNewEpisode = !currentEpisode?.id;
  
  // 새 에피소드 생성용 훅
  const { isCreating, executeCreation } = useEpisodeCreation(counselorId, closeModal);
  
  // 기존 에피소드 업데이트용 훅 (편집 모드 해제만)
  const { isUpdating, executeUpdate } = useEpisodeUpdate(counselorId, () => {
    // 업데이트 성공 시 편집 모드 해제
    useEpisodeDetailStore.getState().saveChanges();
  });

  // 저장 로직
  const handleSave = () => {
    if (!editedEpisode) return;

    if (isNewEpisode) {
      // 새 에피소드 생성
      executeCreation({
        title: editedEpisode.title,
        level: editedEpisode.level || 0,
        scenes: editData.scenes,
      });
    } else {
      // 기존 에피소드 업데이트
      executeUpdate({
        episodeId: currentEpisode!.id!,
        title: editedEpisode.title,
        level: editedEpisode.level || 0,
        status: editData.tempStatus,
        scenes: editData.scenes,
      });
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="flex justify-center space-x-3">
      {!isEditing ? (
        <Button size="lg" className="px-8" onClick={startEditing}>
          수정
        </Button>
      ) : (
        <>
          <Button size="lg" className="px-8" onClick={handleSave} disabled={isLoading}>
            {isNewEpisode 
              ? (isCreating ? '생성 중...' : '생성') 
              : (isUpdating ? '저장 중...' : '저장')
            }
          </Button>
          <Button size="lg" variant="outline" className="px-8" onClick={cancelEditing} disabled={isLoading}>
            취소
          </Button>
        </>
      )}
    </div>
  );
};

// 데이터 초기화 및 동기화 훅
const useEpisodeInitialization = (counselorId: string) => {
  const { currentEpisode, isModalOpen, updateEditData } = useEpisodeDetailStore();
  const isNewEpisode = !currentEpisode?.id;

  // API 데이터 페칭 (기존 에피소드일 때만)
  const { apiEpisodeDetail, getEditDataFromAPI } = useEpisodeAPIData(
    currentEpisode?.id || '',
    counselorId,
    !!currentEpisode?.id && !!counselorId && isModalOpen && !isNewEpisode
  );

  // API 데이터가 로드되면 편집 데이터와 동기화
  useEffect(() => {
    if (apiEpisodeDetail && currentEpisode && !isNewEpisode) {
      const editData = getEditDataFromAPI(apiEpisodeDetail);
      if (editData) {
        updateEditData(editData);
      }
    }
  }, [apiEpisodeDetail, currentEpisode, isNewEpisode]);
};

const EpisodeDetailModal = ({ characterName, counselorId }: EpisodeDetailModalProps) => {
  const isModalOpen = useEpisodeDetailStore(state => state.isModalOpen);
  const currentEpisode = useEpisodeDetailStore(state => state.currentEpisode);
  const closeModal = useEpisodeDetailStore(state => state.closeModal);
  const showWarningModal = useEpisodeDetailStore(state => state.showWarningModal);
  const warningType = useEpisodeDetailStore(state => state.warningType);
  const confirmStatusChange = useEpisodeDetailStore(state => state.confirmStatusChange);
  const cancelStatusChange = useEpisodeDetailStore(state => state.cancelStatusChange);

  // 데이터 초기화
  useEpisodeInitialization(counselorId);

  if (!currentEpisode) return null;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="h-full max-h-[700px] w-full max-w-[1420px] p-0">
          <div className="h-full w-full overflow-y-auto p-6">
            <CharacterHeader characterName={characterName} />

            <EpisodeInfoSection />
            <ImageThumbnailsSection />
            <SceneContentSection counselorId={counselorId} />
            <ActionButtons counselorId={counselorId} />
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
