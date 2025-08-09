/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import MessageList from '~/components/playground/MobilePreview/components/MessageList';
import MessageInput from '~/components/playground/MobilePreview/components/MessageInput';
import RoomList from '~/components/playground/MobilePreview/components/RoomList';
import { useMobileChat } from '~/components/playground/MobilePreview/hooks/useMobileChat';
import CreateCounselModal from '~/components/playground/MobilePreview/modals/CreateCounselModal';
import PromptVersionInfoModal from '~/components/playground/MobilePreview/modals/PromptVersionInfoModal';
import CounselTechniqueInfo from '~/components/playground/MobilePreview/modals/CounselTechniqueInfo';
import { usePromptStore } from '~/store/usePromptStore';

const MobilePreview = () => {
  const {
    counselList,
    promptVersionList,
    messageList,
    activeCounselId,
    setActiveCounselId,
    inputValue,
    setInputValue,
    selectedPromptVersionId,
    setSelectedPromptVersionId,
    isFetchingMessages,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isInputDisabled,
    headerText,
    handleCreateCounsel,
    handleSendMessage,
    isCreatingCounsel,
    counselorAvatarUrl,
    userAvatarUrl,
    latestCounselTechniqueId,
    activeCounselPromptVersionId,
  } = useMobileChat();

  const canCreate = Boolean(usePromptStore.getState().selectedCounselor?.id);
  const [viewDepth, setViewDepth] = React.useState<'rooms' | 'chat'>(activeCounselId ? 'chat' : 'rooms');
  React.useEffect(() => {
    setViewDepth(activeCounselId ? 'chat' : 'rooms');
  }, [activeCounselId]);
  const selectedCounselorId = usePromptStore((s) => s.selectedCounselor?.id);
  React.useEffect(() => {
    setViewDepth('rooms');
  }, [selectedCounselorId]);
  const [promptInfoId, setPromptInfoId] = React.useState<string | undefined>(undefined);
  const [isPromptInfoOpen, setIsPromptInfoOpen] = React.useState(false);
  const [isTechniqueInfoOpen, setIsTechniqueInfoOpen] = React.useState(false);

  return (
    <div className="hidden w-[390px] min-w-[390px] xl:flex">
      <div className="sticky top-6 h-[760px] w-full rounded-[32px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-xl">
        <div className="flex h-full flex-col overflow-hidden rounded-[32px]">
          <div className="px-5 py-4 text-center text-sm font-semibold text-slate-700">{headerText}</div>
          <div className="mx-4 h-px bg-slate-200" />

          {viewDepth === 'rooms' ? (
            <>
              <RoomList
                counselList={counselList}
                onSelect={(id) => {
                  setActiveCounselId(id);
                  setViewDepth('chat');
                }}
                onOpenPromptInfo={(pvId) => {
                  setPromptInfoId(pvId);
                  setIsPromptInfoOpen(true);
                }}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-5 py-3">
                <button className="text-sm text-slate-500" onClick={() => setViewDepth('rooms')}>
                  ← 목록으로
                </button>
                <button className="text-sm text-slate-500" onClick={() => setIsTechniqueInfoOpen(true)}>
                  현재 테크닉 보기
                </button>
              </div>
              <div className="mx-4 h-px bg-slate-200" />
              <MessageList
                messageList={messageList}
                isFetching={isFetchingMessages}
                counselorAvatarUrl={counselorAvatarUrl}
                userAvatarUrl={userAvatarUrl}
              />
              <MessageInput
                value={inputValue}
                setValue={setInputValue}
                onSend={handleSendMessage}
                disabled={isInputDisabled}
              />
            </>
          )}
        </div>
      </div>

      <CreateCounselModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        promptVersionList={promptVersionList}
        selectedPromptVersionId={selectedPromptVersionId}
        setSelectedPromptVersionId={setSelectedPromptVersionId}
        onCreate={handleCreateCounsel}
        canSubmit={!isCreatingCounsel && canCreate}
      />
      <PromptVersionInfoModal
        promptVersionId={promptInfoId ?? activeCounselPromptVersionId}
        isOpen={isPromptInfoOpen}
        setIsOpen={setIsPromptInfoOpen}
      />
      <CounselTechniqueInfo
        counselTechniqueId={latestCounselTechniqueId}
        isOpen={isTechniqueInfoOpen}
        setIsOpen={setIsTechniqueInfoOpen}
      />
    </div>
  );
};

export default MobilePreview;
