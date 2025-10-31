import { useEffect, useState } from 'react';

import { PromptType } from '~/types/prompt';
import { usePromptData } from './usePromptData';
import { usePromptMutations } from './usePromptMutations';

const DEFAULT_PROMPT_VALUES: Record<PromptType, string> = {
  Persona: '',
  Context: '',
  Instruction: '',
  Tone: '',
};

export const usePromptEditor = () => {
  const [activeTab, setActiveTab] = useState<PromptType>('Persona');
  const [isEditing, setIsEditing] = useState(false);
  const [promptValues, setPromptValues] = useState<Record<PromptType, string>>(DEFAULT_PROMPT_VALUES);

  const { personaData, toneData, selectedCounselTechnique, selectedCounselor } = usePromptData();
  const { updatePersonaPrompt, updateTonePrompt, updateCounselTechnique } = usePromptMutations();

  useEffect(() => {
    const newValues: Partial<Record<PromptType, string>> = {};

    if (personaData) {
      newValues.Persona = personaData.body;
    }

    if (toneData) {
      newValues.Tone = toneData.body;
    }

    if (selectedCounselTechnique) {
      newValues.Context = selectedCounselTechnique.context;
      newValues.Instruction = selectedCounselTechnique.instruction;
    }

    setPromptValues((prev) => {
      const updated = { ...prev };
      if (newValues.Persona !== undefined) {
        updated.Persona = newValues.Persona;
      }
      if (newValues.Tone !== undefined) {
        updated.Tone = newValues.Tone;
      }
      if (newValues.Context !== undefined) {
        updated.Context = newValues.Context;
      }
      if (newValues.Instruction !== undefined) {
        updated.Instruction = newValues.Instruction;
      }
      return updated;
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
        case 'Persona': {
          if (selectedCounselor) {
            updatePersonaPrompt({
              counselorId: selectedCounselor.id,
              body: promptValues.Persona,
            });
          }
          break;
        }
        case 'Tone': {
          if (selectedCounselor?.toneId) {
            updateTonePrompt({
              toneId: selectedCounselor.toneId,
              body: promptValues.Tone,
            });
          }
          break;
        }
        case 'Context':
        case 'Instruction': {
          if (selectedCounselTechnique) {
            updateCounselTechnique({
              counselTechniqueId: selectedCounselTechnique.id,
              data: {
                name: selectedCounselTechnique.name,
                temperature: selectedCounselTechnique.temperature,
                isStartTechnique: selectedCounselTechnique.isStartTechnique,
                context: promptValues.Context,
                instruction: promptValues.Instruction,
              },
            });
          }
          break;
        }
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
