import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import dayjs from 'dayjs';

import { queries } from '~/queries';
import { api } from '~/api';
import { usePromptStore } from '~/store/usePromptStore';
import { Counsel, CounselMessage, CreateCounselRequest } from '~/__generated__/data-contracts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Modal } from '~/components/Modal';

const MobilePreview = () => {
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPromptVersionId, setSelectedPromptVersionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList.length, isFetchingMessages]);

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

  return (
    <div className="hidden w-[390px] min-w-[390px] xl:flex">
      <div className="sticky top-6 h-[760px] w-full rounded-[32px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-xl">
        <div className="flex h-full flex-col overflow-hidden rounded-[32px]">
          <div className="px-5 py-4 text-center text-sm font-semibold text-slate-700">{headerText}</div>
          <div className="mx-4 h-px bg-slate-200" />

          <div className="flex items-center justify-between gap-2 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">상담방</span>
              <Select
                value={activeCounselId ?? ''}
                onValueChange={(val) => setActiveCounselId(val || null)}
                disabled={!counselList.length}
              >
                <SelectTrigger size="sm" className="min-w-[200px]">
                  <SelectValue placeholder={counselList.length ? '상담 선택' : '상담 없음'} />
                </SelectTrigger>
                <SelectContent>
                  {counselList.map((c: Counsel) => (
                    <SelectItem key={c.id} value={c.id ?? ''}>
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-xs text-slate-700">{c.lastMessage || '대화 시작'}</span>
                        <span className="shrink-0 text-[10px] text-slate-400">
                          {c.createdAt ? dayjs(c.createdAt).format('MM/DD HH:mm') : ''}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              size="sm"
              className="rounded-full bg-violet-600 text-white"
              onClick={() => setIsCreateModalOpen(true)}
              disabled={!counselorId}
            >
              새 상담 시작
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messageList.map((m: CounselMessage) => {
              const isUser = Boolean(m.userMessage);
              return (
                <div key={m.id} className={`flex ${isUser ? 'justify-end' : ''} gap-2`}>
                  {!isUser && <div className="h-8 w-8 shrink-0 rounded-full bg-slate-300" />}
                  <div
                    className={`${
                      isUser
                        ? 'max-w-[70%] rounded-2xl rounded-tr-sm bg-violet-600 px-4 py-2 text-sm text-white shadow'
                        : 'max-w-[70%] rounded-2xl rounded-tl-sm bg-white px-4 py-2 text-sm text-slate-800 shadow'
                    }`}
                  >
                    {m.message}
                  </div>
                  {isUser && <div className="h-8 w-8 shrink-0 rounded-full bg-slate-300" />}
                </div>
              );
            })}

            {messageList.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-400">아직 메시지가 없어요. 대화를 시작해 보세요.</div>
            )}
          </div>

          <div className="mt-auto px-5 pb-5">
            {activeCounselId ? (
              <div className="flex items-center gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="내용을 입력해 주세요"
                  className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  disabled={isInputDisabled}
                />
                <button
                  onClick={handleSendMessage}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white shadow disabled:opacity-50"
                  disabled={isInputDisabled || !inputValue.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-400">
                상담을 시작하려면 상단의 &quot;새 상담 시작&quot;을 눌러주세요.
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} maxWidth="3xl">
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-slate-700">새 상담 시작</h3>
          <div className="space-y-2">
            <label className="text-sm text-slate-600" htmlFor="pv-select">
              프롬프트 버전 선택
            </label>
            <Select
              value={selectedPromptVersionId ?? ''}
              onValueChange={(v) => setSelectedPromptVersionId(v || undefined)}
            >
              <SelectTrigger id="pv-select">
                <SelectValue placeholder="프롬프트 버전을 선택하세요 (선택 안함 가능)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">선택 안함</SelectItem>
                {promptVersionList.map((pv: { id?: string; name?: string; createdAt?: string }) => (
                  <SelectItem key={pv.id} value={pv.id ?? ''}>
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="truncate text-xs text-slate-700">{pv.name}</span>
                      <span className="shrink-0 text-[10px] text-slate-400">
                        {dayjs(pv.createdAt).format('MM/DD HH:mm')}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              취소
            </Button>
            <Button
              className="bg-violet-600 text-white"
              onClick={handleCreateCounsel}
              disabled={createCounselMutation.isPending || !counselorId}
            >
              {createCounselMutation.isPending ? '생성 중...' : '상담 시작하기'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MobilePreview;
