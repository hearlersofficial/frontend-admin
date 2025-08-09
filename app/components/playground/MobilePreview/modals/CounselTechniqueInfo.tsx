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
          <div className="text-sm text-slate-700">
            <div className="font-semibold">{data.name}</div>
            <div className="text-slate-500">{data.context}</div>
            <div className="text-slate-400">ID: {data.id}</div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CounselTechniqueInfo;
