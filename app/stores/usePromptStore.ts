import { create } from 'zustand';
  
import { Counselor, CounselTechnique, PromptVersion } from '~/api/v1';

interface PromptState {
  temporaryVersion: PromptVersion | null;
  setTemporaryVersion: (v: PromptVersion) => void;

  selectedCounselor: Counselor | null;
  setSelectedCounselor: (counselor: Counselor) => void;

  selectedCounselTechnique: CounselTechnique | null;
  setSelectedCounselTechnique: (t: CounselTechnique) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  temporaryVersion: null,
  setTemporaryVersion: (v) => set({ temporaryVersion: v }),

  selectedCounselor: null,
  setSelectedCounselor: (counselor) => set({ selectedCounselor: counselor }),

  selectedCounselTechnique: null,
  setSelectedCounselTechnique: (t) => set({ selectedCounselTechnique: t }),
}));
