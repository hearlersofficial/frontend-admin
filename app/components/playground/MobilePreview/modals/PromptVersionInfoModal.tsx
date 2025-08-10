import { useQuery } from '@tanstack/react-query';
import { Modal } from '~/components/Modal';
import { queries } from '~/queries';

interface PromptVersionInfoModalProps {
  promptVersionId?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PromptVersionInfoModal = ({ promptVersionId, isOpen, setIsOpen }: PromptVersionInfoModalProps) => {
  const { data: promptVersion } = useQuery({
    ...queries.v1.getPromptVersionById(promptVersionId ?? ''),
    enabled: Boolean(promptVersionId && isOpen),
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-700">프롬프트 버전 정보</h3>
        {!promptVersion && <div className="text-sm text-slate-400">정보를 불러오는 중...</div>}
        {promptVersion && (
          <div className="text-sm text-slate-700">
            <div className="font-semibold">{promptVersion.name}</div>
            <div className="text-slate-500">{promptVersion.description}</div>
            <div className="text-slate-400">ID: {promptVersion.id}</div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PromptVersionInfoModal;
