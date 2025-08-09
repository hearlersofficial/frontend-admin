import dayjs from 'dayjs';
import { Modal } from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { PromptVersionResponseDto } from '~/__generated__/data-contracts';

interface CreateCounselModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  promptVersionList: PromptVersionResponseDto[];
  selectedPromptVersionId?: string;
  setSelectedPromptVersionId: (id?: string) => void;
  onCreate: () => void;
  canSubmit: boolean;
}

const CreateCounselModal = ({
  isOpen,
  setIsOpen,
  promptVersionList,
  selectedPromptVersionId,
  setSelectedPromptVersionId,
  onCreate,
  canSubmit,
}: CreateCounselModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="3xl">
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-slate-700">새 상담 시작</h3>
        <div className="space-y-2">
          <label className="text-sm text-slate-600" htmlFor="pv-select">
            프롬프트 버전 선택
          </label>
          <Select
            value={selectedPromptVersionId ?? ''}
            onValueChange={(v) => setSelectedPromptVersionId(v || undefined)}
          >
            <SelectTrigger id="pv-select">
              <SelectValue placeholder="프롬프트 버전을 선택하세요 (선택 안함 가능)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">선택 안함</SelectItem>
              {promptVersionList.map((pv) => (
                <SelectItem key={pv.id} value={pv.id ?? ''}>
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-xs text-slate-700">{pv.name}</span>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {dayjs(pv.createdAt).format('MM/DD HH:mm')}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button className="bg-violet-600 text-white" onClick={onCreate} disabled={!canSubmit}>
            상담 시작하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCounselModal;
