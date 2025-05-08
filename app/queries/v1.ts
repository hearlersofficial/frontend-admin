import { createQueryKeys } from '@lukemorales/query-key-factory';

import { api } from '~/api';
import {
  GetTonesParams,
  GetCounselorsParams,
  KakaoCallbackParams,
  GetPromptVersionsParams,
  GetPromptActivateHistoriesParams,
  GetOrderedCounselTechniquesParams,
} from '~/__generated__/data-contracts';

const v1QueryKeys = createQueryKeys('v1', {
  getTemporaryVersion: {
    queryKey: null,
    queryFn: () => api.V1.getTemporaryVersion(),
  },
  getTones: (query: GetTonesParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getTones(query),
  }),
  getTone: (toneId: string) => ({
    queryKey: [toneId],
    queryFn: () => api.V1.getTone(toneId),
  }),
  getCounselors: (query: GetCounselorsParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.getCounselors(query),
  }),
  getCounselor: (counselorId: string) => ({
    queryKey: [counselorId],
    queryFn: () => api.V1.getCounselor(counselorId),
  }),
  kakao: {
    queryKey: null,
    queryFn: () => api.V1.kakao(),
  },
  kakaoCallback: (query: KakaoCallbackParams) => ({
    queryKey: [query],
    queryFn: () => api.V1.kakaoCallback(query),
  }),
  getTonePromptById: (tonePromptId: string) => ({
    queryKey: [tonePromptId],
    queryFn: () => api.V1.getTonePromptById(tonePromptId),
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
    queryFn: () => api.V1.getPersonaPromptById(personaPromptId),
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
