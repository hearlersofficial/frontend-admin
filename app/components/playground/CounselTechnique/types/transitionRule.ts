import { z } from 'zod';

// Enum 값들
export const EMOTION_PRIMARY_VALUES = [
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
] as const;

export const VALENCE_VALUES = ['VALENCE_NEGATIVE', 'VALENCE_NEUTRAL', 'VALENCE_POSITIVE'] as const;

export const AROUSAL_LEVEL_VALUES = ['AROUSAL_LEVEL_LOW', 'AROUSAL_LEVEL_MEDIUM', 'AROUSAL_LEVEL_HIGH'] as const;

export const IMPACT_DOMAIN_VALUES = [
  'IMPACT_DOMAIN_WORK',
  'IMPACT_DOMAIN_STUDY',
  'IMPACT_DOMAIN_RELATIONSHIP',
  'IMPACT_DOMAIN_FAMILY',
  'IMPACT_DOMAIN_HEALTH',
  'IMPACT_DOMAIN_FINANCE',
  'IMPACT_DOMAIN_SELF',
  'IMPACT_DOMAIN_OTHER',
] as const;

export const TIMEFRAME_VALUES = [
  'TIMEFRAME_TODAY',
  'TIMEFRAME_THIS_WEEK',
  'TIMEFRAME_THIS_MONTH',
  'TIMEFRAME_THIS_YEAR',
  'TIMEFRAME_LONGER',
] as const;

export const PERCEIVED_CONTROL_VALUES = [
  'PERCEIVED_CONTROL_LOW',
  'PERCEIVED_CONTROL_MEDIUM',
  'PERCEIVED_CONTROL_HIGH',
] as const;

export const MOTIVATION_STAGE_VALUES = [
  'MOTIVATION_STAGE_PRECONTEMPLATION',
  'MOTIVATION_STAGE_CONTEMPLATION',
  'MOTIVATION_STAGE_PREPARATION',
  'MOTIVATION_STAGE_ACTION',
  'MOTIVATION_STAGE_MAINTENANCE',
] as const;

// Type 정의
export type EmotionPrimary = (typeof EMOTION_PRIMARY_VALUES)[number];
export type Valence = (typeof VALENCE_VALUES)[number];
export type ArousalLevel = (typeof AROUSAL_LEVEL_VALUES)[number];
export type ImpactDomain = (typeof IMPACT_DOMAIN_VALUES)[number];
export type Timeframe = (typeof TIMEFRAME_VALUES)[number];
export type PerceivedControl = (typeof PERCEIVED_CONTROL_VALUES)[number];
export type MotivationStage = (typeof MOTIVATION_STAGE_VALUES)[number];

// Zod 스키마들
export const emotionPrimarySchema = z.enum(EMOTION_PRIMARY_VALUES);
export const valenceSchema = z.enum(VALENCE_VALUES);
export const arousalLevelSchema = z.enum(AROUSAL_LEVEL_VALUES);
export const impactDomainSchema = z.enum(IMPACT_DOMAIN_VALUES);
export const timeframeSchema = z.enum(TIMEFRAME_VALUES);
export const perceivedControlSchema = z.enum(PERCEIVED_CONTROL_VALUES);
export const motivationStageSchema = z.enum(MOTIVATION_STAGE_VALUES);

// 숫자 필드 스키마들
export const prioritySchema = z.number().int().min(1).max(100);
export const messageCountSchema = z.number().int().min(0).max(100);
export const emotionIntensitySchema = z.number().int().min(1).max(10);
export const selfEfficacySchema = z.number().int().min(1).max(10);

// 배열 스키마들
export const emotionPrimariesArraySchema = z.array(emotionPrimarySchema);
export const valencesArraySchema = z.array(valenceSchema);
export const arousalLevelsArraySchema = z.array(arousalLevelSchema);
export const impactDomainsArraySchema = z.array(impactDomainSchema);
export const timeframesArraySchema = z.array(timeframeSchema);
export const perceivedControlsArraySchema = z.array(perceivedControlSchema);
export const motivationStagesArraySchema = z.array(motivationStageSchema);
