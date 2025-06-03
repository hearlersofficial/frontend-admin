import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import CharacterTabs from "~/components/character/character-tabs";

export default function CharacterPage() {
  const characters = [
    { id: "dahye", name: "다혜", avatar: "/images/dahye-avatar.png" },
    { id: "rian", name: "리안", avatar: "/images/rian-avatar.png" },
    { id: "jerry", name: "제리", avatar: "/images/jerry-avatar.png" },
    { id: "yoon", name: "윤", avatar: "/images/yoon-avatar.png" },
  ];

  // Dummy data for episodes - replace with actual data fetching later
  const dummyEpisodes = [
    {
      id: "1",
      title: "Cutscene 01. 첫 만남",
      level: 1,
      createdAt: "25.03.27 15:30",
      status: "배포",
      imageUrl: "/images/cutscene01.png",
    },
    {
      id: "2",
      title: "Cutscene 02. 상담실 구경",
      level: 2,
      createdAt: "25.03.27 15:30",
      status: "임시",
      imageUrl: "/images/cutscene02.png",
    },
    {
      id: "3",
      title: "Cutscene 03. 기분전환",
      level: 4, // Mismatched level with screenshot, using dummy data value
      createdAt: "25.03.27 15:30",
      status: "임시",
      imageUrl: "/images/cutscene03.png",
    },
    {
      id: "4",
      title: "Cutscene 04. 다혜의 하루",
      level: 4,
      createdAt: "25.03.27 15:30",
      status: "임시",
      imageUrl: "/images/cutscene04.png",
    },
    {
      id: "5",
      title: "Cutscene 05. 소소한 행복",
      level: 5,
      createdAt: "25.03.27 15:30",
      status: "임시",
      imageUrl: "/images/cutscene05.png",
    },
  ];


  return (
    <div className="container mx-auto p-4 md:p-8">
      <Tabs defaultValue={characters[0].id} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
          {characters.map((char) => (
            <TabsTrigger key={char.id} value={char.id}>
              <img src={char.avatar} alt={char.name} className="w-6 h-6 rounded-full mr-2" />
              {char.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {characters.map((char) => (
          <TabsContent key={char.id} value={char.id}>
            <CharacterTabs characterName={char.name} episodes={dummyEpisodes} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 