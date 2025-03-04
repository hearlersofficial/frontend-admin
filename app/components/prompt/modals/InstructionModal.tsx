import { useEffect, useState } from 'react';
import { CircleArrowRightIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import Modal from './Modal';
import InstructionContainer from '../InstructionContainer';

import { InstructionItemType, InstructionModalProps } from '~/types/prompt';

const InstructionModal = ({ isOpen, setIsOpen, item, allItem }: InstructionModalProps) => {
  const [availableItems, setAvailableItems] = useState<InstructionItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<InstructionItemType[]>([]);

  useEffect(() => {
    const filteredAvailableItems = allItem.filter(
      (instructionItem) => !item?.instruction_items.some((selectedItem) => selectedItem.id === instructionItem.id)
    );

    setAvailableItems(filteredAvailableItems);
    setSelectedItems(item?.instruction_items || []);
  }, [allItem, item]);

  const moveToSelected = (item: InstructionItemType) => {
    setAvailableItems(availableItems.filter((i) => i.id !== item.id));
    setSelectedItems([...selectedItems, item]);
  };
  const moveToAvailable = (item: InstructionItemType) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    setAvailableItems([...availableItems, item]);
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex w-[60rem] flex-col gap-4">
        <h2 className="text-lg font-semibold">Instruction</h2>

        <div className="flex h-[40rem] gap-4">
          <div className="flex w-1/2 flex-col gap-2 overflow-y-auto rounded bg-gray-100 p-2">
            <h3 className="font-semibold">Available</h3>
            {availableItems.map((item) => (
              <div key={item.id} className="flex items-center gap-1">
                <div className="flex gap-2 rounded border bg-white p-2">{item.body}</div>
                <button
                  onClick={() => {
                    moveToSelected(item);
                  }}
                >
                  <CircleArrowRightIcon />
                </button>
              </div>
            ))}
          </div>

          <div className="w-1/2 overflow-y-auto rounded bg-gray-100 p-2">
            <h3 className="mb-2 font-semibold">Selected</h3>
            <InstructionContainer cards={selectedItems} setCards={setSelectedItems} deleteCard={moveToAvailable} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

export default InstructionModal;
