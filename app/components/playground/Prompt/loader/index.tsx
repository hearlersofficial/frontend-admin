import { useQuery } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';
import LoadPromptModal from '../modals/LoadPromptModal';

import { useModal } from '~/hooks/useModal';
import { queries } from '~/queries';

const PromptLoader = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);

  const { data: promptsVersions = [] } = useQuery(queries.v1.getPromptVersions({}));

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <h4 className="whitespace-pre-line text-sm font-semibold text-[#68676A]">{'기록\n불러오기'}</h4>

      {promptsVersions.slice(0, 6).map((item) => {
        return (
          <button
            key={item.id}
            onClick={() => {}}
            className="h-12 w-20 break-keep rounded-md border-2 border-[#A99FAA] p-1 text-center"
          >
            <div className="line-clamp-2 w-full text-xs text-[#A99FAA]">{item.name}</div>
          </button>
        );
      })}

      <Button onClick={openModal} className="rounded-full bg-[#736A84]" size="sm">
        더보기
      </Button>

      <LoadPromptModal prompts={promptsVersions} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PromptLoader;
