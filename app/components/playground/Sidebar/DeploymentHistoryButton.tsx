import { useQueries, useQuery } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';
import DeploymentHistoryModal from './modals/DeploymentHistoryModal';

import { useModal } from '~/hooks/useModal';
import { queries } from '~/queries';
import { PromptVersionResponseDto } from '~/__generated__/data-contracts';

const DeploymentHistoryButton = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);

  const { data: activateHistories = [] } = useQuery(queries.v1.getPromptActivateHistories({}));

  const promptVersionResults = useQueries({
    queries: activateHistories.map((history) => {
      return {
        ...queries.v1.getPromptVersionById(history.promptVersionId!),
        enabled: !!history.promptVersionId,
      };
    }),
  });
  const promptVersions = promptVersionResults.map((q) => q.data).filter(Boolean) as PromptVersionResponseDto[];

  return (
    <>
      <Button onClick={openModal} className="rounded-full bg-[#736A84] text-sm" size="sm">
        배포기록
      </Button>
      <DeploymentHistoryModal isOpen={isOpen} setIsOpen={setIsOpen} prompts={promptVersions} />
    </>
  );
};

export default DeploymentHistoryButton;
