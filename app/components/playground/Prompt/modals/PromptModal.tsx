import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';
import { PromptVersionResponseDto } from '~/__generated__/data-contracts';
import { useLoadPromptVersion } from '~/hooks/mutations';
import { api } from '~/api';
import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';
import { AIModel } from '~/types/aiModel';
import { AI_MODEL_OPTIONS } from '~/constants/aiModel';

interface PromptModalProps {
  prompt: PromptVersionResponseDto;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PromptModal = ({ prompt, isOpen, setIsOpen }: PromptModalProps) => {
  const queryClient = useQueryClient();

  const { mutate: loadPromptVersion } = useLoadPromptVersion({
    onSuccess: (res) => {
      const newVersion = res.data.data?.promptVersion;
      if (newVersion) {
        usePromptStore.getState().setTemporaryVersion(newVersion);
      }

      queryClient.invalidateQueries({
        queryKey: queries.v1.getTemporaryVersion.queryKey,
      });

      setIsOpen(false);
    },
    onError: () => {},
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState<string>(prompt.name ?? '');
  const [editDescription, setEditDescription] = useState<string>(prompt.description ?? '');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(Boolean(prompt.isBookmarked));
  const [editAiModel, setEditAiModel] = useState<AIModel | 'UNRECOGNIZED'>(
    (prompt.aiModel as AIModel | 'UNRECOGNIZED' | undefined) ?? 'AI_MODEL_UNSPECIFIED'
  );

  const AI_MODELS: AIModel[] = AI_MODEL_OPTIONS as unknown as AIModel[];

  useEffect(() => {
    if (!isOpen) return;
    setIsEditing(false);
    setEditName(prompt.name ?? '');
    setEditDescription(prompt.description ?? '');
    setIsBookmarked(Boolean(prompt.isBookmarked));
    setEditAiModel((prompt.aiModel as AIModel | 'UNRECOGNIZED' | undefined) ?? 'AI_MODEL_UNSPECIFIED');
  }, [isOpen, prompt]);

  const deletePromptVersion = useMutation({
    mutationFn: async () => {
      if (!prompt.id) return;
      await api.V1.deletePromptVersion(prompt.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queries.v1.getPromptVersions({}).queryKey });
      setIsOpen(false);
    },
  });

  const updatePromptVersion = useMutation({
    mutationFn: async () => {
      if (!prompt.id) return;
      await api.V1.updatePromptVersion(prompt.id, {
        name: editName,
        description: editDescription,
        isBookmarked: isBookmarked,
        aiModel: editAiModel as AIModel,
      });
    },
    onSuccess: async () => {
      const temp = usePromptStore.getState().temporaryVersion;
      if (temp?.id && temp.id === prompt.id) {
        usePromptStore.getState().setTemporaryVersion({
          ...temp,
          name: editName,
          description: editDescription,
          isBookmarked,
          aiModel: editAiModel,
        });
      }
      await queryClient.invalidateQueries({ queryKey: queries.v1.getPromptVersions({}).queryKey });
      await queryClient.invalidateQueries({ queryKey: queries.v1.getTemporaryVersion.queryKey });
      setIsEditing(false);
      setIsOpen(false);
    },
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="title">
          프롬프트 제목
        </label>
        <input
          id="title"
          type="text"
          value={isEditing ? editName : (prompt.name ?? '')}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="제목을 입력하세요"
          disabled={!isEditing}
        />
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="time">
          생성시각
        </label>
        <input
          id="time"
          type="text"
          readOnly
          value={dayjs(prompt.createdAt).format('YY.MM.DD HH:mm')}
          onChange={() => {}}
          className="w-full rounded border p-2"
          disabled
        />
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="fav">
          즐겨찾기
        </label>
        <select
          id="fav"
          value={isBookmarked ? 'on' : 'off'}
          onChange={(e) => setIsBookmarked(e.target.value === 'on')}
          className="w-full rounded border p-2"
          disabled={!isEditing}
        >
          <option value="on">ON</option>
          <option value="off">OFF</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="aiModel">
          AI 모델
        </label>
        {isEditing ? (
          <select
            id="aiModel"
            value={editAiModel}
            onChange={(e) => setEditAiModel(e.target.value as AIModel)}
            className="w-full rounded border p-2"
          >
            {AI_MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        ) : (
          <input
            id="aiModel"
            type="text"
            readOnly
            value={prompt.aiModel}
            className="w-full rounded border p-2"
            disabled
          />
        )}
      </div>
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="memo">
          메모
        </label>
        <textarea
          id="memo"
          value={isEditing ? editDescription : (prompt.description ?? '')}
          onChange={(e) => setEditDescription(e.target.value)}
          className="row-4 w-full rounded border p-2"
          rows={4}
          placeholder="메모를 입력하세요"
          disabled={!isEditing}
        />
      </div>

      <DialogFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            <Button
              onClick={() => deletePromptVersion.mutate()}
              disabled={deletePromptVersion.isPending}
              className="rounded-full bg-[#D39393] text-base font-semibold"
              size="lg"
            >
              삭제
            </Button>
            <Button
              onClick={() => (isEditing ? updatePromptVersion.mutate() : setIsEditing(true))}
              disabled={updatePromptVersion.isPending}
              className="rounded-full bg-[#848484] text-base font-semibold"
              size="lg"
            >
              {isEditing ? '완료' : '수정'}
            </Button>
          </div>
          <Button
            onClick={() => prompt.id && loadPromptVersion(prompt.id)}
            className="rounded-full bg-[#736A84] px-20 text-base font-semibold"
            size="lg"
          >
            불러오기
          </Button>
        </div>
      </DialogFooter>
    </Modal>
  );
};

export default PromptModal;
