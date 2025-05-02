import { UserIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { TabsList, TabsTrigger } from '~/components/ui/tabs';

const Header = () => {
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
        <Button variant="ghost" className="text-base font-semibold text-[#A99FAA]">
          Logout
        </Button>
      </div>
    </header>
  );
};
export default Header;
