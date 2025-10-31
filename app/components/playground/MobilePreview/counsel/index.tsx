import MessageList from './MessageList';
import MessageInput from './MessageInput';
import CouncelHeader from './CouncelHeader';
import type { CounselMessage } from '~/api/v1';

interface CounselProps {
  promptVersionName?: string;
  latestTechniqueName?: string;
  onBack: () => void;
  onOpenPromptInfo: () => void;
  onOpenTechniqueInfo: () => void;

  messageList: CounselMessage[];
  isFetchingMessages: boolean;
  counselorAvatarUrl?: string;
  userAvatarUrl?: string;
  counselorName?: string;
  userName?: string;
  techniqueNameMap?: Record<string, string>;

  inputValue: string;
  setInputValue: (v: string) => void;
  onSend: () => void;
  isInputDisabled?: boolean;
}

const Counsel = ({
  promptVersionName,
  latestTechniqueName,
  onBack,
  onOpenPromptInfo,
  onOpenTechniqueInfo,
  messageList,
  isFetchingMessages,
  counselorAvatarUrl,
  userAvatarUrl,
  counselorName,
  userName,
  techniqueNameMap,
  inputValue,
  setInputValue,
  onSend,
  isInputDisabled,
}: CounselProps) => {
  return (
    <>
      <CouncelHeader
        promptVersionName={promptVersionName}
        latestTechniqueName={latestTechniqueName}
        onBack={onBack}
        onOpenPromptInfo={onOpenPromptInfo}
        onOpenTechniqueInfo={onOpenTechniqueInfo}
      />
      <div className="mx-4 h-px bg-slate-200" />
      <MessageList
        messageList={messageList}
        isFetching={isFetchingMessages}
        counselorAvatarUrl={counselorAvatarUrl}
        userAvatarUrl={userAvatarUrl}
        counselorName={counselorName}
        userName={userName}
        techniqueNameMap={techniqueNameMap}
      />
      <MessageInput value={inputValue} setValue={setInputValue} onSend={onSend} disabled={isInputDisabled} />
    </>
  );
};

export default Counsel;
