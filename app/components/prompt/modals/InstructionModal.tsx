import { useEffect, useState } from 'react';

import Modal from './Modal';
import Button from '../Button';
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
  }, [item]);

  const moveItem = (item: InstructionItemType, containerId: string) => {
    if (containerId == 'available') {
      setAvailableItems(availableItems.filter((i) => i.id !== item.id));
      setSelectedItems([...selectedItems, item]);
    } else if (containerId == 'selected') {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
      setAvailableItems([...availableItems, item]);
    }
  };

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
            <InstructionContainer
              cards={availableItems}
              setCards={setAvailableItems}
              containerId="available"
              moveItem={moveItem}
            />
          </div>

          <div className="w-1/2 overflow-y-auto rounded bg-gray-100 p-2">
            <h3 className="mb-2 font-semibold">Selected</h3>
            <InstructionContainer
              cards={selectedItems}
              setCards={setSelectedItems}
              containerId="selected"
              moveItem={moveItem}
            />
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
