import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Modal } from '~/components/Modal';

import { queries } from '~/queries';
import { useActivatePromptVersion } from '~/hooks/mutations';
import { PromptVersionResponseDto } from '~/__generated__/data-contracts';

interface ActivatePromptModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ActivatePromptModal = ({ isOpen, setIsOpen }: ActivatePromptModalProps) => {
  const [selectedVersion, setSelectedVersion] = useState<PromptVersionResponseDto | null>(null);

  const { data: promptVersions = [] } = useQuery(queries.v1.getPromptVersions({}));

  const { mutate: activatePromptVersion } = useActivatePromptVersion({
    onSuccess: () => {
      setIsOpen(false);
      setSelectedVersion(null);
    },
    onError: () => {},
  });

  const handleActivate = () => {
    if (selectedVersion?.id) {
      activatePromptVersion(selectedVersion.id);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div className="space-y-4">
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {promptVersions.length === 0 ? (
            <div className="py-8 text-center text-gray-500">사용 가능한 프롬프트 버전이 없습니다.</div>
          ) : (
            promptVersions.map((version) => (
              <button
                key={version.id}
                type="button"
                className={`w-full cursor-pointer rounded-lg border p-4 text-left transition-colors ${
                  selectedVersion?.id === version.id
                    ? 'border-[#4D317E] bg-[#4D317E]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedVersion(version)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-[#4F4F4F]">{version.name}</h3>
                    <p className="mb-2 text-sm text-gray-600">{version.description}</p>
                    <p className="text-xs text-gray-500">{dayjs(version.createdAt).format('YYYY년 MM월 DD일 HH:mm')}</p>
                  </div>
                  <div className="ml-4">
                    {selectedVersion?.id === version.id && (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4D317E]">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <DialogFooter>
        <div className="flex w-full gap-2">
          <Button onClick={() => setIsOpen(false)} variant="outline" className="flex-1">
            취소
          </Button>
          <Button
            onClick={handleActivate}
            className="flex-1 rounded-xl bg-[#4D317E] text-base font-semibold"
            disabled={!selectedVersion}
          >
            Dev 앱에 적용
          </Button>
        </div>
      </DialogFooter>
    </Modal>
  );
};

export default ActivatePromptModal;
