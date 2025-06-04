import { useRouteLoaderData } from '@remix-run/react';
import { UserIcon } from 'lucide-react';

import { TabsList, TabsTrigger } from '~/components/ui/tabs';
import { RootLoaderData } from '~/types/root';

const Header = () => {
  const data = useRouteLoaderData<RootLoaderData>('root');
  const apiURL = data?.ENV.API_URL;

  const redirectURL = encodeURIComponent('https://hearlers-admin-dev-584278316466.asia-northeast1.run.app');
  const loginURL = `${apiURL}/v1/auth/login/kakao?redirect-url=${redirectURL}`;

  return (
    <header className="flex items-center justify-between bg-white px-10 py-4">
      <div className="flex items-center space-x-10">
        <h1 className="text-xl font-bold text-[#4D317E]">DEV TEST</h1>

        <TabsList className="flex items-center space-x-6 bg-transparent">
          <TabsTrigger
            value="playground"
            className="text-base font-bold text-[#D0D1D2] shadow-none data-[state=active]:text-[#150D23] data-[state=active]:shadow-none"
          >
            Playground
          </TabsTrigger>
          <TabsTrigger
            value="character"
            className="text-base font-bold text-[#D0D1D2] shadow-none data-[state=active]:text-[#150D23] data-[state=active]:shadow-none"
          >
            Character
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex items-center">
        <UserIcon className="text-[#A99FAA]" />
        <a href={loginURL} className="px-4 text-base font-semibold text-[#A99FAA]">
          Login
        </a>
      </div>
    </header>
  );
};
export default Header;
