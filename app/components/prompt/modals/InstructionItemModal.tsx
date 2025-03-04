import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '~/components/ui/dialog';

import { InstructionItemModalProps } from '~/types/prompt';

const InstructionItemModal = ({ isOpen, setIsOpen, item }: InstructionItemModalProps) => {
  const [body, setBody] = useState('');

  useEffect(() => {
    setBody(item?.body || '');
  }, [item]);

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Instruction Item</DialogTitle>

          <div>
            <label className="mb-1 block" htmlFor="body">
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="row-4 w-full rounded border p-2"
              rows={8}
              placeholder="body"
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionItemModal;
