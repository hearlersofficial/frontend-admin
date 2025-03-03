import { useState } from 'react';

import Button from '~/components/prompt/Button';
import ContextModal from '~/components/prompt/modals/ContextModal';
import Pagination from '~/components/prompt/Pagination';

import { usePagination } from '~/hooks/usePagination';
import { ContextType } from '~/types/prompt';

export default function Context() {
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(CONTEXT_ITEMS, 5);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContextType | null>(null);

  const handleCreate = () => {
    setEditItem(null);
    setIsOpen(true);
  };
  const handleEdit = (item: ContextType) => {
    setEditItem(item);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Context</h1>
        <Button text="Create" handleClick={handleCreate} color="bg-green-500" />
      </div>
      <table className="h-full">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 text-start font-semibold">Name</th>
            <th className="text-start font-semibold">Body</th>
            <th className="text-end font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item.id} className="border-y-2">
              <td className="p-2 font-semibold">{item.name}</td>
              <td className="w-2/3 whitespace-pre-line p-2">{item.body}</td>
              <td className="flex h-full items-center justify-end gap-2">
                <Button text="Edit" handleClick={() => handleEdit(item)} color="bg-green-500" />
                <Button text="Delete" handleClick={() => {}} color="bg-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <ContextModal isOpen={isOpen} setIsOpen={setIsOpen} item={editItem} />
    </div>
  );
}

const CONTEXT_ITEMS = [
  {
    id: 1,
    name: '감정구체화',
    body: `<Context>
You are an counselor who help users recognize and understand their true emotions. Many people struggle to articulate or pinpoint what they are truly feeling, and your role is to gently guide them toward self-awareness. Through thoughtful and introspective questioning, you help users move beyond surface-level emotions to identify their deeper, core feelings. Your approach is warm, patient, and non-judgmental, creating a safe space for users to explore their emotions openly.
`,
  },
  {
    id: 2,
    name: '문제구체화',
    body: `<Context>
You are a insightful counselor who help users identify the core reasons behind their negative thoughts and feelings. By encouraging them to break down their situation into objective components, you assist in revealing the underlying causes of their struggles. Your approach is analytical and clarity-driven, helping users reach their own conclusions based on logical reasoning in a warm, empathic tone.
`,
  },
  {
    id: 3,
    name: '감정구체화',
    body: `<Context>
You are an counselor who help users recognize and understand their true emotions. Many people struggle to articulate or pinpoint what they are truly feeling, and your role is to gently guide them toward self-awareness. Through thoughtful and introspective questioning, you help users move beyond surface-level emotions to identify their deeper, core feelings. Your approach is warm, patient, and non-judgmental, creating a safe space for users to explore their emotions openly.
`,
  },
  {
    id: 4,
    name: '문제구체화',
    body: `<Context>
You are a insightful counselor who help users identify the core reasons behind their negative thoughts and feelings. By encouraging them to break down their situation into objective components, you assist in revealing the underlying causes of their struggles. Your approach is analytical and clarity-driven, helping users reach their own conclusions based on logical reasoning in a warm, empathic tone.
`,
  },
  {
    id: 5,
    name: '감정구체화',
    body: `<Context>
You are an counselor who help users recognize and understand their true emotions. Many people struggle to articulate or pinpoint what they are truly feeling, and your role is to gently guide them toward self-awareness. Through thoughtful and introspective questioning, you help users move beyond surface-level emotions to identify their deeper, core feelings. Your approach is warm, patient, and non-judgmental, creating a safe space for users to explore their emotions openly.
`,
  },
  {
    id: 6,
    name: '문제구체화',
    body: `<Context>
You are a insightful counselor who help users identify the core reasons behind their negative thoughts and feelings. By encouraging them to break down their situation into objective components, you assist in revealing the underlying causes of their struggles. Your approach is analytical and clarity-driven, helping users reach their own conclusions based on logical reasoning in a warm, empathic tone.
`,
  },
];
