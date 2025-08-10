import { Button } from '~/components/ui/button';

import { useModal } from '~/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';
import { convertAiModelToLabel } from '~/lib/utils';
import AiVersionModal from './modals/AiVersionModal';

const AiVersionButton = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);
  const { data, isLoading } = useQuery({ ...queries.v1.getTemporaryVersion });

  const aiModel = data?.data?.data?.promptVersion?.aiModel;
  const buttonLabel = isLoading ? 'GPT' : convertAiModelToLabel(aiModel);

  return (
    <>
      <Button
        onClick={openModal}
        className="h-fit whitespace-normal rounded-full bg-[#4A494B] py-1 text-center text-xs"
        size="sm"
      >
        {buttonLabel}
      </Button>
      <AiVersionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AiVersionButton;
