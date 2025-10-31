import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';
import { queries } from '~/queries';

import { usePromptStore } from '~/stores/usePromptStore';
import { aiModelSchema, type AIModel } from '~/api/v1/prompts/prompts.types';
import { promptsService } from '~/api/v1';

interface AiVersionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AI_MODELS: AIModel[] = aiModelSchema.options;

const AiVersionModal = ({ isOpen, setIsOpen }: AiVersionModalProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ ...queries.v1.getTemporaryVersion });
  const currentModel = data?.aiModel ?? aiModelSchema.options[0];
  const [selectedModel, setSelectedModel] = useState<AIModel>(currentModel);
  const setTemporaryVersion = usePromptStore((s) => s.setTemporaryVersion);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedModel(currentModel);
  }, [currentModel, isOpen]);

  const updateModelMutation = useMutation({
    mutationFn: async () => {
      if (!data) return;
      await promptsService.updatePromptVersion(data.id, {
        name: data.name,
        description: data.description,
        isBookmarked: data.isBookmarked,
        aiModel: selectedModel,
      });
    },
    onSuccess: async () => {
      const prev = usePromptStore.getState().temporaryVersion ?? data;
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
