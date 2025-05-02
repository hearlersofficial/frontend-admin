import { Link2Icon } from 'lucide-react';

import { Button } from './ui/button';

const LinkButtons = () => {
  return (
    <div className="absolute right-6 top-28 flex flex-col gap-4">
      <Button className="flex h-16 w-16 flex-col items-center gap-1 rounded-lg bg-[#405BAD]">
        <Link2Icon className="!h-6 !w-6 -rotate-45" />
        <p className="text-xs font-semibold">DEV APP</p>
      </Button>
      <Button className="flex h-16 w-16 flex-col items-center gap-1 rounded-lg bg-[#405BAD] bg-[#B03737]">
        <div className="flex flex-col items-center gap-1">
          <Link2Icon className="!h-6 !w-6 -rotate-45" />
          <p className="text-xs font-semibold">P-Admin</p>
        </div>
      </Button>
    </div>
  );
};
export default LinkButtons;
