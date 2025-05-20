import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '~/components/ui/dialog';

import { ModalProps, Prompt } from '~/types/prompt';

interface PromptModalProps extends ModalProps {
  prompt: Prompt;
}

const PromptModal = ({ isOpen, setIsOpen, prompt }: PromptModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="title">
              프롬프트 제목
            </label>
            <input
              id="title"
              type="text"
              value={prompt.title}
              onChange={() => {}}
              className="w-full rounded border p-2"
              placeholder="제목을 입력하세요"
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
              value={prompt.time}
              onChange={() => {}}
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="fav">
              즐겨찾기
            </label>
            <select
              id="fav"
              value={prompt.fav ? 'on' : 'off'}
              onChange={() => {}}
              className="w-full rounded border p-2"
            >
              <option value="on">ON</option>
              <option value="off">OFF</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="memo">
              메모
            </label>
            <textarea
              id="memo"
              value={prompt.memo}
              onChange={() => {}}
              className="row-4 w-full rounded border p-2"
              rows={4}
              placeholder="메모를 입력하세요"
            />
          </div>
        </DialogHeader>
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
            <Button className="rounded-full bg-[#736A84] px-20 text-base font-semibold" size="lg">
              불러오기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PromptModal;
