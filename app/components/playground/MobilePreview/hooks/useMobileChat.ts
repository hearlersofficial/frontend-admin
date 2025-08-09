import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queries } from '~/queries';
import { api } from '~/api';
import { usePromptStore } from '~/store/usePromptStore';
import {
  Counsel,
  CounselMessage,
  CreateCounselRequest,
  PromptVersionResponseDto,
  User,
} from '~/__generated__/data-contracts';

export const useMobileChat = () => {
  const queryClient = useQueryClient();
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);

  const counselorId = selectedCounselor?.id ?? '';
  // Reset active counsel on counselor change
  useEffect(() => {
    setActiveCounselId(null);
  }, [counselorId]);

  const { data: counselList = [] } = useQuery({
    ...queries.v1.getCounsels(counselorId),
    enabled: Boolean(counselorId),
  });

  const { data: promptVersionList = [] } = useQuery({
    ...queries.v1.getPromptVersions({}),
  });

  const [activeCounselId, setActiveCounselId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeCounselId && counselList.length > 0) {
      setActiveCounselId(counselList[0].id ?? null);
    }
  }, [counselList, activeCounselId]);

  const { data: messageList = [], isFetching: isFetchingMessages } = useQuery({
    ...queries.v1.getCounselMessages(counselorId, activeCounselId ?? ''),
    enabled: Boolean(counselorId && activeCounselId),
  });

  // Active counsel details and user profile
  const { data: activeCounselData } = useQuery({
    queryKey: ['activeCounsel', counselorId, activeCounselId],
    queryFn: async () => {
      if (!counselorId || !activeCounselId) return undefined;
      const res = await api.V1.getCounsel(counselorId, activeCounselId);
      return res.data.data?.counsel as Counsel | undefined;
    },
    enabled: Boolean(counselorId && activeCounselId),
  });

  const userId = activeCounselData?.userId ?? undefined;
  const activeCounselPromptVersionId = activeCounselData?.promptVersionId ?? undefined;

  const { data: userData } = useQuery({
    queryKey: ['counselUser', userId],
    queryFn: async () => {
      if (!userId) return undefined;
      const res = await api.V1.getUser(userId);
      return res.data.data?.user as User | undefined;
    },
    enabled: Boolean(userId),
  });

  const createCounselMutation = useMutation({
    mutationFn: async (body: CreateCounselRequest) => {
      if (!counselorId) throw new Error('counselorId is required');
      const res = await api.V1.createCounsel(counselorId, body);
      return res.data.data?.counsel as Counsel | undefined;
    },
    onSuccess: async (created) => {
      await queryClient.invalidateQueries({ queryKey: queries.v1.getCounsels(counselorId).queryKey });
      if (created?.id) setActiveCounselId(created.id);
    },
  });

  const createMessageMutation = useMutation({
    mutationFn: async (payload: { counselId: string; message: string }) => {
      const res = await api.V1.createMessage(counselorId, payload.counselId, { message: payload.message });
      return res.data.data;
    },
    onSuccess: async () => {
      if (!activeCounselId) return;
      await queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselMessages(counselorId, activeCounselId).queryKey,
      });
    },
  });

  const [inputValue, setInputValue] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPromptVersionId, setSelectedPromptVersionId] = useState<string | undefined>(undefined);

  const handleCreateCounsel = () => {
    if (!counselorId || createCounselMutation.isPending) return;
    createCounselMutation.mutate({
      promptVersionId: selectedPromptVersionId ?? null,
      bubbleId: null,
      responseOptionNo: null,
    });
    setIsCreateModalOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeCounselId || createMessageMutation.isPending) return;
    const text = inputValue.trim();
    setInputValue('');
    createMessageMutation.mutate({ counselId: activeCounselId, message: text });
  };

  const isInputDisabled = !activeCounselId || createMessageMutation.isPending;

  const headerText = useMemo(() => {
    if (!selectedCounselor) return '상담사를 선택해주세요';
    if (!activeCounselId) return `${selectedCounselor.name}님과의 상담을 시작해보세요.`;
    return `${selectedCounselor.name} 상담방`;
  }, [selectedCounselor, activeCounselId]);

  const counselorAvatarUrl = selectedCounselor?.profileImage ?? undefined;
  const userAvatarUrl = userData?.userProfile?.profileImage ?? undefined;

  const latestCounselTechniqueId = useMemo(() => {
    const last = [...(messageList as CounselMessage[])].reverse().find((m) => Boolean(m.counselTechniqueId));
    return last?.counselTechniqueId;
  }, [messageList]);

  return {
    // data
    counselList,
    promptVersionList: promptVersionList as PromptVersionResponseDto[],
    messageList: messageList as CounselMessage[],

    // selection & input
    activeCounselId,
    setActiveCounselId,
    inputValue,
    setInputValue,
    selectedPromptVersionId,
    setSelectedPromptVersionId,

    // ui states
    isFetchingMessages,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isInputDisabled,
    headerText,
    counselorAvatarUrl,
    userAvatarUrl,
    latestCounselTechniqueId,
    activeCounselPromptVersionId,

    // handlers
    handleCreateCounsel,
    handleSendMessage,
    isCreatingCounsel: createCounselMutation.isPending,
  };
};
