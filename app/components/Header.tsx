import { useState } from 'react';
import { UserIcon, Smartphone } from 'lucide-react';

import { TabsList, TabsTrigger } from '~/components/ui/tabs';
import MobilePreview from './playground/MobilePreview';
import '~/types/global';

const Header = () => {
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  const apiURL =
    typeof window !== 'undefined'
      ? window.ENV?.API_URL || 'https://api.dev.hearlers.com'
      : 'https://api.dev.hearlers.com';
  const baseURL =
    typeof window !== 'undefined' ? window.ENV?.BASE_URL || 'http://localhost:3000' : 'http://localhost:3000';

  const redirectURL = encodeURIComponent(baseURL || '');

  const loginURL = `${apiURL}/v1/auth/login/kakao?redirect-url=${redirectURL}`;

  return (
    <div className="relative">
      <header className="bg-white py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between xl:max-w-6xl">
          <div className="flex space-x-10">
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

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}
              className={`${isMobilePreviewOpen ? 'text-[#4D317E]' : 'text-[#A99FAA]'}`}
            >
              <Smartphone />
            </button>

            <UserIcon className="text-[#A99FAA]" />
            <a href={loginURL} className="px-4 text-base font-semibold text-[#A99FAA]">
              Login
            </a>
          </div>
        </div>
      </header>

      {isMobilePreviewOpen && (
        <div className="absolute right-4 top-full z-50 mt-2">
          <MobilePreview />
        </div>
      )}
    </div>
  );
};
export default Header;
