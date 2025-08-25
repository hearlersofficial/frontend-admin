import { useUpdateCounselTechnique, useUpdatePersonaPrompt, useUpdateTonePrompt } from '~/hooks/mutations';
import { usePromptStore } from '~/store/usePromptStore';

export const usePromptMutations = () => {
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);

  const { mutate: updatePersonaPrompt } = useUpdatePersonaPrompt({});

  const { mutate: updateTonePrompt } = useUpdateTonePrompt();

  const { mutate: updateCounselTechnique } = useUpdateCounselTechnique({
    onSuccess: (res) => {
      const newTechniques = res.data?.data?.counselTechnique;
      if (newTechniques) {
        setSelectedCounselTechnique(newTechniques);
      }
    },
  });

  return {
    updatePersonaPrompt,
    updateTonePrompt,
    updateCounselTechnique,
  };
};
