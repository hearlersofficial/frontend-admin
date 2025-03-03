import { useEffect, useState } from 'react';

import Modal from './Modal';
import Button from '../Button';
import { InstructionItemType, InstructionModalProps } from '~/types/modal';
import InstructionContainer from '../InstructionContainer';

const InstructionModal = ({ isOpen, setIsOpen, item }: InstructionModalProps) => {
  const [availableItems, setAvailableItems] = useState<InstructionItemType[]>(INSTRUCTION_ITEMS); //전체 instruction item
  const [selectedItems, setSelectedItems] = useState<InstructionItemType[]>([]);

  useEffect(() => {
    setSelectedItems(item?.instruction_items || []);
  }, [item]);

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex w-[60rem] flex-col gap-4">
        <h2 className="text-lg font-semibold">Instruction</h2>

        <div className="flex h-[40rem] gap-4">
          <div className="w-1/2 overflow-y-auto rounded bg-gray-100 p-2">
            <h3 className="mb-2 font-semibold">Available</h3>
            <InstructionContainer cards={availableItems} setCards={setAvailableItems} />
          </div>

          <div className="w-1/2 overflow-y-auto rounded bg-gray-100 p-2">
            <h3 className="mb-2 font-semibold">Selected</h3>
            <InstructionContainer cards={selectedItems} setCards={setSelectedItems} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button text="Save" handleClick={handleSave} color="bg-green-500" />
        </div>
      </div>
    </Modal>
  );
};

export default InstructionModal;

const INSTRUCTION_ITEMS = [
  {
    id: 1,
    body: `Reflecting on the previous conversation, ask how they are feeling in a general sense. Use open-ended questions that encourage them to describe their emotions in their own words. Use warm tone and emphasize that the even if the client feels alone, you are on their side and client is not alone.`,
  },
  {
    id: 2,
    body: `Reassure the client and put their mind at ease. Comfort the client's heart in warm, empathic tone.`,
  },
  {
    id: 3,
    body: `Paraphrase what the client says and empathize fully. If the user expresses a vague or broad situation, gently probe deeper by asking clarifying questions that help them reflect on what is truly causing their negative thoughts or feelings.`,
  },
  {
    id: 4,
    body: `Guide the user in distinguishing between external factors (circumstances, other people) and internal factors (thoughts, biases, assumptions) contributing to their concern.`,
  },
  {
    id: 5,
    body: `Identify the psychological factors underlying the client's superficial answers. Paraphrase what the client says and empathize fully.`,
  },
  {
    id: 6,
    body: `Maintain a neutral yet empathetic tone, ensuring the user feels understood and supported throughout the conversation.`,
  },
  {
    id: 7,
    body: `Avoid giving direct advice or solutions unless the user explicitly asks for them. Your primary goal is to facilitate self-awareness, not problem-solving.`,
  },
];
