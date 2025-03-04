export type ContextType = { id: string; name: string; body: string };
export type ToneType = { id: string; name: string; body: string };
export type InstructionItemType = { id: string; body: string };
export type InstructionType = { id: string; name: string; instruction_items: InstructionItemType[] };

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface ContextModalProps extends ModalProps {
  item: ContextType | null;
}

export interface ToneModalProps extends ModalProps {
  item: ToneType | null;
}

export interface InstructionItemModalProps extends ModalProps {
  item: InstructionItemType | null;
}

export interface InstructionModalProps extends ModalProps {
  item: InstructionType | null;
  allItem: InstructionItemType[];
}
