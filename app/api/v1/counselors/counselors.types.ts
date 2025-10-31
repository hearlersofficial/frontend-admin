import { z } from 'zod';

// Tone
export const toneSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type Tone = z.infer<typeof toneSchema>;

// Create Tone Request
export const createToneRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateToneRequest = z.infer<typeof createToneRequestSchema>;

// Update Tone Request
export const updateToneRequestSchema = z.object({
  toneId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateToneRequest = z.infer<typeof updateToneRequestSchema>;

// Get Tones Params
export const getTonesParamsSchema = z.object({
  name: z.string().optional(),
});

export type GetTonesParams = z.infer<typeof getTonesParamsSchema>;

// Counselor
export const counselorSchema = z.object({
  id: z.string(),
  toneId: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  gender: z.enum([
    'COUNSELOR_GENDER_UNSPECIFIED',
    'COUNSELOR_GENDER_MALE',
    'COUNSELOR_GENDER_FEMALE',
    'COUNSELOR_GENDER_NONE',
    'UNRECOGNIZED',
  ]),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type Counselor = z.infer<typeof counselorSchema>;

// Create Counselor Request
export const createCounselorRequestSchema = z.object({
  toneId: z.string(),
  name: z.string(),
  description: z.string(),
  profileImage: z.string(),
  gender: z.enum([
    'COUNSELOR_GENDER_UNSPECIFIED',
    'COUNSELOR_GENDER_MALE',
    'COUNSELOR_GENDER_FEMALE',
    'COUNSELOR_GENDER_NONE',
    'UNRECOGNIZED',
  ]),
});

export type CreateCounselorRequest = z.infer<typeof createCounselorRequestSchema>;

// Update Counselor Request
export const updateCounselorRequestSchema = z.object({
  toneId: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  profileImage: z.string().optional(),
  gender: z
    .enum([
      'COUNSELOR_GENDER_UNSPECIFIED',
      'COUNSELOR_GENDER_MALE',
      'COUNSELOR_GENDER_FEMALE',
      'COUNSELOR_GENDER_NONE',
      'UNRECOGNIZED',
    ])
    .optional(),
});

export type UpdateCounselorRequest = z.infer<typeof updateCounselorRequestSchema>;

// Get Counselors Params
export const getCounselorsParamsSchema = z.object({
  'tone-id': z.string().optional(),
});

export type GetCounselorsParams = z.infer<typeof getCounselorsParamsSchema>;

// Episode Cut Scene
export const episodeCutSceneSchema = z.object({
  id: z.string(),
  episodeId: z.string(),
  speaker: z.enum(['SPEAKER_UNSPECIFIED', 'SPEAKER_COUNSELOR', 'SPEAKER_USER', 'UNRECOGNIZED']),
  content: z.string(),
  orderIndex: z.number(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type EpisodeCutScene = z.infer<typeof episodeCutSceneSchema>;

// Episode
export const episodeSchema = z.object({
  id: z.string(),
  counselorId: z.string(),
  title: z.string(),
  requiredRapportThreshold: z.number(),
  isTemporary: z.boolean(),
  cutScenes: z.array(episodeCutSceneSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type Episode = z.infer<typeof episodeSchema>;

// Save Episode Cut Scene Request
export const saveEpisodeCutSceneRequestSchema = z.object({
  id: z.string().optional(),
  speaker: z.enum(['SPEAKER_UNSPECIFIED', 'SPEAKER_COUNSELOR', 'SPEAKER_USER', 'UNRECOGNIZED']),
  content: z.string(),
  orderIndex: z.number(),
  image: z.string(),
});

export type SaveEpisodeCutSceneRequest = z.infer<typeof saveEpisodeCutSceneRequestSchema>;

// Create Episode Cut Scene Request
export const createEpisodeCutSceneRequestSchema = z.object({
  speaker: z.enum(['SPEAKER_UNSPECIFIED', 'SPEAKER_COUNSELOR', 'SPEAKER_USER', 'UNRECOGNIZED']),
  content: z.string(),
  orderIndex: z.number(),
  image: z.string(),
});

export type CreateEpisodeCutSceneRequest = z.infer<typeof createEpisodeCutSceneRequestSchema>;

// Create Episode Request
export const createEpisodeRequestSchema = z.object({
  title: z.string(),
  requiredRapportThreshold: z.number(),
  isTemporary: z.boolean(),
  cutScenes: z.array(createEpisodeCutSceneRequestSchema),
});

export type CreateEpisodeRequest = z.infer<typeof createEpisodeRequestSchema>;

// Update Episode Request
export const updateEpisodeRequestSchema = z.object({
  title: z.string().optional(),
  requiredRapportThreshold: z.number().optional(),
  isTemporary: z.boolean().optional(),
  cutScenes: z.array(saveEpisodeCutSceneRequestSchema).optional(),
});

export type UpdateEpisodeRequest = z.infer<typeof updateEpisodeRequestSchema>;

// Generate Image URL Request
export const generateImageUrlRequestSchema = z.object({
  extension: z.enum([
    'EXTENSION_UNSPECIFIED',
    'EXTENSION_JPG',
    'EXTENSION_PNG',
    'EXTENSION_GIF',
    'EXTENSION_WEBP',
    'UNRECOGNIZED',
  ]),
});

export type GenerateImageUrlRequest = z.infer<typeof generateImageUrlRequestSchema>;

// Presigned URL Response
export const presignedUrlResponseSchema = z.object({
  uploadUrl: z.string(),
  publicUrl: z.string(),
  expiresAt: z.string(),
});

export type PresignedUrlResponse = z.infer<typeof presignedUrlResponseSchema>;

// Bubble
export const bubbleSchema = z.object({
  id: z.string(),
  question: z.string(),
  responseOption1: z.string(),
  responseOption2: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type Bubble = z.infer<typeof bubbleSchema>;

// Create Bubble Request
export const createBubbleRequestSchema = z.object({
  question: z.string(),
  responseOption1: z.string(),
  responseOption2: z.string(),
});

export type CreateBubbleRequest = z.infer<typeof createBubbleRequestSchema>;

// Update Bubble Request
export const updateBubbleRequestSchema = z.object({
  question: z.string().optional(),
  responseOption1: z.string().optional(),
  responseOption2: z.string().optional(),
});

export type UpdateBubbleRequest = z.infer<typeof updateBubbleRequestSchema>;

