import { TabsContent } from '~/components/ui/tabs';
import Character from './character/Character';
import Playground from './playground/Playground';

const TabView = () => {
  return (
    <main className="mx-auto h-full w-[896px] items-center justify-start xl:w-[1152px]">
      <TabsContent value="playground" className="h-full w-full">
        <Playground />
      </TabsContent>
      <TabsContent value="character" className="h-full w-full">
        <Character />
      </TabsContent>
    </main>
  );
};
export default TabView;
