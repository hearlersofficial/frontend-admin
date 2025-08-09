import dayjs from 'dayjs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Counsel } from '~/__generated__/data-contracts';

interface RoomSelectorProps {
  counselList: Counsel[];
  activeCounselId: string | null;
  setActiveCounselId: (id: string | null) => void;
  canCreate: boolean;
  onOpenCreate: () => void;
}

const RoomSelector = ({
  counselList,
  activeCounselId,
  setActiveCounselId,
  canCreate,
  onOpenCreate,
}: RoomSelectorProps) => {
  return (
    <div className="flex items-center justify-between gap-2 px-5 py-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500">상담방</span>
        <Select
          value={activeCounselId ?? ''}
          onValueChange={(val) => setActiveCounselId(val || null)}
          disabled={!counselList.length}
        >
          <SelectTrigger size="sm" className="min-w-[200px]">
            <SelectValue placeholder={counselList.length ? '상담 선택' : '상담 없음'} />
          </SelectTrigger>
          <SelectContent>
            {counselList.map((c: Counsel) => (
              <SelectItem key={c.id} value={c.id ?? ''}>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-xs text-slate-700">{c.lastMessage || '대화 시작'}</span>
                  <span className="shrink-0 text-[10px] text-slate-400">
                    {c.createdAt ? dayjs(c.createdAt).format('MM/DD HH:mm') : ''}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button size="sm" className="rounded-full bg-violet-600 text-white" onClick={onOpenCreate} disabled={!canCreate}>
        새 상담 시작
      </Button>
    </div>
  );
};

export default RoomSelector;
