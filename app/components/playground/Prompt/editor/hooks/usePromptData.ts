import { useQuery } from '@tanstack/react-query';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';

export const usePromptData = () => {
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique);

  // persona
  const personaPromptId =
    temporaryVersion?.counselorScopedPrompts?.find((p) => p.counselorId === selectedCounselor?.id)?.personaPromptId ??
    '';

  const { data: personaData, isLoading: isPersonaLoading } = useQuery({
    enabled: !!personaPromptId,
    ...queries.v1.getPersonaPromptById(personaPromptId),
  });

  // tone
  const toneId = selectedCounselor?.toneId;
  const tonePromptId = temporaryVersion?.toneScopedPrompts?.find((p) => p.toneId === toneId)?.tonePromptId ?? '';

  const { data: toneData, isLoading: isToneLoading } = useQuery({
    enabled: !!tonePromptId,
    ...queries.v1.getTonePromptById(tonePromptId),
  });

  const isLoading = isPersonaLoading || isToneLoading;

  return {
    personaData,
    toneData,
    selectedCounselTechnique,
    selectedCounselor,
    isLoading,
  };
};
