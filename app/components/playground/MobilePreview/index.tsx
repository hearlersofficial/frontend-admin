/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Room from '~/components/playground/MobilePreview/room';
import Counsel from '~/components/playground/MobilePreview/counsel';
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
    activePromptVersionName,
    techniqueNameMap,
    promptVersionNameMap,
    counselorName,
    userName,
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
    <div className="scrollbar-none flex w-[390px] min-w-[390px]">
      <div className="scrollbar-none sticky top-6 h-[760px] w-full overflow-hidden rounded-[32px]">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/chat-background.png')" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col overflow-hidden">
          <div className="px-5 py-4 text-center text-sm font-semibold text-white">{headerText}</div>

          {viewDepth === 'rooms' ? (
            <Room
              canCreate={canCreate}
              onCreate={() => setIsCreateModalOpen(true)}
              counselList={counselList}
              onSelect={(id) => {
                setActiveCounselId(id);
                setViewDepth('chat');
              }}
              onOpenPromptInfo={(pvId) => {
                setPromptInfoId(pvId);
                setIsPromptInfoOpen(true);
              }}
              promptVersionNameMap={promptVersionNameMap}
            />
          ) : (
            <Counsel
              promptVersionName={activePromptVersionName}
              latestTechniqueName={latestCounselTechniqueId ? techniqueNameMap?.[latestCounselTechniqueId] : undefined}
              onBack={() => setViewDepth('rooms')}
              onOpenPromptInfo={() => setIsPromptInfoOpen(true)}
              onOpenTechniqueInfo={() => setIsTechniqueInfoOpen(true)}
              messageList={messageList}
              isFetchingMessages={isFetchingMessages}
              counselorAvatarUrl={counselorAvatarUrl}
              userAvatarUrl={userAvatarUrl}
              counselorName={counselorName}
              userName={userName}
              techniqueNameMap={techniqueNameMap}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSend={handleSendMessage}
              isInputDisabled={isInputDisabled}
            />
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
