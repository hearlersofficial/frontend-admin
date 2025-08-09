import { useState, useEffect } from 'react';

import { Modal } from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';

import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

interface EditTechniqueModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  technique: CounselTechniqueResponseDto | null;
  onSave: (techniqueId: string, newName: string, newMessageThreshold: number, newTemperature: number) => void;
}

const EditTechniqueModal = ({ isOpen, setIsOpen, technique, onSave }: EditTechniqueModalProps) => {
  const [name, setName] = useState('');
  const [messageThreshold, setMessageThreshold] = useState(3);
  const [temperature, setTemperature] = useState(0.5);

  useEffect(() => {
    if (technique) {
      setName(technique.name || '');
      setMessageThreshold(technique.messageThreshold || 3);
      setTemperature(technique.temperature || 0.5);
    }
  }, [technique]);

  const handleSubmit = () => {
    if (!technique?.id || !name.trim()) {
      return;
    }

    onSave(technique.id, name.trim(), messageThreshold, temperature);
    setIsOpen(false);
  };

  const handleMessageThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMessageThreshold(0);
    } else {
      const numValue = parseInt(value);
      setMessageThreshold(numValue);
    }
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setTemperature(0);
    } else {
      const numValue = parseFloat(value);
      setTemperature(numValue);
    }
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
          메시지 임계값 (초과 시 다음 테크닉으로 넘어갈 지 평가 시작)
        </label>
        <input
          id="messageThreshold"
          type="number"
          min="1"
          max="20"
          value={messageThreshold || ''}
          onChange={handleMessageThresholdChange}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="temperature">
          temperature (0.0 ~ 1.0)
        </label>
        <input
          id="temperature"
          type="number"
          min="0"
          max="1"
          value={temperature}
          onChange={handleTemperatureChange}
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
