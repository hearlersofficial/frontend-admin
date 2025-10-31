import { api } from '~/api';
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

export const promptsService = {
  // Prompt Versions
  getPromptVersion: async (promptVersionId: string): Promise<PromptVersion> => {
    const response = await api.axios.get(`/v1/admin/prompt-versions/${promptVersionId}`);
    return response.data.data.promptVersion;
  },

  getPromptVersions: async (params?: GetPromptVersionsParams): Promise<PromptVersion[]> => {
    const response = await api.axios.get('/v1/admin/prompt-versions', { params });
    return response.data.data.promptVersions;
  },

  getTemporaryVersion: async (): Promise<PromptVersion> => {
    const response = await api.axios.get('/v1/admin/prompt-versions/temporary-version');
    return response.data.data.promptVersion;
  },

  getActiveVersion: async (): Promise<PromptVersion> => {
    const response = await api.axios.get('/v1/admin/prompt-versions/active-version');
    return response.data.data.promptVersion;
  },

  saveVersion: async (data: SaveVersionRequest): Promise<PromptVersion> => {
    const response = await api.axios.put('/v1/admin/prompt-versions/temporary-version', data);
    return response.data.data.promptVersion;
  },

  loadPromptVersion: async (promptVersionId: string): Promise<PromptVersion> => {
    const response = await api.axios.put(
      `/v1/admin/prompt-versions/temporary-version/${promptVersionId}`,
    );
    return response.data.data.promptVersion;
  },

  updatePromptVersion: async (
    promptVersionId: string,
    data: PromptVersionRequest,
  ): Promise<PromptVersion> => {
    const response = await api.axios.put(`/v1/admin/prompt-versions/${promptVersionId}`, data);
    return response.data.data.promptVersion;
  },

  deletePromptVersion: async (promptVersionId: string): Promise<boolean> => {
    const response = await api.axios.delete(`/v1/admin/prompt-versions/${promptVersionId}`);
    return response.data.data.isSuccess;
  },

  activatePromptVersion: async (promptVersionId: string): Promise<PromptVersion> => {
    const response = await api.axios.post(`/v1/admin/prompt-versions/${promptVersionId}/activate`);
    return response.data.data.promptVersion;
  },

  getPromptActivateHistories: async (
    params?: GetPromptActivateHistoriesParams,
  ): Promise<PromptActivateHistory[]> => {
    const response = await api.axios.get('/v1/admin/prompt-activate-histories', { params });
    return response.data.data.promptActivateHistories;
  },

  // Tone Prompts
  getTonePrompt: async (tonePromptId: string): Promise<TonePrompt> => {
    const response = await api.axios.get(`/v1/admin/tone-prompts/${tonePromptId}`);
    return response.data.data.tonePrompt;
  },

  getTonePrompts: async (params: GetTonePromptsParams): Promise<TonePrompt[]> => {
    const response = await api.axios.get('/v1/admin/tone-prompts', { params });
    return response.data.data.tonePrompts;
  },

  updateTonePrompt: async (data: UpdateTonePromptRequest): Promise<TonePrompt> => {
    const response = await api.axios.put('/v1/admin/prompt-versions/temporary-version/tone-prompts', data);
    return response.data.data.tonePrompt;
  },

  // Persona Prompts
  getPersonaPrompt: async (personaPromptId: string): Promise<PersonaPrompt> => {
    const response = await api.axios.get(`/v1/admin/persona-prompts/${personaPromptId}`);
    return response.data.data.personaPrompt;
  },

  getPersonaPrompts: async (params: GetPersonaPromptsParams): Promise<PersonaPrompt[]> => {
    const response = await api.axios.get('/v1/admin/persona-prompts', { params });
    return response.data.data.personaPrompts;
  },

  updatePersonaPrompt: async (data: UpdatePersonaPromptRequest): Promise<PersonaPrompt> => {
    const response = await api.axios.put(
      '/v1/admin/prompt-versions/temporary-version/persona-prompts',
      data,
    );
    return response.data.data.personaPrompt;
  },

  // Counsel Techniques
  getCounselTechnique: async (counselTechniqueId: string): Promise<CounselTechnique> => {
    const response = await api.axios.get(`/v1/admin/counsel-techniques/${counselTechniqueId}`);
    return response.data.data.counselTechnique;
  },

  getCounselTechniques: async (params: GetCounselTechniquesParams): Promise<CounselTechnique[]> => {
    const response = await api.axios.get('/v1/admin/counsel-techniques', { params });
    return response.data.data.counselTechniques;
  },

  createCounselTechnique: async (data: CreateCounselTechniqueRequest): Promise<CounselTechnique[]> => {
    const response = await api.axios.post(
      '/v1/admin/prompt-versions/temporary-version/counsel-techniques',
      data,
    );
    return response.data.data.counselTechniques;
  },

  updateCounselTechnique: async (
    counselTechniqueId: string,
    data: UpdateCounselTechniqueRequest,
  ): Promise<CounselTechnique[]> => {
    const response = await api.axios.put(
      `/v1/admin/prompt-versions/temporary-version/counsel-techniques/${counselTechniqueId}`,
      data,
    );
    return response.data.data.counselTechniques;
  },

  saveCounselTechniqueSequence: async (data: SaveSequenceRequest): Promise<void> => {
    await api.axios.put('/v1/admin/prompt-versions/temporary-version/counsel-techniques/sequence', data);
  },

  // Counsel Technique Transition Rules
  getCounselTechniqueTransitionRule: async (
    transitionRuleId: string,
  ): Promise<CounselTechniqueTransitionRule> => {
    const response = await api.axios.get(
      `/v1/admin/counsel-techniques/transition-rules/${transitionRuleId}`,
    );
    return response.data.data.counselTechniqueTransitionRule;
  },

  getCounselTechniqueTransitionRules: async (
    params?: GetCounselTechniqueTransitionRulesParams,
  ): Promise<CounselTechniqueTransitionRule[]> => {
    const response = await api.axios.get('/v1/admin/counsel-techniques/transition-rules', { params });
    return response.data.data.counselTechniqueTransitionRules;
  },

  createCounselTechniqueTransitionRule: async (
    data: CreateCounselTechniqueTransitionRuleRequest,
  ): Promise<CounselTechniqueTransitionRule> => {
    const response = await api.axios.post(
      '/v1/admin/counsel-techniques/transition-rules',
      data,
    );
    return response.data.data.counselTechniqueTransitionRule;
  },

  updateCounselTechniqueTransitionRule: async (
    transitionRuleId: string,
    data: UpdateCounselTechniqueTransitionRuleRequest,
  ): Promise<CounselTechniqueTransitionRule> => {
    const response = await api.axios.put(
      `/v1/admin/counsel-techniques/transition-rules/${transitionRuleId}`,
      data,
    );
    return response.data.data.counselTechniqueTransitionRule;
  },

  deleteCounselTechniqueTransitionRule: async (transitionRuleId: string): Promise<boolean> => {
    const response = await api.axios.delete(
      `/v1/admin/counsel-techniques/transition-rules/${transitionRuleId}`,
    );
    return response.data.data.isSuccess;
  },
};

