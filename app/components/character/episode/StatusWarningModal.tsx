import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";

interface StatusWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  warningType: 'deploy' | 'undeploy' | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const StatusWarningModal = ({ 
  isOpen, 
  onClose, 
  warningType, 
  onConfirm, 
  onCancel 
}: StatusWarningModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className={warningType === 'deploy' ? "text-orange-600" : "text-red-600"}>
            ⚠️ {warningType === 'deploy' ? '배포 경고' : '배포 상태 변경 경고'}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {warningType === 'deploy' ? (
            <>
              <p className="text-gray-700 leading-relaxed">
                배포하면 실제 유저 프로덕트에 노출됩니다.
              </p>
              <p className="text-gray-700 font-medium mt-2">
                배포하시겠습니까?
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700 leading-relaxed">
                배포를 내리면 임시저장으로 전환되고 유저 프로덕트에서 컷씬이 내려갑니다.
              </p>
              <p className="text-gray-700 font-medium mt-2">
                임시저장으로 전환하시겠습니까?
              </p>
            </>
          )}
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button 
            onClick={onConfirm}
            className={warningType === 'deploy' ? "bg-orange-600 hover:bg-orange-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusWarningModal; 