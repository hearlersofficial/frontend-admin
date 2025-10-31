import { useQuery } from '@tanstack/react-query';

import { usePromptStore } from '~/stores/usePromptStore';
import { queries } from '~/queries';

export const usePromptData = () => {
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique);

  const promptVersionId = temporaryVersion?.id;
  const counselorId = selectedCounselor?.id;
  const toneId = selectedCounselor?.toneId;

  const canFetchPersona = Boolean(promptVersionId && counselorId);
  const canFetchTone = Boolean(promptVersionId && toneId);

  // persona
  const { data: personaPrompts, isLoading: isPersonaLoading } = useQuery({
    ...queries.v1.getPersonaPrompts({
      promptVersionId: promptVersionId || '',
      counselorId: counselorId || '',
    }),
    enabled: canFetchPersona,
  });

  const personaData =
    canFetchPersona && personaPrompts && counselorId
      ? personaPrompts.find((persona) => persona.counselorId === counselorId) || null
      : null;

  // tone
  const { data: tonePrompts, isLoading: isToneLoading } = useQuery({
    ...queries.v1.getTonePrompts({
      promptVersionId: promptVersionId || '',
      toneId: toneId || '',
    }),
    enabled: canFetchTone,
  });

  const toneData =
    canFetchTone && tonePrompts && toneId ? tonePrompts.find((tone) => tone.toneId === toneId) || null : null;

  const isLoading = isPersonaLoading || isToneLoading;

  return {
    personaData,
    toneData,
    selectedCounselTechnique,
    selectedCounselor,
    isLoading,
  };
};
