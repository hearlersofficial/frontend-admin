import { z } from 'zod';

// Prompt Version
export const promptVersionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  isTemporary: z.boolean(),
  isBookmarked: z.boolean(),
  aiModel: z.enum([
    'AI_MODEL_UNSPECIFIED',
    'AI_MODEL_GPT_3_5_TURBO',
    'AI_MODEL_GPT_4',
    'AI_MODEL_GPT_4O',
    'AI_MODEL_GPT_4O_MINI',
    'AI_MODEL_GPT_5_MINI',
    'AI_MODEL_GPT_5',
    'AI_MODEL_GPT_5_CHAT',
    'AI_MODEL_GEMINI_2_5_FLASH',
    'AI_MODEL_GEMINI_2_5_PRO',
    'UNRECOGNIZED',
  ]),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type PromptVersion = z.infer<typeof promptVersionSchema>;

// Create/Update Prompt Version Request
export const promptVersionRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  isBookmarked: z.boolean(),
  aiModel: z.enum([
    'AI_MODEL_UNSPECIFIED',
    'AI_MODEL_GPT_3_5_TURBO',
    'AI_MODEL_GPT_4',
    'AI_MODEL_GPT_4O',
    'AI_MODEL_GPT_4O_MINI',
    'AI_MODEL_GPT_5_MINI',
    'AI_MODEL_GPT_5',
    'AI_MODEL_GPT_5_CHAT',
    'AI_MODEL_GEMINI_2_5_FLASH',
    'AI_MODEL_GEMINI_2_5_PRO',
    'UNRECOGNIZED',
  ]),
});

export type PromptVersionRequest = z.infer<typeof promptVersionRequestSchema>;

// Get Prompt Versions Params
export const getPromptVersionsParamsSchema = z.object({
  name: z.string().optional(),
});

export type GetPromptVersionsParams = z.infer<typeof getPromptVersionsParamsSchema>;

// Tone Prompt
export const tonePromptSchema = z.object({
  id: z.string(),
  promptVersionId: z.string(),
  body: z.string(),
  toneId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type TonePrompt = z.infer<typeof tonePromptSchema>;

// Update Tone Prompt Request
export const updateTonePromptRequestSchema = z.object({
  toneId: z.string(),
  body: z.string(),
});

export type UpdateTonePromptRequest = z.infer<typeof updateTonePromptRequestSchema>;

// Get Tone Prompts Params
export const getTonePromptsParamsSchema = z.object({
  promptVersionId: z.string(),
  toneId: z.string(),
});

export type GetTonePromptsParams = z.infer<typeof getTonePromptsParamsSchema>;

// Persona Prompt
export const personaPromptSchema = z.object({
  id: z.string(),
  promptVersionId: z.string(),
  body: z.string(),
  counselorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type PersonaPrompt = z.infer<typeof personaPromptSchema>;

// Update Persona Prompt Request
export const updatePersonaPromptRequestSchema = z.object({
  counselorId: z.string(),
  body: z.string(),
});

export type UpdatePersonaPromptRequest = z.infer<typeof updatePersonaPromptRequestSchema>;

// Get Persona Prompts Params
export const getPersonaPromptsParamsSchema = z.object({
  promptVersionId: z.string(),
  counselorId: z.string(),
});

export type GetPersonaPromptsParams = z.infer<typeof getPersonaPromptsParamsSchema>;

// Counsel Technique
export const counselTechniqueSchema = z.object({
  id: z.string(),
  promptVersionId: z.string(),
  name: z.string(),
  toneId: z.string(),
  context: z.string(),
  instruction: z.string(),
  isStartTechnique: z.boolean(),
  temperature: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type CounselTechnique = z.infer<typeof counselTechniqueSchema>;

// Create Counsel Technique Request
export const createCounselTechniqueRequestSchema = z.object({
  name: z.string(),
  toneId: z.string(),
  context: z.string(),
  instruction: z.string(),
  temperature: z.number(),
  isStartTechnique: z.boolean(),
});

export type CreateCounselTechniqueRequest = z.infer<typeof createCounselTechniqueRequestSchema>;

// Update Counsel Technique Request
export const updateCounselTechniqueRequestSchema = z.object({
  name: z.string(),
  context: z.string(),
  instruction: z.string(),
  temperature: z.number(),
  isStartTechnique: z.boolean(),
});

export type UpdateCounselTechniqueRequest = z.infer<typeof updateCounselTechniqueRequestSchema>;

// Get Counsel Techniques Params
export const getCounselTechniquesParamsSchema = z.object({
  promptVersionId: z.string(),
  toneId: z.string().optional(),
});

export type GetCounselTechniquesParams = z.infer<typeof getCounselTechniquesParamsSchema>;

// Counsel Technique Transition Rule
export const counselTechniqueTransitionRuleSchema = z.object({
  id: z.string(),
  promptVersionId: z.string(),
  fromCounselTechniqueId: z.string(),
  toCounselTechniqueId: z.string(),
  priority: z.number(),
  minCurrentTechniqueMessageCount: z.number().optional().nullable(),
  maxCurrentTechniqueMessageCount: z.number().optional().nullable(),
  requiredImpactDomains: z
    .enum([
      'IMPACT_DOMAIN_UNSPECIFIED',
      'IMPACT_DOMAIN_WORK',
      'IMPACT_DOMAIN_STUDY',
      'IMPACT_DOMAIN_RELATIONSHIP',
      'IMPACT_DOMAIN_FAMILY',
      'IMPACT_DOMAIN_HEALTH',
      'IMPACT_DOMAIN_FINANCE',
      'IMPACT_DOMAIN_SELF',
      'IMPACT_DOMAIN_OTHER',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredTimeframes: z
    .enum([
      'TIMEFRAME_UNSPECIFIED',
      'TIMEFRAME_TODAY',
      'TIMEFRAME_THIS_WEEK',
      'TIMEFRAME_THIS_MONTH',
      'TIMEFRAME_THIS_YEAR',
      'TIMEFRAME_LONGER',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredEmotionPrimaries: z
    .enum([
      'EMOTION_PRIMARY_UNSPECIFIED',
      'EMOTION_PRIMARY_ANXIETY',
      'EMOTION_PRIMARY_SADNESS',
      'EMOTION_PRIMARY_ANGER',
      'EMOTION_PRIMARY_LONELINESS',
      'EMOTION_PRIMARY_GUILT',
      'EMOTION_PRIMARY_SHAME',
      'EMOTION_PRIMARY_STRESS',
      'EMOTION_PRIMARY_HOPE',
      'EMOTION_PRIMARY_CALM',
      'EMOTION_PRIMARY_OTHER',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredValences: z
    .enum(['VALENCE_UNSPECIFIED', 'VALENCE_NEGATIVE', 'VALENCE_NEUTRAL', 'VALENCE_POSITIVE', 'UNRECOGNIZED'])
    .array(),
  requiredArousalLevels: z
    .enum(['AROUSAL_LEVEL_UNSPECIFIED', 'AROUSAL_LEVEL_LOW', 'AROUSAL_LEVEL_MEDIUM', 'AROUSAL_LEVEL_HIGH', 'UNRECOGNIZED'])
    .array(),
  minEmotionIntensity: z.number().optional().nullable(),
  maxEmotionIntensity: z.number().optional().nullable(),
  requiredPerceivedControls: z
    .enum([
      'PERCEIVED_CONTROL_UNSPECIFIED',
      'PERCEIVED_CONTROL_LOW',
      'PERCEIVED_CONTROL_MEDIUM',
      'PERCEIVED_CONTROL_HIGH',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredMotivationStages: z
    .enum([
      'MOTIVATION_STAGE_UNSPECIFIED',
      'MOTIVATION_STAGE_PRECONTEMPLATION',
      'MOTIVATION_STAGE_CONTEMPLATION',
      'MOTIVATION_STAGE_PREPARATION',
      'MOTIVATION_STAGE_ACTION',
      'MOTIVATION_STAGE_MAINTENANCE',
      'UNRECOGNIZED',
    ])
    .array(),
  minSelfEfficacy: z.number().optional().nullable(),
  maxSelfEfficacy: z.number().optional().nullable(),
  requiredSocialSupportLevels: z
    .enum([
      'SOCIAL_SUPPORT_LEVEL_UNSPECIFIED',
      'SOCIAL_SUPPORT_LEVEL_NONE',
      'SOCIAL_SUPPORT_LEVEL_LOW',
      'SOCIAL_SUPPORT_LEVEL_MEDIUM',
      'SOCIAL_SUPPORT_LEVEL_HIGH',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredRiskKinds: z
    .enum([
      'RISK_KIND_UNSPECIFIED',
      'RISK_KIND_NONE',
      'RISK_KIND_SELF_HARM',
      'RISK_KIND_HARM_TO_OTHERS',
      'RISK_KIND_ABUSE',
      'UNRECOGNIZED',
    ])
    .array(),
  minRiskSeverity: z.number().optional().nullable(),
  maxRiskSeverity: z.number().optional().nullable(),
  requiredSleepQualities: z
    .enum(['SLEEP_QUALITY_UNSPECIFIED', 'SLEEP_QUALITY_POOR', 'SLEEP_QUALITY_FAIR', 'SLEEP_QUALITY_GOOD', 'UNRECOGNIZED'])
    .array(),
  requiredPhysicalSymptomsPresent: z.boolean().optional().nullable(),
  requiredCognitiveLoads: z
    .enum(['COGNITIVE_LOAD_UNSPECIFIED', 'COGNITIVE_LOAD_LOW', 'COGNITIVE_LOAD_MEDIUM', 'COGNITIVE_LOAD_HIGH', 'UNRECOGNIZED'])
    .array(),
  requiredAllianceStrengths: z
    .enum([
      'ALLIANCE_STRENGTH_UNSPECIFIED',
      'ALLIANCE_STRENGTH_WEAK',
      'ALLIANCE_STRENGTH_MEDIUM',
      'ALLIANCE_STRENGTH_STRONG',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredConsentToDepth: z.boolean().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type CounselTechniqueTransitionRule = z.infer<typeof counselTechniqueTransitionRuleSchema>;

// Create Counsel Technique Transition Rule Request
export const createCounselTechniqueTransitionRuleRequestSchema = z.object({
  fromCounselTechniqueId: z.string(),
  toCounselTechniqueId: z.string(),
  priority: z.number(),
  minCurrentTechniqueMessageCount: z.number().optional(),
  maxCurrentTechniqueMessageCount: z.number().optional(),
  requiredImpactDomains: z
    .enum([
      'IMPACT_DOMAIN_UNSPECIFIED',
      'IMPACT_DOMAIN_WORK',
      'IMPACT_DOMAIN_STUDY',
      'IMPACT_DOMAIN_RELATIONSHIP',
      'IMPACT_DOMAIN_FAMILY',
      'IMPACT_DOMAIN_HEALTH',
      'IMPACT_DOMAIN_FINANCE',
      'IMPACT_DOMAIN_SELF',
      'IMPACT_DOMAIN_OTHER',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredTimeframes: z
    .enum([
      'TIMEFRAME_UNSPECIFIED',
      'TIMEFRAME_TODAY',
      'TIMEFRAME_THIS_WEEK',
      'TIMEFRAME_THIS_MONTH',
      'TIMEFRAME_THIS_YEAR',
      'TIMEFRAME_LONGER',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredEmotionPrimaries: z
    .enum([
      'EMOTION_PRIMARY_UNSPECIFIED',
      'EMOTION_PRIMARY_ANXIETY',
      'EMOTION_PRIMARY_SADNESS',
      'EMOTION_PRIMARY_ANGER',
      'EMOTION_PRIMARY_LONELINESS',
      'EMOTION_PRIMARY_GUILT',
      'EMOTION_PRIMARY_SHAME',
      'EMOTION_PRIMARY_STRESS',
      'EMOTION_PRIMARY_HOPE',
      'EMOTION_PRIMARY_CALM',
      'EMOTION_PRIMARY_OTHER',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredValences: z
    .enum(['VALENCE_UNSPECIFIED', 'VALENCE_NEGATIVE', 'VALENCE_NEUTRAL', 'VALENCE_POSITIVE', 'UNRECOGNIZED'])
    .array(),
  requiredArousalLevels: z
    .enum(['AROUSAL_LEVEL_UNSPECIFIED', 'AROUSAL_LEVEL_LOW', 'AROUSAL_LEVEL_MEDIUM', 'AROUSAL_LEVEL_HIGH', 'UNRECOGNIZED'])
    .array(),
  minEmotionIntensity: z.number().optional(),
  maxEmotionIntensity: z.number().optional(),
  requiredPerceivedControls: z
    .enum([
      'PERCEIVED_CONTROL_UNSPECIFIED',
      'PERCEIVED_CONTROL_LOW',
      'PERCEIVED_CONTROL_MEDIUM',
      'PERCEIVED_CONTROL_HIGH',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredMotivationStages: z
    .enum([
      'MOTIVATION_STAGE_UNSPECIFIED',
      'MOTIVATION_STAGE_PRECONTEMPLATION',
      'MOTIVATION_STAGE_CONTEMPLATION',
      'MOTIVATION_STAGE_PREPARATION',
      'MOTIVATION_STAGE_ACTION',
      'MOTIVATION_STAGE_MAINTENANCE',
      'UNRECOGNIZED',
    ])
    .array(),
  minSelfEfficacy: z.number().optional(),
  maxSelfEfficacy: z.number().optional(),
  requiredSocialSupportLevels: z
    .enum([
      'SOCIAL_SUPPORT_LEVEL_UNSPECIFIED',
      'SOCIAL_SUPPORT_LEVEL_NONE',
      'SOCIAL_SUPPORT_LEVEL_LOW',
      'SOCIAL_SUPPORT_LEVEL_MEDIUM',
      'SOCIAL_SUPPORT_LEVEL_HIGH',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredRiskKinds: z
    .enum([
      'RISK_KIND_UNSPECIFIED',
      'RISK_KIND_NONE',
      'RISK_KIND_SELF_HARM',
      'RISK_KIND_HARM_TO_OTHERS',
      'RISK_KIND_ABUSE',
      'UNRECOGNIZED',
    ])
    .array(),
  minRiskSeverity: z.number().optional(),
  maxRiskSeverity: z.number().optional(),
  requiredSleepQualities: z
    .enum(['SLEEP_QUALITY_UNSPECIFIED', 'SLEEP_QUALITY_POOR', 'SLEEP_QUALITY_FAIR', 'SLEEP_QUALITY_GOOD', 'UNRECOGNIZED'])
    .array(),
  requiredPhysicalSymptomsPresent: z.boolean().optional(),
  requiredCognitiveLoads: z
    .enum(['COGNITIVE_LOAD_UNSPECIFIED', 'COGNITIVE_LOAD_LOW', 'COGNITIVE_LOAD_MEDIUM', 'COGNITIVE_LOAD_HIGH', 'UNRECOGNIZED'])
    .array(),
  requiredAllianceStrengths: z
    .enum([
      'ALLIANCE_STRENGTH_UNSPECIFIED',
      'ALLIANCE_STRENGTH_WEAK',
      'ALLIANCE_STRENGTH_MEDIUM',
      'ALLIANCE_STRENGTH_STRONG',
      'UNRECOGNIZED',
    ])
    .array(),
  requiredConsentToDepth: z.boolean().optional(),
});

export type CreateCounselTechniqueTransitionRuleRequest = z.infer<
  typeof createCounselTechniqueTransitionRuleRequestSchema
>;

// Update Counsel Technique Transition Rule Request
export const updateCounselTechniqueTransitionRuleRequestSchema = createCounselTechniqueTransitionRuleRequestSchema.omit({
  fromCounselTechniqueId: true,
  toCounselTechniqueId: true,
});

export type UpdateCounselTechniqueTransitionRuleRequest = z.infer<
  typeof updateCounselTechniqueTransitionRuleRequestSchema
>;

// Get Counsel Technique Transition Rules Params
export const getCounselTechniqueTransitionRulesParamsSchema = z.object({
  fromCounselTechniqueId: z.string().optional(),
  toCounselTechniqueId: z.string().optional(),
  promptVersionId: z.string().optional(),
});

export type GetCounselTechniqueTransitionRulesParams = z.infer<
  typeof getCounselTechniqueTransitionRulesParamsSchema
>;

// Prompt Activate History
export const promptActivateHistorySchema = z.object({
  id: z.string(),
  promptVersionId: z.string(),
  activatedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type PromptActivateHistory = z.infer<typeof promptActivateHistorySchema>;

// Get Prompt Activate Histories Params
export const getPromptActivateHistoriesParamsSchema = z.object({
  'prompt-version-id': z.string().optional(),
});

export type GetPromptActivateHistoriesParams = z.infer<typeof getPromptActivateHistoriesParamsSchema>;

// Save Version Request
export const saveVersionRequestSchema = promptVersionRequestSchema;

export type SaveVersionRequest = z.infer<typeof saveVersionRequestSchema>;

// Save Sequence Request
export const saveSequenceRequestSchema = z.object({
  sequence: z
    .object({
      id: z.string(),
      nextTechniqueId: z.string().optional().nullable(),
    })
    .array(),
});

export type SaveSequenceRequest = z.infer<typeof saveSequenceRequestSchema>;

