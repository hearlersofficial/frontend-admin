import { useState } from 'react';

import { Button } from '~/components/ui/button';
import GptVersionModal from './modals/GptVersionModal';

const GptVersionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
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
