import { useQueryClient } from '@tanstack/react-query';
import { useUpdateCounselTechnique, useUpdatePersonaPrompt, useUpdateTonePrompt } from '~/hooks/mutations';
import { usePromptStore } from '~/stores/usePromptStore';
import { queries } from '~/queries';

export const usePromptMutations = () => {
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique);
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const queryClient = useQueryClient();

  const { mutate: updatePersonaPrompt } = useUpdatePersonaPrompt({
    onSuccess: () => {
      const promptVersionId = temporaryVersion?.id;
      const counselorId = selectedCounselor?.id;

      if (promptVersionId && counselorId) {
        queryClient.invalidateQueries({
          queryKey: queries.v1.getPersonaPrompts({ promptVersionId, counselorId }).queryKey,
        });
      }
    },
  });

  const { mutate: updateTonePrompt } = useUpdateTonePrompt({
    onSuccess: () => {
      const promptVersionId = temporaryVersion?.id;
      const toneId = selectedCounselor?.toneId;

      if (promptVersionId && toneId) {
        queryClient.invalidateQueries({
          queryKey: queries.v1.getTonePrompts({ promptVersionId, toneId }).queryKey,
        });
      }
    },
  });

  const { mutate: updateCounselTechnique } = useUpdateCounselTechnique({
    onSuccess: (res) => {
      const newTechniques = res;
      if (newTechniques) {
        if (selectedCounselTechnique?.id && Array.isArray(newTechniques)) {
          const sameTechnique = newTechniques.find((tech: { id?: string }) => tech.id === selectedCounselTechnique.id);
          if (sameTechnique) {
            setSelectedCounselTechnique(sameTechnique);
          } else {
            setSelectedCounselTechnique(newTechniques[0]);
          }
        } else {
          setSelectedCounselTechnique(Array.isArray(newTechniques) ? newTechniques[0] : newTechniques);
        }
      }

      const promptVersionId = temporaryVersion?.id;
      const toneId = selectedCounselor?.toneId;

      if (promptVersionId && toneId) {
        queryClient.invalidateQueries({
          queryKey: queries.v1.getCounselTechniques({ promptVersionId, toneId }).queryKey,
        });
      }
    },
  });

  return {
    updatePersonaPrompt,
    updateTonePrompt,
    updateCounselTechnique,
  };
};
