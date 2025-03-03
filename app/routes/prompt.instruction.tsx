import { useState } from 'react';

import Button from '../components/prompt/Button';
import InstructionItemModal from '~/components/prompt/modals/InstructionItemModal';
import Pagination from '~/components/prompt/Pagination';

import { usePagination } from '~/hooks/usePagination';
import { InstructionItemType, InstructionType } from '~/types/modal';

export default function Instructions_main() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: 'Instruction', content: <Instruction /> },
    { id: 1, title: 'Instruction Item', content: <InstructionItem /> },
  ];

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-center text-xl ${activeTab === tab.id ? 'border-b-4 border-gray-800 font-bold' : 'border-b-4 border-gray-200 font-semibold text-gray-500'}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {tabs[activeTab].content}
    </div>
  );
}

const Instruction = () => {
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(INSTRUCTIONS, 2);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<InstructionType>(null);

  const handleCreate = () => {
    setEditItem(null);
    setIsOpen(true);
  };
  const handleEdit = (item: InstructionType) => {
    setEditItem(item);
    setIsOpen(true);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Instruction</h1>
        <Button text="Create" handleClick={handleCreate} color="bg-green-500" />
      </div>
      <table className="h-full">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 text-start font-semibold">Name</th>
            <th className="text-start font-semibold">Instruction Items</th>
            <th className="text-end font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item.id} className="border-y-2">
              <td className="p-2 font-semibold">{item.name}</td>
              <td className="w-2/3 whitespace-pre-line p-2">
                {item.instruction_items.map((innerItem) => (
                  <p key={innerItem.id} className="mb-2">
                    {innerItem.body}
                  </p>
                ))}
              </td>
              <td className="flex h-full items-center justify-end gap-2">
                <Button text="Edit" handleClick={() => handleEdit(item)} color="bg-green-500" />
                <Button text="Delete" handleClick={() => {}} color="bg-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
const InstructionItem = () => {
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(INSTRUCTION_ITEMS, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<InstructionItemType>(null);

  const handleCreate = () => {
    setEditItem(null);
    setIsOpen(true);
  };
  const handleEdit = (item: InstructionItemType) => {
    setEditItem(item);
    setIsOpen(true);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Instruction Item</h1>
        <Button text="Create" handleClick={handleCreate} color="bg-green-500" />
      </div>
      <table className="h-full">
        <thead>
          <tr className="text-gray-500">
            <th className="text-start font-semibold">Body</th>
            <th className="text-end font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item.id} className="border-y-2">
              <td className="w-4/5 whitespace-pre-line p-2">{item.body}</td>
              <td className="flex h-full items-center justify-end gap-2">
                <Button text="Edit" handleClick={() => handleEdit(item)} color="bg-green-500" />
                <Button text="Delete" handleClick={() => {}} color="bg-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <InstructionItemModal isOpen={isOpen} setIsOpen={setIsOpen} item={editItem} />
    </div>
  );
};

const INSTRUCTIONS = [
  {
    id: 1,
    name: '문제구체화',
    instruction_items: [
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
    ],
  },
];

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
