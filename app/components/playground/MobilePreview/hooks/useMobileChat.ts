import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient, useQueries } from '@tanstack/react-query';

import { queries } from '~/queries';
import { api } from '~/api';
import { usePromptStore } from '~/store/usePromptStore';
import {
  Counsel,
  CounselMessage,
  CreateCounselRequest,
  PromptVersionResponseDto,
  CreateMessageData,
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

  const { data: activePromptVersion } = useQuery<PromptVersionResponseDto | undefined>({
    queryKey: ['activePromptVersion', activeCounselPromptVersionId],
    queryFn: async () => {
      if (!activeCounselPromptVersionId) return undefined;
      const res = await api.V1.getPromptVersionById(activeCounselPromptVersionId);
      return res.data.data?.promptVersion as PromptVersionResponseDto | undefined;
    },
    enabled: Boolean(activeCounselPromptVersionId),
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

  const isSendingRef = useRef(false);

  const createMessageMutation = useMutation<
    CreateMessageData,
    unknown,
    { counselId: string; message: string },
    { previous?: CounselMessage[]; key: readonly unknown[]; tempId: string }
  >({
    mutationFn: async (payload) => {
      const res = await api.V1.createMessage(counselorId, payload.counselId, { message: payload.message });
      return res.data; // SuccessCreateMessageResponse
    },
    onMutate: async (payload) => {
      if (!activeCounselId) return undefined;
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
        userMessage: true,
      };
      queryClient.setQueryData<CounselMessage[]>(key, [...previous, optimistic]);
      return { previous, key, tempId };
    },
    onSuccess: (result, _vars, context) => {
      if (!context) return;
      const { key, tempId } = context;
      const serverUser = result.data?.createdCounselMessage as CounselMessage | undefined;
      const counselorResp = result.data?.counselorResponseMessage as CounselMessage | undefined;
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
      queryKey: ['counselTechnique', id],
      queryFn: async () => {
        const res = await api.V1.getCounselTechniqueById(id);
        return res.data.data?.counselTechnique;
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
      queryKey: ['promptVersion', id],
      queryFn: async () => {
        const res = await api.V1.getPromptVersionById(id);
        return res.data.data?.promptVersion as PromptVersionResponseDto | undefined;
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
