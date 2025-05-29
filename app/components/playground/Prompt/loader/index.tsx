import { Button } from '~/components/ui/button';
import LoadPromptModal from '../modals/LoadPromptModal';

import { useModal } from '../../hooks/useModal';
import { Prompt } from '~/types/prompt';

const PromptLoader = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <h4 className="whitespace-pre-line text-sm font-semibold text-[#68676A]">{'기록\n불러오기'}</h4>

      {mockPrompts.map((item) => {
        return (
          <button
            key={item.id}
            onClick={() => {}}
            className="h-12 w-20 break-keep rounded-md border-2 border-[#A99FAA] p-1 text-center"
          >
            <div className="text-xs text-[#A99FAA]">{item.title}</div>
          </button>
        );
      })}

      <Button onClick={openModal} className="rounded-full bg-[#736A84]" size="sm">
        더보기
      </Button>

      <LoadPromptModal prompts={mockPrompts} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PromptLoader;

const mockPrompts: Prompt[] = [
  {
    id: 1,
    title: '250327 톤수정ver',
    time: '25.03.27 15:30',
    fav: true,
    memo: '다혜 톤수정_밝게, 전 상담사 공감 추가',
  },
  {
    id: 2,
    title: '공감추가2',
    time: '25.03.27 13:37',
    fav: false,
    memo: '다혜 톤수정_밝게, 전 상담사 공감 추가',
  },
  {
    id: 3,
    title: '공감추가1',
    time: '25.03.27 13:37',
    fav: false,
    memo: '다혜 톤수정_밝게, 전 상담사 공감 추가',
  },
  {
    id: 4,
    title: '250326 문장수 변경',
    time: '25.03.27 13:37',
    fav: false,
    memo: '다혜 톤수정_밝게, 전 상담사 공감 추가',
  },
  {
    id: 5,
    title: '톤수정_밝게',
    time: '25.03.27 13:37',
    fav: true,
    memo: '다혜 톤수정_밝게, 전 상담사 공감 추가',
  },
  {
    id: 6,
    title: '톤수정_반말',
    time: '25.03.27 13:37',
    fav: false,
    memo: '다혜 톤수정_밝게, 전 상담사 공감 추가',
  },
  {
    id: 7,
    title: '250321 해결책 추가',
    time: '25.03.27 13:37',
    fav: false,
    memo: '다혜 톤수정_밝게, 전 상담사 공감 추가',
  },
];
