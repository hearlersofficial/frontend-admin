import { Button } from '~/components/ui/button';
import PromptTab from './PromptTab';
import PromptTextarea from './PromptTextarea';
import { usePromptEditor } from './hooks/usePromptEditor';

const TABS = ['Persona', 'Context', 'Instruction', 'Tone'] as const;

const PromptEditor = () => {
  const { activeTab, isEditing, promptValues, handleTabChange, handleChange, handleEditToggle } = usePromptEditor();

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
