import { useLoaderData } from '@remix-run/react';

import { Counselor } from '~/__generated__/data-contracts';
import { usePromptStore } from '~/store/usePromptStore';

const CounselorList = () => {
  const { counselors } = useLoaderData<{ counselors: Counselor[] }>();

  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const setSelectedCounselor = usePromptStore((s) => s.setSelectedCounselor);

  const currentId = selectedCounselor?.id ?? counselors[0] ?? '';

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
