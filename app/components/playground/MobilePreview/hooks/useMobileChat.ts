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
} from '~/__generated__/data-contracts';

export const useMobileChat = () => {
  const queryClient = useQueryClient();
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);

  const counselorId = selectedCounselor?.id ?? '';

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

    // handlers
    handleCreateCounsel,
    handleSendMessage,
    isCreatingCounsel: createCounselMutation.isPending,
  };
};
