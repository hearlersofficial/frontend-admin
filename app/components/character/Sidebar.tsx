import { Tab, TabId } from './types';

const MAIN_TABS: Tab[] = [
  { id: "cutscene", name: "Cutscene" },
  { id: "opening", name: "Opening" },
];

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

interface SidebarButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}

const SidebarButton = ({ tab, isActive, onClick }: SidebarButtonProps) => (
  <button
    onClick={onClick}
    className={`
      justify-start w-full text-left text-[22px] font-light p-2 transition-colors
      ${isActive 
        ? 'text-black font-extrabold border-r-4 border-black' 
        : 'text-gray-400 hover:text-gray-600'
      }
    `}
  >
    {tab.name}
  </button>
);

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => (
  <aside className="w-[150px] flex-shrink-0">
    <div className="flex flex-col space-y-4">
      {MAIN_TABS.map((tab) => (
        <SidebarButton
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id as TabId)}
        />
      ))}
    </div>
  </aside>
);

export default Sidebar; 