import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export type ContextType = { id: number; name: string; body: string };

export interface ContextModalProps extends ModalProps {
  item: ContextType | null;
}

export type ToneType = { id: number; name: string; body: string };

export interface ToneModalProps extends ModalProps {
  item: ToneType | null;
}

export type InstructionItemType = { id: number; body: string };

export interface InstructionItemModalProps extends ModalProps {
  item: InstructionItemType | null;
}

export type InstructionType = { id: number; name: string; instruction_items: InstructionItemType[] };

export interface InstructionModalProps extends ModalProps {
  item: InstructionType | null;
}
