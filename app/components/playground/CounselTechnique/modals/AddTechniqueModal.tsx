import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Modal } from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';

import { useCreateCounselTechnique, useSaveCounselTechniqueSequence } from '~/hooks/mutations';
import { usePromptStore } from '~/store/usePromptStore';
import { CreateCounselTechniqueRequestDto } from '~/__generated__/data-contracts';
import { queries } from '~/queries';

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
    temperature: 0.5,
  });

  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const setTemporaryVersion = usePromptStore((s) => s.setTemporaryVersion);
  const toneId = selectedCounselor?.toneId;

  const queryClient = useQueryClient();

  const { mutate: createCounselTechnique } = useCreateCounselTechnique({
    onSuccess: (response) => {
      const newTechnique = response.data?.data?.counselTechnique;
      if (!newTechnique || !toneId || !temporaryVersion) {
        return;
      }

      // 현재 임시버전의 상담기법 firstId 찾기
      const toneScopedPrompts = temporaryVersion.toneScopedPrompts ?? [];
      const firstCounselTechniqueId = toneScopedPrompts.find((p) => p.toneId === toneId)?.firstCounselTechniqueId;

      if (!firstCounselTechniqueId) {
        // 첫 번째 상담기법이 없는 경우, 새로 생성된 상담기법을 firstId로 설정
        const counselTechniqueIds = [newTechnique.id!];

        const newToneScopedPrompts = toneScopedPrompts.map((prompt) =>
          prompt.toneId === toneId ? { ...prompt, firstCounselTechniqueId: newTechnique.id } : prompt
        );

        setTemporaryVersion({
          ...temporaryVersion,
          toneScopedPrompts: newToneScopedPrompts,
        });

        saveCounselTechniqueSequence({
          toneId,
          counselTechniqueIds,
        });
        return;
      }

      const currentTechniques =
        (queryClient.getQueryData(
          queries.v1.getOrderedCounselTechniques({ 'first-counsel-technique-id': firstCounselTechniqueId }).queryKey
        ) as unknown as Array<{ id?: string }>) || [];

      const updatedTechniques = [...currentTechniques, newTechnique];
      const counselTechniqueIds = updatedTechniques.map((t) => t.id).filter(Boolean) as string[];

      saveCounselTechniqueSequence({
        toneId,
        counselTechniqueIds,
      });
    },
    onError: (error) => {
      console.error('상담기법 생성 실패:', error);
    },
  });

  const { mutate: saveCounselTechniqueSequence } = useSaveCounselTechniqueSequence({
    onSuccess: (response) => {
      const newTechniques = response.data?.data?.counselTechniques ?? [];
      if (!newTechniques.length || !temporaryVersion || !toneId) {
        return;
      }

      const newToneScopedPrompts = (temporaryVersion.toneScopedPrompts ?? []).map((prompt) =>
        prompt.toneId === toneId ? { ...prompt, firstCounselTechniqueId: newTechniques[0].id } : prompt
      );

      setTemporaryVersion({
        ...temporaryVersion,
        toneScopedPrompts: newToneScopedPrompts,
      });

      setIsOpen(false);
    },
    onError: (error) => {
      console.error('상담기법 시퀀스 저장 실패:', error);
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
          메시지 임계값 (초과 시 다음 테크닉으로 넘어갈 지 평가 시작)
        </label>
        <input
          id="messageThreshold"
          type="number"
          min="1"
          max="20"
          value={formData.messageThreshold}
          onChange={(e) => handleInputChange('messageThreshold', parseInt(e.target.value) || 5)}
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
          value={formData.temperature}
          onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value) || 0.5)}
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
