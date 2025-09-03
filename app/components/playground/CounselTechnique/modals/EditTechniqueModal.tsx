import { useState, useEffect } from 'react';

import { Modal } from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';

import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

interface EditTechniqueModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  technique: CounselTechniqueResponseDto | null;
  onSave: (techniqueId: string, newName: string, newIsStartTechnique: boolean, newTemperature: number) => void;
}

const EditTechniqueModal = ({ isOpen, setIsOpen, technique, onSave }: EditTechniqueModalProps) => {
  const [name, setName] = useState('');
  const [isStartTechnique, setIsStartTechnique] = useState(false);
  const [temperature, setTemperature] = useState(0.5);

  useEffect(() => {
    if (technique) {
      setName(technique.name || '');
      setIsStartTechnique(technique.isStartTechnique || false);
      setTemperature(technique.temperature || 0.5);
    }
  }, [technique]);

  const handleSubmit = () => {
    if (!technique?.id || !name.trim()) {
      return;
    }

    onSave(technique.id, name.trim(), isStartTechnique, temperature);
    setIsOpen(false);
  };

  const handleIsStartTechniqueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === '') {
      setIsStartTechnique(false);
    } else {
      setIsStartTechnique(value === 'true' ? true : false);
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
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="isStartTechnique">
          시작 기법 여부
        </label>
        <select
          id="isStartTechnique"
          value={isStartTechnique ? 'true' : 'false'}
          onChange={(e) => handleIsStartTechniqueChange(e)}
          className="w-full rounded border p-2"
        >
          <option value="true">예</option>
          <option value="false">아니오</option>
        </select>
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
