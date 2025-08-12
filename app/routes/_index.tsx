import { Tabs } from '@radix-ui/react-tabs';
import Header from '~/components/Header';
import TabView from '~/components/TabView';

export default function Index() {
  // 전체를 감싸는 div를 추가하고, 여기에 overflow-x-scroll을 적용합니다.
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
