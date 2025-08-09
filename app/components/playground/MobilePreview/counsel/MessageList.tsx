import { useEffect, useRef } from 'react';
import { CounselMessage } from '~/__generated__/data-contracts';

interface MessageListProps {
  messageList: CounselMessage[];
  isFetching: boolean;
  counselorAvatarUrl?: string;
  userAvatarUrl?: string;
  counselorName?: string;
  userName?: string;
  techniqueNameMap?: Record<string, string>;
}

const MessageList = ({
  messageList,
  isFetching,
  counselorAvatarUrl,
  userAvatarUrl,
  counselorName,
  userName,
  techniqueNameMap,
}: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList.length, isFetching]);

  return (
    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cover bg-center bg-no-repeat px-5 py-4">
      {messageList.map((m) => {
        const isUser = Boolean(m.userMessage);
        const techniqueName = m.counselTechniqueId ? techniqueNameMap?.[m.counselTechniqueId] : undefined;
        return (
          <div key={m.id} className={`flex ${isUser ? 'justify-end' : ''} gap-2`}>
            {!isUser &&
              (counselorAvatarUrl ? (
                <img src={counselorAvatarUrl} alt="counselor" className="h-8 w-8 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 shrink-0 rounded-full bg-slate-300" />
              ))}
            <div className={`flex max-w-[75%] flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
              <div className={`text-xs font-semibold ${isUser ? 'text-white/90' : 'text-white/90'}`}>
                {isUser ? userName : counselorName}
              </div>
              <div
                className={`${
                  isUser
                    ? 'w-fit rounded-3xl rounded-tr-sm bg-white/80 px-4 py-2 text-sm text-black shadow'
                    : 'w-fit rounded-3xl rounded-tl-sm bg-white px-4 py-2 text-sm text-black shadow'
                }`}
              >
                <div>{m.message}</div>
                {techniqueName && (
                  <div className={`mt-1 text-[10px] ${isUser ? 'text-black/80' : 'text-slate-500'}`}>
                    ({techniqueName})
                  </div>
                )}
              </div>
            </div>
            {isUser &&
              (userAvatarUrl ? (
                <img src={userAvatarUrl} alt="user" className="h-8 w-8 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 shrink-0 rounded-full bg-slate-300" />
              ))}
          </div>
        );
      })}

      {messageList.length === 0 && (
        <div className="py-8 text-center text-sm text-slate-400">아직 메시지가 없어요. 대화를 시작해 보세요.</div>
      )}
    </div>
  );
};

export default MessageList;
