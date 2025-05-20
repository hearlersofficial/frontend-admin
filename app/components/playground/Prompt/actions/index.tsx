import { useState } from 'react';

import { Button } from '~/components/ui/button';
import SavePromptModal from '../modals/SavePromptModal';

const PromptActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex justify-center gap-2">
      <Button onClick={handleSave} className="rounded-xl bg-[#736A84] text-base font-semibold" size="lg">
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
