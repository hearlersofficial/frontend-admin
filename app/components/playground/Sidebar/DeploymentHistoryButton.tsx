import { Button } from '~/components/ui/button';
import DeploymentHistoryModal from './modals/DeploymentHistoryModal';

import { useModal } from '~/hooks/useModal';
import { Prompt } from '~/types/prompt';

const DeploymentHistoryButton = () => {
  const { isOpen, setIsOpen, openModal } = useModal(false);

  return (
    <>
      <Button onClick={openModal} className="rounded-full bg-[#736A84] text-sm" size="sm">
        배포기록
      </Button>
      <DeploymentHistoryModal isOpen={isOpen} setIsOpen={setIsOpen} prompts={mockPrompts} />
    </>
  );
};

export default DeploymentHistoryButton;

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
