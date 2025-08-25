import { Tabs } from '@radix-ui/react-tabs';
import Header from '~/components/Header';
import TabView from '~/components/TabView';

export default function Index() {
  return (
    <div className="w-screen overflow-x-auto">
      <div className="inline-block min-w-full">
        <Tabs defaultValue="playground" className="flex min-h-screen flex-col bg-[#F2F2F7]">
          <Header />
          <TabView />
        </Tabs>
      </div>
    </div>
  );
}
