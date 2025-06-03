import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';

interface GptVersionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const GptVersionModal = ({ isOpen, setIsOpen }: GptVersionModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="gpt">
          GPT 모델
        </label>
        <select id="gpt" onChange={() => {}} className="w-full rounded border p-2">
          <option value="4o">GPT 4o preview_0428</option>
        </select>
      </div>

      <DialogFooter>
        <Button className="mx-auto block rounded-xl bg-[#736A84] px-20 text-base font-semibold" size="lg">
          완료
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default GptVersionModal;
