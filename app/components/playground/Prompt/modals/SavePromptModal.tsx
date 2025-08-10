import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';

import { useSaveVersion } from '~/hooks/mutations';
import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';
import { AIModel } from '~/types/aiModel';

interface SavePromptModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SavePromptModal = ({ isOpen, setIsOpen }: SavePromptModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [aiModel, setAiModel] = useState<AIModel>('GPT_4O_MINI');

  const queryClient = useQueryClient();
  const setTemporaryVersion = usePromptStore((s) => s.setTemporaryVersion);

  const { data: temporaryVersionData } = useQuery({
    ...queries.v1.getTemporaryVersion,
  });

  const { mutate: saveVersion } = useSaveVersion({
    onSuccess: () => {
      setIsOpen(false);

      queryClient.invalidateQueries({
        queryKey: queries.v1.getTemporaryVersion.queryKey,
      });
    },
    onError: () => {},
  });

  useEffect(() => {
    if (temporaryVersionData?.data?.data?.promptVersion) {
      setTemporaryVersion(temporaryVersionData.data.data.promptVersion);
    }
  }, [temporaryVersionData, setTemporaryVersion]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="name">
          프롬프트 제목
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="제목을 입력하세요..."
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
        >
          <option value="on">ON</option>
          <option value="off">OFF</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="aiModel">
          사용 AI 모델
        </label>
        <select
          id="aiModel"
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value as AIModel)}
          className="w-full rounded border p-2"
        >
          <option value="GPT_5">GPT 5</option>
          <option value="GPT_5_CHAT">GPT 5 chat</option>
          <option value="GPT_5_MINI">GPT 5 mini</option>
          <option value="GPT_4O">GPT 4o</option>
          <option value="GPT_4O_MINI">GPT 4o mini</option>
          <option value="GPT_3_5_TURBO">GPT 3.5</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor="description">
          메모
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="row-4 w-full rounded border p-2"
          rows={4}
          placeholder="메모를 입력하세요..."
        />
      </div>

      <DialogFooter>
        <Button
          onClick={() => saveVersion({ name, description, isBookmarked, aiModel })}
          className="mx-auto block rounded-xl bg-[#736A84] text-base font-semibold"
          size="lg"
        >
          프롬프트 기록 추가
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default SavePromptModal;
