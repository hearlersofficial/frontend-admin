/* eslint-disable @typescript-eslint/no-unused-vars */
import RoomSelector from '~/components/playground/MobilePreview/components/RoomSelector';
import MessageList from '~/components/playground/MobilePreview/components/MessageList';
import MessageInput from '~/components/playground/MobilePreview/components/MessageInput';
import { useMobileChat } from '~/components/playground/MobilePreview/hooks/useMobileChat';
import CreateCounselModal from '~/components/playground/MobilePreview/modals/CreateCounselModal';
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
  } = useMobileChat();

  const canCreate = Boolean(usePromptStore.getState().selectedCounselor?.id);

  return (
    <div className="hidden w-[390px] min-w-[390px] xl:flex">
      <div className="sticky top-6 h-[760px] w-full rounded-[32px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-xl">
        <div className="flex h-full flex-col overflow-hidden rounded-[32px]">
          <div className="px-5 py-4 text-center text-sm font-semibold text-slate-700">{headerText}</div>
          <div className="mx-4 h-px bg-slate-200" />

          <RoomSelector
            counselList={counselList}
            activeCounselId={activeCounselId}
            setActiveCounselId={setActiveCounselId}
            canCreate={canCreate}
            onOpenCreate={() => setIsCreateModalOpen(true)}
          />

          <MessageList messageList={messageList} isFetching={isFetchingMessages} />

          {activeCounselId ? (
            <MessageInput
              value={inputValue}
              setValue={setInputValue}
              onSend={handleSendMessage}
              disabled={isInputDisabled}
            />
          ) : (
            <div className="mt-auto px-5 pb-5">
              <div className="rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-400">
                상담을 시작하려면 상단의 &quot;새 상담 시작&quot;을 눌러주세요.
              </div>
            </div>
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
    </div>
  );
};

export default MobilePreview;
