import { createQueryKeys } from '@lukemorales/query-key-factory';

import { api } from '~/api';
import {
  GetTonesParams,
  GetCounselorsParams,
  KakaoParams,
  KakaoCallbackParams,
  GetPromptVersionsParams,
  GetPromptActivateHistoriesParams,
  GetOrderedCounselTechniquesParams,
} from '~/__generated__/data-contracts';

const v1QueryKeys = createQueryKeys('v1', {
  getTone: (toneId: string) => ({
    queryKey: [toneId],
    queryFn: () => api.V1.getTone(toneId),
  }),
  getTemporaryVersion: {
    queryKey: null,
    queryFn: () => api.V1.getTemporaryVersion(),
  },
  getCounselor: (counselorId: string) => ({
    queryKey: [counselorId],
    queryFn: () => api.V1.getCounselor(counselorId),
  }),
  getTones: (query: GetTonesParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getTones(query),
  }),
  getCounselors: (query: GetCounselorsParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getCounselors(query),
  }),
  kakao: (query: KakaoParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.kakao(query),
  }),
  kakaoCallback: (query: KakaoCallbackParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.kakaoCallback(query),
  }),
  getTonePromptById: (tonePromptId: string) => ({
    queryKey: [tonePromptId],
    queryFn: () => api.V1.getTonePromptById(tonePromptId).then((res) => res.data.data?.tonePrompt),
  }),
  getPromptVersions: (query: GetPromptVersionsParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getPromptVersions(query),
  }),
  getPromptVersionById: (promptVersionId: string) => ({
    queryKey: [promptVersionId],
    queryFn: () => api.V1.getPromptVersionById(promptVersionId),
  }),
  getActiveVersion: {
    queryKey: null,
    queryFn: () => api.V1.getActiveVersion(),
  },
  getPromptActivateHistories: (query: GetPromptActivateHistoriesParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getPromptActivateHistories(query),
  }),
  getPersonaPromptById: (personaPromptId: string) => ({
    queryKey: [personaPromptId],
    queryFn: () => api.V1.getPersonaPromptById(personaPromptId).then((res) => res.data.data?.personaPrompt),
  }),
  getEpisode: (episodeId: string, counselorId: string) => ({
    queryKey: [episodeId, counselorId],
    queryFn: () => api.V1.getEpisode(episodeId, counselorId),
  }),
  getEpisodes: (counselorId: string) => ({
    queryKey: [counselorId],
    queryFn: () => api.V1.getEpisodes(counselorId),
  }),
  getOrderedCounselTechniques: (query: GetOrderedCounselTechniquesParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getOrderedCounselTechniques(query),
  }),
  getCounselTechniqueById: (counselTechniqueId: string) => ({
    queryKey: [counselTechniqueId],
    queryFn: () => api.V1.getCounselTechniqueById(counselTechniqueId),
  }),
});

export { v1QueryKeys };
