import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export type ContextType = { name: string; body: string } | null;

export interface ContextModalProps extends ModalProps {
  item: ContextType;
}

export type ToneType = { name: string; body: string } | null;

export interface ToneModalProps extends ModalProps {
  item: ToneType;
}

export type InstructionItemType = { body: string } | null;

export interface InstructionModalProps extends ModalProps {
  item: InstructionItemType;
}
