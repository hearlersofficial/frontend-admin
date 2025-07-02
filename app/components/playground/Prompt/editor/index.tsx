import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import PromptTab from './PromptTab';
import PromptTextarea from './PromptTextarea';

import { PromptType } from '~/types/prompt';
import { usePromptStore } from '~/store/usePromptStore';
import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';
import { useUpdateCounselTechnique, useUpdatePersonaPrompt, useUpdateTonePrompt } from '~/hooks/mutations';

const TABS = ['Persona', 'Context', 'Instruction', 'Tone'] as const;

const PromptEditor = () => {
  const [activeTab, setActiveTab] = useState<PromptType>('Persona');
  const [isEditing, setIsEditing] = useState(false);

  const [promptValues, setPromptValues] = useState<Record<PromptType, string>>({
    Persona: '',
    Context: '',
    Instruction: '',
    Tone: '',
  });

  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique);

  /// persona
  const personaPromptId =
    temporaryVersion?.counselorScopedPrompts?.find((p) => p.counselorId === selectedCounselor?.id)?.personaPromptId ??
    '';

  const { data: personaData } = useQuery({
    enabled: !!personaPromptId,
    ...queries.v1.getPersonaPromptById(personaPromptId),
  });

  // tone
  const toneId = selectedCounselor?.toneId;
  const tonePromptId = temporaryVersion?.toneScopedPrompts?.find((p) => p.toneId === toneId)?.tonePromptId ?? '';

  const { data: toneData } = useQuery({
    enabled: !!tonePromptId,
    ...queries.v1.getTonePromptById(tonePromptId),
  });

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

  const { mutate: updatePersonaPrompt } = useUpdatePersonaPrompt({});
  const { mutate: updateTonePrompt } = useUpdateTonePrompt();
  const { mutate: updateCounselTechnique } = useUpdateCounselTechnique();

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

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#68676A]">프롬프트</h3>
        <Button onClick={handleEditToggle} className="rounded-full bg-[#736A84]" size="sm">
          {isEditing ? '완료' : '수정'}
        </Button>
      </div>

      <div className="mb-4 mt-2 h-[1px] bg-[#ECE9F1]" />

      <PromptTab tabs={TABS} activeTab={activeTab} onSelect={handleTabChange} />
      <PromptTextarea value={promptValues[activeTab]} onChange={handleChange} disabled={!isEditing} />
    </div>
  );
};
export default PromptEditor;
