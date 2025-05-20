import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '~/components/ui/dialog';

import { ModalProps } from '~/types/prompt';

interface GptVersionModalProps extends ModalProps {}

const GptVersionModal = ({ isOpen, setIsOpen }: GptVersionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="gpt">
              GPT 모델
            </label>
            <select
              id="gpt"
              // value={}
              onChange={() => {}}
              className="w-full rounded border p-2"
            >
              <option value="4o">GPT 4o preview_0428</option>
            </select>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button className="mx-auto block rounded-xl bg-[#736A84] px-20 text-base font-semibold" size="lg">
            완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default GptVersionModal;
