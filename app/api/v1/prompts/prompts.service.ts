import { api } from '~/api';
import { extractData } from '../response.util';
import type {
  PromptVersion,
  PromptVersionRequest,
  GetPromptVersionsParams,
  TonePrompt,
  UpdateTonePromptRequest,
  GetTonePromptsParams,
  PersonaPrompt,
  UpdatePersonaPromptRequest,
  GetPersonaPromptsParams,
  CounselTechnique,
  CreateCounselTechniqueRequest,
  UpdateCounselTechniqueRequest,
  GetCounselTechniquesParams,
  CounselTechniqueTransitionRule,
  CreateCounselTechniqueTransitionRuleRequest,
  UpdateCounselTechniqueTransitionRuleRequest,
  GetCounselTechniqueTransitionRulesParams,
  PromptActivateHistory,
  GetPromptActivateHistoriesParams,
  SaveVersionRequest,
  SaveSequenceRequest,
} from './prompts.types';
import { ApiSuccessResponse } from '../response.types';

export const promptsService = {
  // Prompt Versions
  getPromptVersion: async (promptVersionId: string): Promise<PromptVersion> => {
    const response = await api.axios.get<ApiSuccessResponse<{ promptVersion: PromptVersion }>>(
      `/v1/admin/prompt-versions/${promptVersionId}`,
    );
    return extractData(response).promptVersion;
  },

  getPromptVersions: async (params?: GetPromptVersionsParams): Promise<PromptVersion[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ promptVersions: PromptVersion[] }>>('/v1/admin/prompt-versions', {
      params,
    });
    return extractData(response).promptVersions;
  },

  getTemporaryVersion: async (): Promise<PromptVersion> => {
    const response = await api.axios.get<ApiSuccessResponse<{ promptVersion: PromptVersion }>>(
      '/v1/admin/prompt-versions/temporary-version',
    );
    return extractData(response).promptVersion;
  },

  getActiveVersion: async (): Promise<PromptVersion> => {
    const response = await api.axios.get<ApiSuccessResponse<{ promptVersion: PromptVersion }>>(
      '/v1/admin/prompt-versions/active-version',
    );
    return extractData(response).promptVersion;
  },

  saveVersion: async (data: SaveVersionRequest): Promise<PromptVersion> => {
    const response = await api.axios.put<ApiSuccessResponse<{ promptVersion: PromptVersion }>>(
      '/v1/admin/prompt-versions/temporary-version',
      data,
    );
    return extractData(response).promptVersion;
  },

  loadPromptVersion: async (promptVersionId: string): Promise<PromptVersion> => {
    const response = await api.axios.put<ApiSuccessResponse<{ promptVersion: PromptVersion }>>(
      `/v1/admin/prompt-versions/temporary-version/${promptVersionId}`,
    );
    return extractData(response).promptVersion;
  },

  updatePromptVersion: async (
    promptVersionId: string,
    data: PromptVersionRequest,
  ): Promise<PromptVersion> => {
    const response = await api.axios.put<ApiSuccessResponse<{ promptVersion: PromptVersion }>>(
      `/v1/admin/prompt-versions/${promptVersionId}`,
      data,
    );
    return extractData(response).promptVersion;
  },

  deletePromptVersion: async (promptVersionId: string): Promise<boolean> => {
    const response = await api.axios.delete<ApiSuccessResponse<{ success: boolean }>>(
      `/v1/admin/prompt-versions/${promptVersionId}`,
    );
    return extractData(response).success;
  },

  activatePromptVersion: async (promptVersionId: string): Promise<PromptVersion> => {
    const response = await api.axios.post<ApiSuccessResponse<{ promptVersion: PromptVersion }>>(
      `/v1/admin/prompt-versions/${promptVersionId}/activate`,
    );
    return extractData(response).promptVersion;
  },

  getPromptActivateHistories: async (
    params?: GetPromptActivateHistoriesParams,
  ): Promise<PromptActivateHistory[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ promptActivateHistories: PromptActivateHistory[] }>>(
      '/v1/admin/prompt-activate-histories',
      { params },
    );
    return extractData(response).promptActivateHistories;
  },

  // Tone Prompts
  getTonePrompt: async (tonePromptId: string): Promise<TonePrompt> => {
    const response = await api.axios.get<ApiSuccessResponse<{ tonePrompt: TonePrompt }>>(
      `/v1/admin/tone-prompts/${tonePromptId}`,
    );
    return extractData(response).tonePrompt;
  },

  getTonePrompts: async (params: GetTonePromptsParams): Promise<TonePrompt[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ tonePrompts: TonePrompt[] }>>('/v1/admin/tone-prompts', {
      params,
    });
    return extractData(response).tonePrompts;
  },

  updateTonePrompt: async (data: UpdateTonePromptRequest): Promise<TonePrompt> => {
    const response = await api.axios.put<ApiSuccessResponse<{ tonePrompt: TonePrompt }>>(
      '/v1/admin/prompt-versions/temporary-version/tone-prompts',
      data,
    );
    return extractData(response).tonePrompt;
  },

  // Persona Prompts
  getPersonaPrompt: async (personaPromptId: string): Promise<PersonaPrompt> => {
    const response = await api.axios.get<ApiSuccessResponse<{ personaPrompt: PersonaPrompt }>>(
      `/v1/admin/persona-prompts/${personaPromptId}`,
    );
    return extractData(response).personaPrompt;
  },

  getPersonaPrompts: async (params: GetPersonaPromptsParams): Promise<PersonaPrompt[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ personaPrompts: PersonaPrompt[] }>>('/v1/admin/persona-prompts', {
      params,
    });
    return extractData(response).personaPrompts;
  },

  updatePersonaPrompt: async (data: UpdatePersonaPromptRequest): Promise<PersonaPrompt> => {
    const response = await api.axios.put<ApiSuccessResponse<{ personaPrompt: PersonaPrompt }>>(
      '/v1/admin/prompt-versions/temporary-version/persona-prompts',
      data,
    );
    return extractData(response).personaPrompt;
  },

  // Counsel Techniques
  getCounselTechnique: async (counselTechniqueId: string): Promise<CounselTechnique> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counselTechnique: CounselTechnique }>>(
      `/v1/admin/counsel-techniques/${counselTechniqueId}`,
    );
    return extractData(response).counselTechnique;
  },

  getCounselTechniques: async (params: GetCounselTechniquesParams): Promise<CounselTechnique[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counselTechniques: CounselTechnique[] }>>(
      '/v1/admin/counsel-techniques',
      { params },
    );
    return extractData(response).counselTechniques;
  },

  createCounselTechnique: async (data: CreateCounselTechniqueRequest): Promise<CounselTechnique> => {
    const response = await api.axios.post<ApiSuccessResponse<{ counselTechnique: CounselTechnique }>>(
      '/v1/admin/prompt-versions/temporary-version/counsel-techniques',
      data,
    );
    return extractData(response).counselTechnique;
  },

  updateCounselTechnique: async (
    counselTechniqueId: string,
    data: UpdateCounselTechniqueRequest,
  ): Promise<CounselTechnique[]> => {
    const response = await api.axios.put<ApiSuccessResponse<{ counselTechniques: CounselTechnique[] }>>(
      `/v1/admin/prompt-versions/temporary-version/counsel-techniques/${counselTechniqueId}`,
      data,
    );
    return extractData(response).counselTechniques;
  },

  saveCounselTechniqueSequence: async (data: SaveSequenceRequest): Promise<void> => {
    await api.axios.put('/v1/admin/prompt-versions/temporary-version/counsel-techniques/sequence', data);
  },

  // Counsel Technique Transition Rules
  getCounselTechniqueTransitionRule: async (
    transitionRuleId: string,
  ): Promise<CounselTechniqueTransitionRule> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counselTechniqueTransitionRule: CounselTechniqueTransitionRule }>>(
      `/v1/admin/counsel-techniques/transition-rules/${transitionRuleId}`,
    );
    return extractData(response).counselTechniqueTransitionRule;
  },

  getCounselTechniqueTransitionRules: async (
    params?: GetCounselTechniqueTransitionRulesParams,
  ): Promise<CounselTechniqueTransitionRule[]> => {
    const response = await api.axios.get<ApiSuccessResponse<{ counselTechniqueTransitionRules: CounselTechniqueTransitionRule[] }>>(
      '/v1/admin/counsel-techniques/transition-rules',
      { params },
    );
    return extractData(response).counselTechniqueTransitionRules;
  },

  createCounselTechniqueTransitionRule: async (
    data: CreateCounselTechniqueTransitionRuleRequest,
  ): Promise<CounselTechniqueTransitionRule> => {
    const response = await api.axios.post<ApiSuccessResponse<{ counselTechniqueTransitionRule: CounselTechniqueTransitionRule }>>(
      '/v1/admin/counsel-techniques/transition-rules',
      data,
    );
    return extractData(response).counselTechniqueTransitionRule;
  },

  updateCounselTechniqueTransitionRule: async (
    transitionRuleId: string,
    data: UpdateCounselTechniqueTransitionRuleRequest,
  ): Promise<CounselTechniqueTransitionRule> => {
    const response = await api.axios.put<ApiSuccessResponse<{ counselTechniqueTransitionRule: CounselTechniqueTransitionRule }>>(
      `/v1/admin/counsel-techniques/transition-rules/${transitionRuleId}`,
      data,
    );
    return extractData(response).counselTechniqueTransitionRule;
  },

  deleteCounselTechniqueTransitionRule: async (transitionRuleId: string): Promise<boolean> => {
    const response = await api.axios.delete<ApiSuccessResponse<{ success: boolean }>>(
      `/v1/admin/counsel-techniques/transition-rules/${transitionRuleId}`,
    );
    return extractData(response).success;
  },
};

