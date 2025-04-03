import { useState } from 'react';

import { Button } from '~/components/ui/button';
import PromptTab from './PromptTab';
import PromptTextarea from './PromptTextarea';

import { PromptType } from '~/types/prompt';

const TABS = ['Persona', 'Context', 'Instruction', 'Tone'] as const;

const Prompt = () => {
  const [activeTab, setActiveTab] = useState<PromptType>('Persona');

  const [personaValue, setPersonaValue] = useState('');

  type OtherTabs = Exclude<PromptType, 'Persona'>;
  const [promptValues, setPromptValues] = useState<Record<OtherTabs, string>>({
    Context: '',
    Instruction: '',
    Tone: '',
  });

  const handleChange = (value: string) => {
    if (activeTab === 'Persona') {
      setPersonaValue(value);
    } else {
      setPromptValues((prev) => ({
        ...prev,
        [activeTab]: value,
      }));
    }
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
      <PromptTextarea
        value={activeTab === 'Persona' ? personaValue : promptValues[activeTab]}
        onChange={handleChange}
      />
    </div>
  );
};
export default Prompt;
