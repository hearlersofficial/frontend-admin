import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import PromptTab from './PromptTab';
import PromptTextarea from './PromptTextarea';

import { PromptType } from '~/types/prompt';
import { usePromptStore } from '~/store/usePromptStore';
import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';

const TABS = ['Persona', 'Context', 'Instruction', 'Tone'] as const;

const PromptEditor = () => {
  const [activeTab, setActiveTab] = useState<PromptType>('Persona');

  const [promptValues, setPromptValues] = useState<Record<PromptType, string>>({
    Persona: '',
    Context: '',
    Instruction: '',
    Tone: '',
  });

  /// persona
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);

  const personaPromptId =
    temporaryVersion?.counselorScopedPrompts?.find((p) => p.counselorId === selectedCounselor?.id)?.personaPromptId ??
    '';

  const { data: personaData } = useQuery({
    enabled: !!personaPromptId,
    ...queries.v1.getPersonaPromptById(personaPromptId),
  });

  useEffect(() => {
    if (personaData?.body) {
      setPromptValues((prev) => ({ ...prev, Persona: personaData?.body ?? '' }));
    }
  }, [personaData]);

  // tone
  const toneId = selectedCounselor?.toneId;
  const tonePromptId = temporaryVersion?.toneScopedPrompts?.find((p) => p.toneId === toneId)?.tonePromptId ?? '';

  const { data: toneData } = useQuery({
    enabled: !!tonePromptId,
    ...queries.v1.getTonePromptById(tonePromptId),
  });

  useEffect(() => {
    if (toneData?.body) {
      setPromptValues((prev) => ({ ...prev, Tone: toneData.body ?? '' }));
    }
  }, [toneData]);

  const handleChange = (value: string) => {
    setPromptValues((prev) => ({
      ...prev,
      [activeTab]: value,
    }));
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#68676A]">프롬프트</h3>
        <Button className="rounded-full bg-[#736A84]" size="sm">
          수정
        </Button>
      </div>

      <div className="mb-4 mt-2 h-[1px] bg-[#ECE9F1]" />

      <PromptTab tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
      <PromptTextarea value={promptValues[activeTab]} onChange={handleChange} />
    </div>
  );
};
export default PromptEditor;
