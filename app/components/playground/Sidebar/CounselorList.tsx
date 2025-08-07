import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';

const CounselorList = () => {
  const { data: counselorsData } = useQuery({
    ...queries.v1.getCounselors({}),
  });

  const counselors = useMemo(() => counselorsData?.data?.data?.counselors ?? [], [counselorsData]);

  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const setSelectedCounselor = usePromptStore((s) => s.setSelectedCounselor);

  useEffect(() => {
    if (!selectedCounselor && counselors.length > 0) {
      setSelectedCounselor(counselors[0]);
    }
  }, [counselors, selectedCounselor, setSelectedCounselor]);

  const currentId = selectedCounselor?.id ?? '';

  return (
    <div className="space-y-1">
      {counselors.map((counselor) => {
        const isSelected = counselor.id === currentId;

        return (
          <button
            key={counselor.id}
            onClick={() => setSelectedCounselor(counselor)}
            className={`flex w-full flex-col items-center gap-3 rounded-l-xl p-3 ${
              isSelected ? 'bg-white' : 'bg-transparent'
            }`}
          >
            <div className="h-16 w-16 rounded-full bg-purpleGrad" />
            {isSelected && (
              <div className="flex flex-col items-center justify-center">
                <span className="text-base font-bold text-[#878787]">{counselor.name}</span>
                <span className="rounded-lg bg-[#A2BBFE] px-2 py-0.5 text-xs text-white">#{counselor.description}</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
export default CounselorList;
