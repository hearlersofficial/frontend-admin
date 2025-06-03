import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';

interface SavePromptModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SavePromptModal = ({ isOpen, setIsOpen }: SavePromptModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="title">
          프롬프트 제목
        </label>
        <input
          id="title"
          type="text"
          onChange={() => {}}
          className="w-full rounded border p-2"
          placeholder="제목을 입력하세요..."
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="fav">
          즐겨찾기
        </label>
        <select id="fav" onChange={() => {}} className="w-full rounded border p-2">
          <option value="on">ON</option>
          <option value="off">OFF</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="gpt">
          권장 GPT 모델
        </label>
        <select id="gpt" onChange={() => {}} className="w-full rounded border p-2">
          <option value="4o">GPT 4o preview_0428</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="memo">
          메모
        </label>
        <textarea
          id="memo"
          onChange={() => {}}
          className="row-4 w-full rounded border p-2"
          rows={4}
          placeholder="메모를 입력하세요..."
        />
      </div>

      <DialogFooter>
        <Button className="mx-auto block rounded-xl bg-[#736A84] text-base font-semibold" size="lg">
          프롬프트 기록 추가
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default SavePromptModal;
