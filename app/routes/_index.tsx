import type { MetaFunction } from '@remix-run/node';

import { Tabs } from '~/components/ui/tabs';
import Header from '~/components/Header';
import LinkButtons from '~/components/LinkButtons';
import TabView from '~/components/TabView';

export const meta: MetaFunction = () => {
  return [{ title: 'Hearlers Admin' }, { name: 'description', content: '히얼러스 화이팅' }];
};

export default function Index() {
  return (
    <div>
      <Tabs defaultValue="playground" className="min-h-screen bg-[#F2F2F7]">
        <Header />
        <LinkButtons />
        <TabView />
      </Tabs>
    </div>
  );
}
