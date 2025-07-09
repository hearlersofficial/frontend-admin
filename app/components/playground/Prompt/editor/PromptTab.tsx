import { PromptType } from '~/types/prompt';

interface PromptTabProps {
  tabs: readonly PromptType[];
  activeTab: PromptType;
  onSelect: (tab: PromptType) => void;
}

const PromptTab = ({ tabs, activeTab, onSelect }: PromptTabProps) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const selected = tab === activeTab;

        return (
          <button
            key={tab}
            onClick={() => onSelect(tab)}
            className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${
              selected ? 'border-transparent bg-purpleGrad text-white' : 'border-[#A99FAA] text-[#A99FAA]'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
export default PromptTab;
