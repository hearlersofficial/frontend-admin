import { Button } from '~/components/ui/button';
import GptVersionModal from './modals/GptVersionModal';

import { useModal } from '~/hooks/useModal';

const GptVersionButton = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);

  return (
    <>
      <Button
        onClick={openModal}
        className="h-fit whitespace-normal rounded-full bg-[#4A494B] py-1 text-center text-xs"
        size="sm"
      >
        GPT 4o preview_04
      </Button>
      <GptVersionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default GptVersionButton;
