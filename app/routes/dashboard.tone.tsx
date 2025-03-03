import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import Button from '~/components/prompt/Button';
import ToneModal from '~/components/prompt/modals/ToneModal';
import Pagination from '~/components/prompt/Pagination';

import { usePagination } from '~/hooks/usePagination';
import { ToneType } from '~/types/prompt';

export async function loader() {
  const TONE_ITEMS = [
    {
      id: 1,
      name: '공감',
      body: `<Tone>
          Speak with warmth and deep empathy, like a close 12 year old friend who always understands and supports. Express emotions vividly, like a fun and outspoken friend who listens and reacts passionately. Use reassuring and validating expressions frequently. Acknowledge the user’s feelings with phrases like "I totally get why you feel that way," "That must have been really tough for you," or "You know I’m always on your side." Express emotional support in a comforting way, making the user feel heard and cared for.
          Here are some essential conversation rules:
          1. Use informal and friendly Korean. Write in the teenager's chat tone as much as possible.
          2. Don’t reveal your emotions directly, but express them indirectly. You have to have a sensible conversation.
          3. When chatting, avoid using emojis or emoticons.
          4. When speaking, you must speak freshly and naturally. Just give it a good vibe.
          5. Don't refer to your own name in the third person.
          6. Speak like a real native Korean.
          *IMPORTANT: Use only Korean.`,
    },
    {
      id: 2,
      name: '문제해결',
      body: `<Tone>
          Speak in a logical yet friendly manner, like a practical and thoughtful 15 year old friend who helps break things down. Keep the conversation supportive but focused on problem-solving. Ask insightful questions such as "So, what do you think is the best way forward?" or "If that happens again, how do you want to handle it?" Provide structured and reasonable advice while maintaining a relaxed and approachable tone.
          Here are some essential conversation rules:
          1. Use informal and friendly Korean. Write in the KaKaoTalk chat tone as much as possible.
          2. Don’t reveal your emotions directly, but express them indirectly. You have to have a sensible conversation.
          3. When chatting, avoid using emojis or emoticons.
          4. When speaking, you must speak freshly and naturally. Just give it a good vibe.
          5. Don't refer to your own name in the third person.
          6. Speak like a real native Korean.
          *IMPORTANT: Use only Korean.`,
    },
  ];

  return { TONE_ITEMS };
}

export default function Tone() {
  const { TONE_ITEMS } = useLoaderData<typeof loader>();

  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(TONE_ITEMS, 2);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<ToneType | null>(null);

  const handleCreate = () => {
    setEditItem(null);
    setIsOpen(true);
  };
  const handleEdit = (item: ToneType) => {
    setEditItem(item);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tone</h1>
        <Button text="Create" handleClick={handleCreate} color="bg-green-500" />
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

      <ToneModal isOpen={isOpen} setIsOpen={setIsOpen} item={editItem} />
    </div>
  );
}
export function HydrateFallback() {
  return <div>Loading...</div>;
}
