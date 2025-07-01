import { create } from 'zustand';
import { Counselor, PromptVersionResponseDto } from '~/__generated__/data-contracts';

interface PromptState {
  temporaryVersion: PromptVersionResponseDto | null;
  setTemporaryVersion: (v: PromptVersionResponseDto) => void;

  selectedCounselor: Counselor | null;
  setSelectedCounselor: (counselor: Counselor) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  temporaryVersion: null,
  setTemporaryVersion: (v) => set({ temporaryVersion: v }),

  selectedCounselor: null,
  setSelectedCounselor: (counselor) => set({ selectedCounselor: counselor }),
}));
