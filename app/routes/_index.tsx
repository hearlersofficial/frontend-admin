import { json, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';

import { Tabs } from '~/components/ui/tabs';
import Header from '~/components/Header';
import LinkButtons from '~/components/LinkButtons';
import TabView from '~/components/TabView';

import { api } from '~/api';

export const meta: MetaFunction = () => {
  return [{ title: 'Hearlers Admin' }, { name: 'description', content: '히얼러스 화이팅' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('cookie');
  const response = await api.V1.getCounselors(
    {},
    {
      headers: {
        cookie: cookie,
      },
    }
  );

  return json({
    counselors: response.data.data?.counselors,
  });
};

export default function Index() {
  return (
    <Tabs defaultValue="playground" className="min-h-screen bg-[#F2F2F7]">
      <Header />
      <LinkButtons />
      <TabView />
    </Tabs>
  );
}
