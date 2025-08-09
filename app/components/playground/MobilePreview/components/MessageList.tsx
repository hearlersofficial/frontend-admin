import { useEffect, useRef } from 'react';
import { CounselMessage } from '~/__generated__/data-contracts';

interface MessageListProps {
  messageList: CounselMessage[];
  isFetching: boolean;
  counselorAvatarUrl?: string;
  userAvatarUrl?: string;
}

const MessageList = ({ messageList, isFetching, counselorAvatarUrl, userAvatarUrl }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList.length, isFetching]);

  return (
    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
      {messageList.map((m) => {
        const isUser = Boolean(m.userMessage);
        return (
          <div key={m.id} className={`flex ${isUser ? 'justify-end' : ''} gap-2`}>
            {!isUser &&
              (counselorAvatarUrl ? (
                <img src={counselorAvatarUrl} alt="counselor" className="h-8 w-8 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 shrink-0 rounded-full bg-slate-300" />
              ))}
            <div
              className={`${
                isUser
                  ? 'max-w-[70%] rounded-2xl rounded-tr-sm bg-violet-600 px-4 py-2 text-sm text-white shadow'
                  : 'max-w-[70%] rounded-2xl rounded-tl-sm bg-white px-4 py-2 text-sm text-slate-800 shadow'
              }`}
            >
              {m.message}
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
