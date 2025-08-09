import dayjs from 'dayjs';
import { Info } from 'lucide-react';
import { Counsel } from '~/__generated__/data-contracts';

interface RoomListProps {
  counselList: Counsel[];
  onSelect: (counselId: string) => void;
  onOpenPromptInfo: (promptVersionId?: string) => void;
}

const RoomList = ({ counselList, onSelect, onOpenPromptInfo }: RoomListProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-3 text-sm font-semibold text-slate-700">상담방 목록</div>
      <div className="mx-4 h-px bg-slate-200" />
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {counselList.map((c) => (
          <button
            key={c.id}
            onClick={() => c.id && onSelect(c.id)}
            className="group flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-slate-50"
          >
            <div className="min-w-0">
              <div className="truncate text-left text-sm text-slate-800">{c.lastMessage || '대화 시작'}</div>
              <div className="text-left text-xs text-slate-400">
                {c.createdAt ? dayjs(c.createdAt).format('MM/DD HH:mm') : ''}
              </div>
            </div>
            <div>
              <Info
                className="h-4 w-4 text-slate-400 hover:text-slate-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPromptInfo(c.promptVersionId);
                }}
              />
            </div>
          </button>
        ))}
        {counselList.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-400">상담방이 없습니다. 새 상담을 시작해 보세요.</div>
        )}
      </div>
    </div>
  );
};

export default RoomList;
