import { useState } from 'react';
import { useCounselors } from "~/hooks/queries";
import Sidebar from './Sidebar';
import CounselorTabs from './CounselorTabs';
import { LoadingState, ErrorState } from './LoadingStates';
import { TabId } from './types';

const CharacterPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>('cutscene');
  const { data: counselors = [], isLoading, error } = useCounselors();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <div className="flex gap-8 max-w-7xl mx-auto">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-grow">
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            {activeTab === 'cutscene' && <CounselorTabs counselors={counselors} />}
            {activeTab === 'opening' && (
              <div>
                <h2 className="text-2xl">Opening Content</h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CharacterPage; 