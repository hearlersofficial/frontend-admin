import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Modal } from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';

import { useCreateCounselTechnique } from '~/hooks/mutations';
import { usePromptStore } from '~/store/usePromptStore';
import { CreateCounselTechniqueRequestDto } from '~/__generated__/data-contracts';

interface AddTechniqueModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AddTechniqueModal = ({ isOpen, setIsOpen }: AddTechniqueModalProps) => {
  const [formData, setFormData] = useState<CreateCounselTechniqueRequestDto>({
    name: '',
    toneId: '',
    context: '',
    instruction: '',
    messageThreshold: 3,
  });

  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const toneId = selectedCounselor?.toneId;

  const queryClient = useQueryClient();

  const { mutate: createCounselTechnique } = useCreateCounselTechnique({
    onSuccess: () => {
      setIsOpen(false);
      setFormData({
        name: '',
        toneId: '',
        context: '',
        instruction: '',
        messageThreshold: 3,
      });

      // 상담기법 추가 성공 시 쿼리 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['v1', 'getOrderedCounselTechniques'],
      });
    },
    onError: (error) => {
      console.error('상담기법 생성 실패:', error);
    },
  });

  const handleSubmit = () => {
    if (!toneId) {
      return;
    }

    createCounselTechnique({
      ...formData,
      toneId,
    });
  };

  const handleInputChange = (field: keyof CreateCounselTechniqueRequestDto, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="name">
          이름
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="context">
          context
        </label>
        <textarea
          id="context"
          value={formData.context}
          onChange={(e) => handleInputChange('context', e.target.value)}
          className="w-full rounded border p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="instruction">
          instruction
        </label>
        <textarea
          id="instruction"
          value={formData.instruction}
          onChange={(e) => handleInputChange('instruction', e.target.value)}
          className="w-full rounded border p-2"
          rows={3}
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
          max="10"
          value={formData.messageThreshold}
          onChange={(e) => handleInputChange('messageThreshold', parseInt(e.target.value) || 3)}
          className="w-full rounded border p-2"
        />
      </div>

      <DialogFooter>
        <Button
          onClick={handleSubmit}
          className="mx-auto block rounded-xl bg-[#736A84] text-base font-semibold"
          size="lg"
        >
          상담기법 추가
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default AddTechniqueModal;
