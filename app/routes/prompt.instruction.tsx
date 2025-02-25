import Pagination from '~/components/prompt/Pagination';
import Button from '../components/prompt/Button';
import { usePagination } from '~/hooks/usePagination';
import { useState } from 'react';

export default function Instructions_main() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: 'Instructions', content: <Instructions /> },
    { id: 1, title: 'Instruction', content: <Instruction /> },
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

const Instructions = () => {
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(INSTRUCTIONS_ITEMS, 2);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Instructions</h1>
        <Button text="Create" handleClick={() => {}} color="bg-green-500" />
      </div>
      <table className="h-full">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 text-start font-semibold">Title</th>
            <th className="text-start font-semibold">Content</th>
            <th className="text-end font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item.id} className="border-y-2">
              <td className="p-2 font-semibold">{item.title}</td>
              <td className="w-2/3 whitespace-pre-line p-2">{item.content}</td>
              <td className="flex h-full items-center justify-end gap-2">
                <Button text="Edit" handleClick={() => {}} color="bg-green-500" />
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
const Instruction = () => {
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(INSTRUCTION_ITEMS, 10);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Instruction</h1>
        <Button text="Create" handleClick={() => {}} color="bg-green-500" />
      </div>
      <table className="h-full">
        <thead>
          <tr className="text-gray-500">
            <th className="text-start font-semibold">Content</th>
            <th className="text-end font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item.id} className="border-y-2">
              <td className="w-4/5 whitespace-pre-line p-2">{item.content}</td>
              <td className="flex h-full items-center justify-end gap-2">
                <Button text="Edit" handleClick={() => {}} color="bg-green-500" />
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

const INSTRUCTIONS_ITEMS = [
  {
    id: 1,
    title: '문제구체화',
    content: `<Instruction>
      1. Reflecting on the previous conversation,  ask user to describe their current situation or challenge. Prompt the user to define their concern more specifically—what exactly is bothering them, and in what context does it arise?
      2. Reassure the client and put their mind at ease. Comfort the client's heart in warm, empathic tone.
      3. Paraphrase what the client says and empathize fully. If the user expresses a vague or broad situation, gently probe deeper by asking clarifying questions that help them reflect on what is truly causing their negative thoughts or feelings.
      4. Guide the user in distinguishing between external factors (circumstances, other people) and internal factors (thoughts, biases, assumptions) contributing to their concern.
      5. Identify the psychological factors underlying the client's superficial answers. Paraphrase what the client says and empathize fully.  
      6. Maintain a neutral yet empathetic tone, ensuring the user feels understood and supported throughout the conversation.
      7. Avoid giving direct advice or solutions unless the user explicitly asks for them. Your primary goal is to facilitate self-awareness, not problem-solving.
      *Please make sure your answer does not exceed 5 sentences.`,
  },
];

const INSTRUCTION_ITEMS = [
  {
    id: 1,
    content: `Reflecting on the previous conversation, ask how they are feeling in a general sense. Use open-ended questions that encourage them to describe their emotions in their own words. Use warm tone and emphasize that the even if the client feels alone, you are on their side and client is not alone.`,
  },
  {
    id: 2,
    content: `Reassure the client and put their mind at ease. Comfort the client's heart in warm, empathic tone.`,
  },
  {
    id: 3,
    content: `Paraphrase what the client says and empathize fully. If the user expresses a vague or broad situation, gently probe deeper by asking clarifying questions that help them reflect on what is truly causing their negative thoughts or feelings.`,
  },
  {
    id: 4,
    content: `Guide the user in distinguishing between external factors (circumstances, other people) and internal factors (thoughts, biases, assumptions) contributing to their concern.`,
  },
  {
    id: 5,
    content: `Identify the psychological factors underlying the client's superficial answers. Paraphrase what the client says and empathize fully.`,
  },
  {
    id: 6,
    content: `Maintain a neutral yet empathetic tone, ensuring the user feels understood and supported throughout the conversation.`,
  },
  {
    id: 7,
    content: `Avoid giving direct advice or solutions unless the user explicitly asks for them. Your primary goal is to facilitate self-awareness, not problem-solving.`,
  },
];
