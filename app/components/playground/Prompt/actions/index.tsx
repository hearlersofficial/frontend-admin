import { Button } from '~/components/ui/button';
import SavePromptModal from '../modals/SavePromptModal';

import { useModal } from '~/hooks/useModal';

const PromptActions = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={openModal} className="rounded-xl bg-[#736A84] text-base font-semibold" size="lg">
        프롬프트 기록 저장
      </Button>
      <Button className="rounded-xl bg-[#4D317E] text-base font-semibold" size="lg">
        Dev 앱 적용
      </Button>

      <SavePromptModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
export default PromptActions;
