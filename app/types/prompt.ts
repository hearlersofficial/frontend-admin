export type PromptType = 'Persona' | 'Context' | 'Instruction' | 'Tone';

export interface Prompt {
  id: number;
  title: string;
  time: string;
  fav: boolean;
  memo: string;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
