import { Button } from '~/components/ui/button';
import SavePromptModal from '../modals/SavePromptModal';
import ActivatePromptVersionModal from '../modals/ActivatePromptModal';

import { useModal } from '~/hooks/useModal';

const PromptActions = () => {
  const { isOpen: isSaveModalOpen, setIsOpen: setIsSaveModalOpen, openModal: openSaveModal } = useModal(false);
  const {
    isOpen: isActivateModalOpen,
    setIsOpen: setIsActivateModalOpen,
    openModal: openActivateModal,
  } = useModal(false);

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={openSaveModal} className="rounded-xl bg-[#736A84] text-base font-semibold" size="lg">
        프롬프트 기록 저장
      </Button>
      <Button onClick={openActivateModal} className="rounded-xl bg-[#4D317E] text-base font-semibold" size="lg">
        Dev 앱 적용
      </Button>

      <SavePromptModal isOpen={isSaveModalOpen} setIsOpen={setIsSaveModalOpen} />
      <ActivatePromptVersionModal isOpen={isActivateModalOpen} setIsOpen={setIsActivateModalOpen} />
    </div>
  );
};
export default PromptActions;
