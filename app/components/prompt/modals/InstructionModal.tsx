import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Button from '../Button';
import Column from '../Column';
import DraggableItem from '../DraggableItem';
import Modal from './Modal';

import { InstructionModalProps } from '~/types/modal';

const InstructionModal = ({ isOpen, setIsOpen, item }: InstructionModalProps) => {
  const itemsWithColumn = INSTRUCTION_ITEMS.map((i, index) => ({
    ...i,
    index: index,
    column: 'available',
  }));

  useEffect(() => {
    setItems(
      INSTRUCTION_ITEMS.map((i, index) => ({
        ...i,
        index: index,
        column: item?.instruction_items.some((selectedItem) => selectedItem?.id === i.id) ? 'selected' : 'available',
      }))
    );
  }, [item]);

  const [items, setItems] = useState(itemsWithColumn);

  const moveCardHandler = (dragIndex: number, hoverIndex: number, columnName: string) => {
    const dragItem = items[dragIndex];

    if (dragItem && dragItem.column === columnName) {
      setItems((prevState) => {
        const updatedItems = [...prevState];
        const [removed] = updatedItems.splice(dragIndex, 1);
        updatedItems.splice(hoverIndex, 0, removed);
        return updatedItems;
      });
    }
  };

  const returnItemsForColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <DraggableItem
          key={item.id}
          id={item.id}
          index={index}
          body={item.body}
          column={item.column}
          setItems={setItems}
          moveCardHandler={(dragIndex, hoverIndex) => moveCardHandler(dragIndex, hoverIndex, columnName)}
        />
      ));
  };

  const handleSave = () => {
    const result = items.filter((item) => item.column == 'selected');
    console.log(result);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <DndProvider backend={HTML5Backend}>
        <div className="flex w-[60rem] flex-col gap-4">
          <h2 className="text-lg font-semibold">Instruction</h2>
          <div className="flex w-full gap-2">
            <Column title={'available'}>{returnItemsForColumn('available')}</Column>
            <Column title={'selected'}>{returnItemsForColumn('selected')}</Column>
          </div>

          <div className="flex justify-end">
            <Button text="Save" handleClick={handleSave} color="bg-green-500" />
          </div>
        </div>
      </DndProvider>
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
