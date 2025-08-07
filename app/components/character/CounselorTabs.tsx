import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CharacterTabs from "./CharacterTabs";
import { Counselor } from './types';

interface CounselorTabsProps {
  counselors: Counselor[];
}

const CounselorTabs = ({ counselors }: CounselorTabsProps) => {
  return (
    <Tabs defaultValue={counselors[0]?.id || ''} className="w-full">
      <TabsList className="grid w-full grid-cols-4 md:w-[400px] rounded-lg bg-gray-200 p-1">
        {counselors.map((counselor) => (
          <TabsTrigger 
            key={counselor.id} 
            value={counselor.id!} 
            className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md rounded-md"
          >
            {counselor.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {counselors.map((counselor) => (
        <TabsContent key={counselor.id} value={counselor.id!} className="mt-6">
          <CharacterTabs 
            characterName={counselor.name!} 
            counselorId={counselor.id!}
            tag="#상담사"
            profileImage={counselor.profileImage}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CounselorTabs; 