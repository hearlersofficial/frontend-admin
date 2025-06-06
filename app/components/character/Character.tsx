import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CharacterTabs from "~/components/character/character-tabs";

const CharacterPage = () => {
  const mainTabs = [
    { id: "cutscene", name: "Cutscene" },
    { id: "opening", name: "Opening" },
  ];

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
    <div className="min-h-screen bg-[#F2F2F7] mx-auto p-4 md:p-8">
      <Tabs defaultValue={mainTabs[0].id} orientation="vertical" className="w-full">
        <div className="flex space-x-6">
          <TabsList className="flex flex-col space-y-1 w-auto md:w-[200px]">
            {mainTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="justify-start w-full px-4 py-2">
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-grow">
            <TabsContent value="cutscene" className="mt-0">
              <Tabs defaultValue={characters[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
                  {characters.map((char) => (
                    <TabsTrigger key={char.id} value={char.id}>
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
            </TabsContent>

            <TabsContent value="opening" className="mt-0">
              {/* Opening content will be implemented later */}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
export default CharacterPage; 