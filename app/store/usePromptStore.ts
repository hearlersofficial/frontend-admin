import { create } from 'zustand';
import { Counselor, CounselTechniqueResponseDto, PromptVersionResponseDto } from '~/__generated__/data-contracts';

interface PromptState {
  temporaryVersion: PromptVersionResponseDto | null;
  setTemporaryVersion: (v: PromptVersionResponseDto) => void;

  selectedCounselor: Counselor | null;
  setSelectedCounselor: (counselor: Counselor) => void;

  selectedCounselTechnique: CounselTechniqueResponseDto | null;
  setSelectedCounselTechnique: (t: CounselTechniqueResponseDto) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  temporaryVersion: null,
  setTemporaryVersion: (v) => set({ temporaryVersion: v }),

  selectedCounselor: null,
  setSelectedCounselor: (counselor) => set({ selectedCounselor: counselor }),

  selectedCounselTechnique: null,
  setSelectedCounselTechnique: (t) => set({ selectedCounselTechnique: t }),
}));
