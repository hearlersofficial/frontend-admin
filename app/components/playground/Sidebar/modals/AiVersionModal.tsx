import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';
import { queries } from '~/queries';
import { AIModel } from '~/types/aiModel';
import { AI_MODEL_OPTIONS } from '~/constants/aiModel';
import { api } from '~/api';
import { usePromptStore } from '~/store/usePromptStore';

interface AiVersionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AI_MODELS: AIModel[] = AI_MODEL_OPTIONS as unknown as AIModel[];

const AiVersionModal = ({ isOpen, setIsOpen }: AiVersionModalProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ ...queries.v1.getTemporaryVersion });
  const currentModel = (data?.data?.data?.promptVersion?.aiModel as AIModel | undefined) ?? 'AI_MODEL_UNSPECIFIED';
  const [selectedModel, setSelectedModel] = useState<AIModel>(currentModel);
  const setTemporaryVersion = usePromptStore((s) => s.setTemporaryVersion);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedModel(currentModel);
  }, [currentModel, isOpen]);

  const updateModelMutation = useMutation({
    mutationFn: async () => {
      const pv = data?.data?.data?.promptVersion;
      if (!pv?.id) return;
      await api.V1.updatePromptVersion(pv.id, {
        name: pv.name,
        description: pv.description,
        isBookmarked: pv.isBookmarked,
        aiModel: selectedModel,
      });
    },
    onSuccess: async () => {
      const prev =
        usePromptStore.getState().temporaryVersion ??
        (data?.data?.data?.promptVersion as { aiModel?: AIModel } | undefined);
      if (prev) {
        setTemporaryVersion({ ...prev, aiModel: selectedModel });
      }
      await queryClient.invalidateQueries({ queryKey: queries.v1.getTemporaryVersion.queryKey });
      setIsOpen(false);
    },
  });

  const onConfirm = () => updateModelMutation.mutate();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="gpt">
          AI 모델
        </label>
        <select
          id="gpt"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as AIModel)}
          className="w-full rounded border p-2"
        >
          {AI_MODELS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <DialogFooter>
        <Button
          onClick={onConfirm}
          disabled={updateModelMutation.isPending}
          className="mx-auto block rounded-xl bg-[#736A84] px-20 text-base font-semibold"
          size="lg"
        >
          완료
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default AiVersionModal;
