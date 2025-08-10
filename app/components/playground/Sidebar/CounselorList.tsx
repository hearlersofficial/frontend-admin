import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';

const CounselorList = () => {
  const { data: counselorsData } = useQuery({
    ...queries.v1.getCounselors({}),
  });

  const { data: tonesData } = useQuery({
    ...queries.v1.getTones({}),
  });

  const counselors = useMemo(() => counselorsData?.data?.data?.counselors ?? [], [counselorsData]);
  const toneList = useMemo(() => tonesData?.data?.data?.tones ?? [], [tonesData]);
  const toneIdToTone = useMemo(() => {
    const map: Record<string, { id?: string; name?: string }> = {};
    for (const tone of toneList) {
      if (tone?.id) map[tone.id] = tone;
    }
    return map;
  }, [toneList]);

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
            {counselor.profileImage ? (
              <img
                src={counselor.profileImage}
                alt={`${counselor.name ?? 'counselor'} profile`}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-purpleGrad" />
            )}
            {isSelected && (
              <div className="flex flex-col items-center justify-center">
                <span className="text-base font-bold text-[#878787]">{counselor.name}</span>
                <span className="rounded-lg bg-[#A2BBFE] px-2 py-0.5 text-xs text-white">
                  #{toneIdToTone[counselor.toneId ?? '']?.name ?? counselor.description}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
export default CounselorList;
