import { useEffect, useState } from 'react';

import Modal from './Modal';
import Button from '../Button';

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
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex w-[40rem] flex-col gap-4">
        <h2 className="text-lg font-semibold">Instruction Item</h2>

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

        <div className="flex justify-end">
          <Button text="Save" handleClick={handleSave} color="bg-green-500" />
        </div>
      </div>
    </Modal>
  );
};

export default InstructionItemModal;
