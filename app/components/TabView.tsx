import { TabsContent } from '~/components/ui/tabs';
import Character from './character/Character';
import Playground from './playground/Playground';

const TabView = () => {
  return (
    <main className="p-6">
      <TabsContent value="playground">
        <Playground />
      </TabsContent>
      <TabsContent value="character">
        <Character />
      </TabsContent>
    </main>
  );
};
export default TabView;
