import { createQueryKeys } from '@lukemorales/query-key-factory';

import {
  counselorsService,
  promptsService,
  counselsService,
  authService,
  usersService,
} from '~/api/v1';
import type {
  GetTonesParams,
  GetCounselorsParams,
  KakaoLoginRequest,
  KakaoCallbackRequest,
  GetPromptVersionsParams,
  GetPromptActivateHistoriesParams,
  GetPersonaPromptsParams,
  GetTonePromptsParams,
  GetCounselTechniqueTransitionRulesParams,
  GetCounselTechniquesParams,
} from '~/api/v1';

const v1QueryKeys = createQueryKeys('v1', {
  getTone: (toneId: string) => ({
    queryKey: [toneId],
    queryFn: () => counselorsService.getTone(toneId),
  }),
  getTemporaryVersion: {
    queryKey: null,
    queryFn: () => promptsService.getTemporaryVersion(),
  },
  getCounselor: (counselorId: string) => ({
    queryKey: [counselorId],
    queryFn: () => counselorsService.getCounselor(counselorId),
  }),
  getTones: (query?: GetTonesParams) => ({
    queryKey: [query],
    queryFn: () => counselorsService.getTones(query),
  }),
  getCounselors: (query?: GetCounselorsParams) => ({
    queryKey: [query],
    queryFn: () => counselorsService.getCounselors(query),
  }),
  kakao: (query: KakaoLoginRequest) => ({
    queryKey: [query],
    queryFn: () => {
      // kakaoLogin은 URL을 반환하므로 Promise로 감싸서 반환
      return Promise.resolve(authService.kakaoLogin(query));
    },
  }),
  kakaoCallback: (query: KakaoCallbackRequest) => ({
    queryKey: [query],
    queryFn: () => authService.kakaoCallback(query),
  }),
  getTonePromptById: (tonePromptId: string) => ({
    queryKey: [tonePromptId],
    queryFn: () => promptsService.getTonePrompt(tonePromptId),
  }),
  getTonePrompts: (query: GetTonePromptsParams) => ({
    queryKey: [query],
    queryFn: () => promptsService.getTonePrompts(query),
  }),
  getPromptVersions: (query?: GetPromptVersionsParams) => ({
    queryKey: [query],
    queryFn: () => promptsService.getPromptVersions(query),
  }),
  getPromptVersionById: (promptVersionId: string) => ({
    queryKey: [promptVersionId],
    queryFn: () => promptsService.getPromptVersion(promptVersionId),
  }),
  getActiveVersion: {
    queryKey: null,
    queryFn: () => promptsService.getActiveVersion(),
  },
  getPromptActivateHistories: (query?: GetPromptActivateHistoriesParams) => ({
    queryKey: [query],
    queryFn: () => promptsService.getPromptActivateHistories(query),
  }),
  getPersonaPromptById: (personaPromptId: string) => ({
    queryKey: [personaPromptId],
    queryFn: () => promptsService.getPersonaPrompt(personaPromptId),
  }),
  getPersonaPrompts: (query: GetPersonaPromptsParams) => ({
    queryKey: [query],
    queryFn: () => promptsService.getPersonaPrompts(query),
  }),
  getEpisode: (episodeId: string, counselorId: string) => ({
    queryKey: [episodeId, counselorId],
    queryFn: () => counselorsService.getEpisode(counselorId, episodeId),
  }),
  getEpisodes: (counselorId: string) => ({
    queryKey: [counselorId],
    queryFn: () => counselorsService.getEpisodes(counselorId),
  }),
  getCounselTechniqueById: (counselTechniqueId: string) => ({
    queryKey: [counselTechniqueId],
    queryFn: () => promptsService.getCounselTechnique(counselTechniqueId),
  }),
  getCounselTechniques: (query: GetCounselTechniquesParams) => ({
    queryKey: [query],
    queryFn: () => promptsService.getCounselTechniques(query),
  }),
  getCounselTechniqueTransitionRules: (query?: GetCounselTechniqueTransitionRulesParams) => ({
    queryKey: [query],
    queryFn: () => promptsService.getCounselTechniqueTransitionRules(query),
  }),
  getCounsels: (counselorId: string, userId: string) => ({
    queryKey: ['counsels', counselorId, userId],
    queryFn: () => counselsService.getCounsels({ counselorId, userId }),
  }),
  getCounselMessages: (counselorId: string, counselId: string) => ({
    queryKey: ['counselMessages', counselorId, counselId],
    queryFn: () => counselsService.getMessages(counselId),
  }),
  getMyUser: {
    queryKey: null,
    queryFn: () => usersService.getMyUser(),
  },
});

export { v1QueryKeys };
