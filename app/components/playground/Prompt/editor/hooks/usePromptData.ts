import { useQuery } from '@tanstack/react-query';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';

export const usePromptData = () => {
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique);

  // persona
  const { data: personaPrompts, isLoading: isPersonaLoading } = useQuery({
    enabled: !!selectedCounselor?.id,
    ...queries.v1.getPersonaPrompts({
      promptVersionId: temporaryVersion?.id ?? '',
      counselorId: selectedCounselor?.id,
    }),
  });

  const personaData = personaPrompts?.find((persona) => persona.counselorId === selectedCounselor?.id);
  console.log(personaData);
  // tone
  const toneId = selectedCounselor?.toneId;
  const { data: tonePrompts, isLoading: isToneLoading } = useQuery({
    enabled: !!selectedCounselor?.toneId,
    ...queries.v1.getTonePrompts({
      promptVersionId: temporaryVersion?.id ?? '',
      toneId,
    }),
  });

  const toneData = tonePrompts?.find((tone) => tone.toneId === selectedCounselor?.toneId);
  console.log(toneData);

  const isLoading = isPersonaLoading || isToneLoading;

  return {
    personaData,
    toneData,
    selectedCounselTechnique,
    selectedCounselor,
    isLoading,
  };
};
