import { TabsContent } from '~/components/ui/tabs';
import Character from './character/Character';
import Playground from './playground/Playground';

const TabView = () => {
  return (
    <main className="mx-auto h-full max-w-4xl items-center justify-start xl:max-w-6xl">
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
