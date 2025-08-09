import { useQuery } from '@tanstack/react-query';
import { Modal } from '~/components/Modal';
import { api } from '~/api';

interface CounselTechniqueInfoProps {
  counselTechniqueId?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CounselTechniqueInfo = ({ counselTechniqueId, isOpen, setIsOpen }: CounselTechniqueInfoProps) => {
  const { data } = useQuery({
    queryKey: ['counselTechniqueInfo', counselTechniqueId],
    queryFn: async () => {
      if (!counselTechniqueId) return undefined;
      const res = await api.V1.getCounselTechniqueById(counselTechniqueId);
      return res.data.data?.counselTechnique;
    },
    enabled: Boolean(counselTechniqueId && isOpen),
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-700">현재 상담 테크닉</h3>
        {!data && <div className="text-sm text-slate-400">정보를 불러오는 중...</div>}
        {data && (
          <div className="space-y-4 text-sm text-slate-700">
            {/* Sub-info section */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-700">{data.name}</span>
              <span className="px-2 text-slate-300">|</span>
              <span>ID: {data.id}</span>
              <span className="px-2 text-slate-300">|</span>
              <span>Threshold: {data.messageThreshold}</span>
            </div>
            {/* Main info section */}
            <div className="space-y-3">
              <div>
                <div className="mb-1 text-xs font-semibold text-slate-500">Context</div>
                <div className="whitespace-pre-line break-words rounded bg-slate-100 px-3 py-2 text-slate-700">
                  {data.context ? data.context : <span className="text-slate-300">-</span>}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold text-slate-500">Instruction</div>
                <div className="whitespace-pre-line break-words rounded bg-slate-100 px-3 py-2 text-slate-700">
                  {data.instruction ? data.instruction : <span className="text-slate-300">-</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CounselTechniqueInfo;
