import { useEffect, useState } from 'react';

import { PromptType } from '~/types/prompt';
import { usePromptData } from './usePromptData';
import { usePromptMutations } from './usePromptMutations';

export const usePromptEditor = () => {
  const [activeTab, setActiveTab] = useState<PromptType>('Persona');
  const [isEditing, setIsEditing] = useState(false);
  const [promptValues, setPromptValues] = useState<Record<PromptType, string>>({
    Persona: '',
    Context: '',
    Instruction: '',
    Tone: '',
  });

  const { personaData, toneData, selectedCounselTechnique, selectedCounselor } = usePromptData();
  const { updatePersonaPrompt, updateTonePrompt, updateCounselTechnique } = usePromptMutations();

  useEffect(() => {
    if (!personaData?.body || !selectedCounselTechnique || !toneData?.body) return;

    setPromptValues({
      Persona: personaData?.body ?? '',
      Context: selectedCounselTechnique?.context ?? '',
      Instruction: selectedCounselTechnique?.instruction ?? '',
      Tone: toneData?.body ?? '',
    });
  }, [personaData, toneData, selectedCounselTechnique]);

  const handleTabChange = (tab: PromptType) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleChange = (value: string) => {
    setPromptValues((prev) => ({
      ...prev,
      [activeTab]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      switch (activeTab) {
        case 'Persona':
          if (selectedCounselor?.id) {
            updatePersonaPrompt({
              counselorId: selectedCounselor.id,
              body: promptValues.Persona,
            });
          }
          break;
        case 'Tone':
          if (selectedCounselor?.toneId) {
            updateTonePrompt({
              toneId: selectedCounselor.toneId,
              body: promptValues.Tone,
            });
          }
          break;
        case 'Context':
        case 'Instruction':
          if (selectedCounselTechnique?.id) {
            updateCounselTechnique({
              counselTechniqueId: selectedCounselTechnique.id,
              data: {
                context: promptValues.Context,
                instruction: promptValues.Instruction,
              },
            });
          }
          break;
      }

      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return {
    activeTab,
    isEditing,
    promptValues,

    handleTabChange,
    handleChange,
    handleEditToggle,
  };
};
