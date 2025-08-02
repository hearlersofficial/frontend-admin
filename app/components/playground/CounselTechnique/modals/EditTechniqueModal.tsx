import { useState, useEffect } from 'react';

import { Modal } from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';

import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

interface EditTechniqueModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  technique: CounselTechniqueResponseDto | null;
  onSave: (techniqueId: string, newName: string, newMessageThreshold: number) => void;
}

const EditTechniqueModal = ({ isOpen, setIsOpen, technique, onSave }: EditTechniqueModalProps) => {
  const [name, setName] = useState('');
  const [messageThreshold, setMessageThreshold] = useState(3);

  useEffect(() => {
    if (technique) {
      setName(technique.name || '');
      setMessageThreshold(technique.messageThreshold || 3);
    }
  }, [technique]);

  const handleSubmit = () => {
    if (!technique?.id || !name.trim()) {
      return;
    }

    onSave(technique.id, name.trim(), messageThreshold);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="name">
          이름
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="messageThreshold">
          문장수
        </label>
        <input
          id="messageThreshold"
          type="number"
          min="1"
          max="20"
          value={messageThreshold}
          onChange={(e) => setMessageThreshold(parseInt(e.target.value) || 3)}
          className="w-full rounded border p-2"
        />
      </div>

      <DialogFooter>
        <Button onClick={handleSubmit} className="rounded-xl bg-[#736A84] text-base font-semibold" size="lg">
          저장
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default EditTechniqueModal;
