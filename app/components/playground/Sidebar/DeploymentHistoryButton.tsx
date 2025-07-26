import { Button } from '~/components/ui/button';
import DeploymentHistoryModal from './modals/DeploymentHistoryModal';

import { useModal } from '~/hooks/useModal';

const DeploymentHistoryButton = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);

  return (
    <>
      <Button onClick={openModal} className="rounded-full bg-[#736A84] text-sm" size="sm">
        배포기록
      </Button>
      <DeploymentHistoryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DeploymentHistoryButton;
