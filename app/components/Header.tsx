import { UserIcon } from 'lucide-react';

import { TabsList, TabsTrigger } from '~/components/ui/tabs';
import '~/types/global';

const Header = () => {
  const apiURL =
    typeof window !== 'undefined'
      ? window.ENV?.API_URL || 'https://api.dev.hearlers.com'
      : 'https://api.dev.hearlers.com';
  const baseURL =
    typeof window !== 'undefined' ? window.ENV?.BASE_URL || 'http://localhost:3000' : 'http://localhost:3000';

  const redirectURL = encodeURIComponent(baseURL || '');

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
