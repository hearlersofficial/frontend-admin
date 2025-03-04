import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { TechniqueContainer } from './dashboard/components/TechniqueContainer';
export async function loader() {
  // TODO: 데이터 로딩
  const techniqueCards = [
    ['감정공감', '컨디션 물어보기', '상담 마무리', '오늘 일정 물어보기'],
    ['감정공감', '뭐해'],
  ];
  return { techniqueCards };
}

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  const [initialCards, setInitialCards] = useState(data.techniqueCards);

  return (
    <div>
      <h1>Hearlers Admin</h1>
      <div className="flex flex-col gap-3">
        {initialCards.map((counsels, index) => (
          <TechniqueContainer
            key={index}
            cards={counsels}
            setCards={(newCards) => {
              const updatedCards = [...initialCards];
              updatedCards[index] = newCards;
              setInitialCards(updatedCards);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}
