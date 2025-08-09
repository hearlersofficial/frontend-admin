import dayjs from 'dayjs';

import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';
import { PromptVersionResponseDto } from '~/__generated__/data-contracts';
import { useLoadPromptVersion } from '~/hooks/mutations';
import { usePromptStore } from '~/store/usePromptStore';

interface PromptModalProps {
  prompt: PromptVersionResponseDto;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PromptModal = ({ prompt, isOpen, setIsOpen }: PromptModalProps) => {
  const { mutate: loadPromptVersion } = useLoadPromptVersion({
    onSuccess: (res) => {
      const newVersion = res.data.data?.promptVersion;
      if (newVersion) {
        usePromptStore.getState().setTemporaryVersion(newVersion);
      }
      setIsOpen(false);
    },
    onError: () => {},
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="title">
          프롬프트 제목
        </label>
        <input
          id="title"
          type="text"
          value={prompt.name}
          onChange={() => {}}
          className="w-full rounded border p-2"
          placeholder="제목을 입력하세요"
          disabled
        />
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="time">
          생성시각
        </label>
        <input
          id="time"
          type="text"
          readOnly
          value={dayjs(prompt.createdAt).format('YY.MM.DD HH:mm')}
          onChange={() => {}}
          className="w-full rounded border p-2"
          disabled
        />
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="fav">
          즐겨찾기
        </label>
        <select
          id="fav"
          value={prompt.isBookmarked ? 'on' : 'off'}
          onChange={() => {}}
          className="w-full rounded border p-2"
          disabled
        >
          <option value="on">ON</option>
          <option value="off">OFF</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="aiModel">
          AI 모델
        </label>
        <input
          id="aiModel"
          type="text"
          readOnly
          value={prompt.aiModel}
          className="w-full rounded border p-2"
          disabled
        />
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="memo">
          메모
        </label>
        <textarea
          id="memo"
          value={prompt.description}
          onChange={() => {}}
          className="row-4 w-full rounded border p-2"
          rows={4}
          placeholder="메모를 입력하세요"
          disabled
        />
      </div>

      <DialogFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            <Button className="rounded-full bg-[#D39393] text-base font-semibold" size="lg">
              삭제
            </Button>
            <Button className="rounded-full bg-[#848484] text-base font-semibold" size="lg">
              수정
            </Button>
          </div>
          <Button
            onClick={() => prompt.id && loadPromptVersion(prompt.id)}
            className="rounded-full bg-[#736A84] px-20 text-base font-semibold"
            size="lg"
          >
            불러오기
          </Button>
        </div>
      </DialogFooter>
    </Modal>
  );
};

export default PromptModal;
