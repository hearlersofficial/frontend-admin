import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CharacterTabs from "~/components/character/CharacterTabs";

const CharacterPage = () => {
  const [activeTab, setActiveTab] = useState('cutscene');
  
  const mainTabs = [
    { id: "cutscene", name: "Cutscene" },
    { id: "opening", name: "Opening" },
  ];

  const characters = [
    { id: "dahye", name: "다혜", avatar: "/images/dahye-avatar.png", tag: "#해결" },
    { id: "rian", name: "리안", avatar: "/images/rian-avatar.png", tag: "#성장" },
    { id: "jerry", name: "제리", avatar: "/images/jerry-avatar.png", tag: "#탐색" },
    { id: "yoon", name: "윤", avatar: "/images/yoon-avatar.png", tag: "#안정" },
  ];

  const dummyEpisodes = Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Cutscene ${String(i + 1).padStart(2, '0')}. 에피소드 제목 ${i + 1}`,
    level: (i % 5) + 1,
    createdAt: "25.03.27 15:30",
    status: i % 3 === 0 ? "배포" : "임시",
    imageUrl: "",
  }));

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <div className="flex gap-8 max-w-7xl mx-auto">
        <aside className="w-[150px] flex-shrink-0">
          <div className="flex flex-col space-y-4">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  justify-start w-full text-left
                  text-[22px] font-light
                  p-2
                  ${activeTab === tab.id 
                    ? 'text-black font-extrabold border-r-4 border-black' 
                    : 'text-gray-400'
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </aside>
        
        <main className="flex-grow">
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            {activeTab === 'cutscene' && (
              <Tabs defaultValue={characters[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:w-[400px] rounded-lg bg-gray-200 p-1">
                  {characters.map((char) => (
                    <TabsTrigger key={char.id} value={char.id} className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md rounded-md">
                      {char.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {characters.map((char) => (
                  <TabsContent key={char.id} value={char.id} className="mt-6">
                    <CharacterTabs 
                      characterName={char.name} 
                      episodes={dummyEpisodes} 
                      tag={char.tag}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            )}
            {activeTab === 'opening' && (
              <div>
                <h2 className="text-2xl">Opening Content</h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default CharacterPage; 