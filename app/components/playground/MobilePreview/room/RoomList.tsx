import dayjs from 'dayjs';
import { Info } from 'lucide-react';
import { Counsel } from '~/api/v1';

interface RoomListProps {
  counselList: Counsel[];
  onSelect: (counselId: string) => void;
  onOpenPromptInfo: (promptVersionId?: string) => void;
  promptVersionNameMap?: Record<string, string>;
}

const RoomList = ({ counselList, onSelect, onOpenPromptInfo, promptVersionNameMap }: RoomListProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {counselList.map((c) => (
          <button
            key={c.id}
            onClick={() => c.id && onSelect(c.id)}
            className="group flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-white/10"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {c.promptVersionId && (
                  <span className="my-1 rounded-full border border-white/30 px-2 py-0.5 text-[10px] text-white">
                    {promptVersionNameMap?.[c.promptVersionId] ?? '프롬프트'}
                  </span>
                )}
              </div>
              <div className="truncate text-left text-sm text-white">{c.lastMessage || '대화 시작'}</div>
              <div className="text-left text-xs text-white/50">
                {c.createdAt ? dayjs(c.createdAt).format('MM/DD HH:mm') : ''}
              </div>
            </div>
            <div>
              <Info
                className="h-4 w-4 text-white/50 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPromptInfo(c.promptVersionId);
                }}
              />
            </div>
          </button>
        ))}
        {counselList.length === 0 && (
          <div className="py-12 text-center text-sm text-white/50">상담방이 없습니다. 새 상담을 시작해 보세요.</div>
        )}
      </div>
    </div>
  );
};

export default RoomList;
