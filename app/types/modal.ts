import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export type ContextType = { id: number; name: string; body: string } | null;

export interface ContextModalProps extends ModalProps {
  item: ContextType;
}

export type ToneType = { id: number; name: string; body: string } | null;

export interface ToneModalProps extends ModalProps {
  item: ToneType;
}

export type InstructionItemType = { id: number; body: string } | null;

export interface InstructionItemModalProps extends ModalProps {
  item: InstructionItemType;
}

export type InstructionType = { id: number; name: string; instruction_items: InstructionItemType[] } | null;

export interface InstructionModalProps extends ModalProps {
  item: InstructionType;
}
