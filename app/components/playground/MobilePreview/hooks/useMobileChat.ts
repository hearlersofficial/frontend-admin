import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient, useQueries } from '@tanstack/react-query';

import { queries } from '~/queries';
import { counselsService, usersService, promptsService } from '~/api/v1';
import type {
  Counsel,
  CounselMessage,
  CreateCounselRequest,
  CreateMessageRequest,
  CreateMessageResponse,
  PromptVersion
} from '~/api/v1';
import { usePromptStore } from '~/stores/usePromptStore';

export const useMobileChat = () => {
  const queryClient = useQueryClient();
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const { data: myUserData } = useQuery({
    ...queries.v1.getMyUser,
  });

  const userId = myUserData?.id;
  const counselorId = selectedCounselor?.id;
  
  // Reset active counsel on counselor change
  useEffect(() => {
    setActiveCounselId(null);
  }, [counselorId]);

  const { data: counselList = [] } = useQuery({
    ...queries.v1.getCounsels(counselorId || '', userId || ''),
    enabled: Boolean(counselorId && userId),
  });

  const { data: promptVersionList = [] } = useQuery({
    ...queries.v1.getPromptVersions(),
  });

  const [activeCounselId, setActiveCounselId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeCounselId && counselList.length > 0) {
      setActiveCounselId(counselList[0].id ?? null);
    }
  }, [counselList, activeCounselId]);

  const { data: messageList = [], isFetching: isFetchingMessages } = useQuery({
    ...queries.v1.getCounselMessages(counselorId || '', activeCounselId || ''),
    enabled: Boolean(counselorId && activeCounselId),
  });

  // Active counsel details and user profile
  const { data: activeCounselData } = useQuery({
    queryKey: ['activeCounsel', activeCounselId],
    queryFn: async () => {
      if (!activeCounselId) return undefined;
      return await counselsService.getCounsel(activeCounselId);
    },
    enabled: Boolean(activeCounselId),
  });

  const activeCounselUserId = activeCounselData?.userId;
  const activeCounselPromptVersionId = activeCounselData?.promptVersionId;

  const { data: userData } = useQuery({
    queryKey: ['counselUser', activeCounselUserId],
    queryFn: async () => {
      if (!activeCounselUserId) return undefined;
      return await usersService.getUser(activeCounselUserId);
    },
    enabled: Boolean(activeCounselUserId),
  });

  const { data: activePromptVersion } = useQuery<PromptVersion | undefined>({
    queryKey: queries.v1.getPromptVersionById(activeCounselPromptVersionId || '').queryKey,
    queryFn: async () => {
      if (!activeCounselPromptVersionId) return undefined;
      return await promptsService.getPromptVersion(activeCounselPromptVersionId);
    },
    enabled: Boolean(activeCounselPromptVersionId),
  });

  const createCounselMutation = useMutation({
    mutationFn: async (body: CreateCounselRequest) => {
      if (!counselorId || !userId) throw new Error('counselorId and userId are required');
      const result = await counselsService.createCounsel(userId, counselorId, body);
      return result.counsel;
    },
    onSuccess: async (created) => {
      if (counselorId && userId) {
        await queryClient.invalidateQueries({ queryKey: queries.v1.getCounsels(counselorId, userId).queryKey });
      }
      if (created?.id) setActiveCounselId(created.id);
    },
  });

  const isSendingRef = useRef(false);

  const createMessageMutation = useMutation<
    CreateMessageResponse,
    unknown,
    { counselId: string; message: string },
    { previous?: CounselMessage[]; key: readonly unknown[]; tempId: string }
  >({
    mutationFn: async (payload) => {
      const request: CreateMessageRequest = { message: payload.message };
      return await counselsService.createMessage(payload.counselId, request);
    },
    onMutate: async (payload) => {
      if (!activeCounselId || !counselorId) return undefined;
      isSendingRef.current = true;
      const key = queries.v1.getCounselMessages(counselorId, activeCounselId).queryKey as readonly unknown[];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<CounselMessage[] | undefined>(key) ?? [];
      const tempId = `temp-${Date.now()}`;
      const optimistic: CounselMessage = {
        id: tempId,
        message: payload.message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        counselId: activeCounselId,
        isUserMessage: true,
        reactedAt: null,
        reaction: null,
        counselTechniqueId: '',
      };
      queryClient.setQueryData<CounselMessage[]>(key, [...previous, optimistic]);
      return { previous, key, tempId };
    },
    onSuccess: (result, _vars, context) => {
      if (!context) return;
      const { key, tempId } = context;
      const serverUser: CounselMessage = result.createdCounselMessage;
      const counselorResp: CounselMessage = result.counselorResponseMessage;
      queryClient.setQueryData<CounselMessage[] | undefined>(key, (old) => {
        const list = old ? [...old] : [];
        const idx = list.findIndex((m) => m.id === tempId);
        if (idx >= 0 && serverUser) {
          list[idx] = serverUser;
        } else if (serverUser) {
          list.push(serverUser);
        }
        if (counselorResp) list.push(counselorResp);
        return list;
      });
    },
    onError: (_err, _vars, context) => {
      if (!context) return;
      const { key, previous } = context;
      if (previous) queryClient.setQueryData<CounselMessage[] | undefined>(key, previous);
    },
    onSettled: async () => {
      isSendingRef.current = false;
      if (!activeCounselId || !counselorId) return;
      await queryClient.invalidateQueries({
        queryKey: queries.v1.getCounselMessages(counselorId, activeCounselId).queryKey,
      });
    },
  });

  const [inputValue, setInputValue] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPromptVersionId, setSelectedPromptVersionId] = useState<string | undefined>(undefined);

  const handleCreateCounsel = () => {
    if (!counselorId || !selectedPromptVersionId || createCounselMutation.isPending) return;
    createCounselMutation.mutate({
      promptVersionId: selectedPromptVersionId,
      bubbleId: null,
      responseOptionNo: null,
    });
    setIsCreateModalOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeCounselId || createMessageMutation.isPending || isSendingRef.current) return;
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

  const techniqueIds = useMemo(
    () =>
      Array.from(
        new Set(
          (messageList as CounselMessage[]).map((m) => m.counselTechniqueId).filter((v): v is string => Boolean(v))
        )
      ),
    [messageList]
  );

  const techniqueQueries = useQueries({
    queries: techniqueIds.map((id) => ({
      queryKey: queries.v1.getCounselTechniqueById(id).queryKey,
      queryFn: async () => {
        return await promptsService.getCounselTechnique(id);
      },
      enabled: Boolean(id),
    })),
  });

  const techniqueNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    techniqueQueries.forEach((q) => {
      const ct = q.data as { id?: string; name?: string } | undefined;
      if (ct?.id) {
        map[ct.id] = ct.name ?? ct.id;
      }
    });
    return map;
  }, [techniqueQueries]);

  // Prompt version name map for room list display
  const promptVersionIds = useMemo(
    () =>
      Array.from(
        new Set((counselList as Counsel[]).map((c) => c.promptVersionId).filter((v): v is string => Boolean(v)))
      ),
    [counselList]
  );

  const promptVersionQueries = useQueries({
    queries: promptVersionIds.map((id) => ({
      queryKey: queries.v1.getPromptVersionById(id).queryKey,
      queryFn: async () => {
        return await promptsService.getPromptVersion(id);
      },
      enabled: Boolean(id),
    })),
  });

  const promptVersionNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    promptVersionQueries.forEach((q) => {
      const pv = q.data as { id?: string; name?: string } | undefined;
      if (pv?.id) {
        map[pv.id] = pv.name ?? pv.id;
      }
    });
    return map;
  }, [promptVersionQueries]);

  const counselorName = selectedCounselor?.name ?? undefined;
  const userName = userData?.nickname ?? undefined;

  return {
    // data
    counselList,
    promptVersionList: promptVersionList,
    messageList: messageList,

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
    activePromptVersionName: activePromptVersion?.name,
    techniqueNameMap,
    promptVersionNameMap,
    counselorName,
    userName,
    // handlers
    handleCreateCounsel,
    handleSendMessage,
    isCreatingCounsel: createCounselMutation.isPending,
  };
};
