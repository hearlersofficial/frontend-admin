import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export type ContextType = { title: string; content: string } | null;

export interface ContextModalProps extends ModalProps {
  item: ContextType;
}

export type ToneType = { title: string; content: string } | null;

export interface ToneModalProps extends ModalProps {
  item: ToneType;
}
