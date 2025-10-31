import { z } from 'zod';

// Counsel Message
export const counselMessageSchema = z.object({
  id: z.string(),
  counselId: z.string(),
  message: z.string(),
  isUserMessage: z.boolean(),
  reactedAt: z.string().nullable(),
  reaction: z
    .enum([
      'COUNSEL_MESSAGE_REACTION_UNSPECIFIED',
      'COUNSEL_MESSAGE_REACTION_LIKE',
      'COUNSEL_MESSAGE_REACTION_DISLIKE',
      'UNRECOGNIZED',
    ])
    .nullable()
    .nullable(),
  counselTechniqueId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export type CounselMessage = z.infer<typeof counselMessageSchema>;

// Counsel
export const counselSchema = z.object({
  id: z.string(),
  counselorId: z.string(),
  userId: z.string(),
  lastMessage: z.string().nullable(),
  lastChatedAt: z.string().nullable(),
  promptVersionId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export type Counsel = z.infer<typeof counselSchema>;

// Create Counsel Request
export const createCounselRequestSchema = z.object({
  bubbleId: z.string().nullable(),
  responseOptionNo: z.number().nullable(),
  promptVersionId: z.string(),
});

export type CreateCounselRequest = z.infer<typeof createCounselRequestSchema>;

// Get Counsels Params
export const getCounselsParamsSchema = z.object({
  userId: z.string().nullable(),
  counselorId: z.string().nullable(),
});

export type GetCounselsParams = z.infer<typeof getCounselsParamsSchema>;

// Create Message Request
export const createMessageRequestSchema = z.object({
  message: z.string(),
});

export type CreateMessageRequest = z.infer<typeof createMessageRequestSchema>;

// Create Message Response
export const createMessageResponseSchema = z.object({
  createdCounselMessage: counselMessageSchema,
  counselorResponseMessage: counselMessageSchema,
});

export type CreateMessageResponse = z.infer<typeof createMessageResponseSchema>;

// React Message Request
export const reactMessageRequestSchema = z.object({
  reaction: z.enum([
    'COUNSEL_MESSAGE_REACTION_UNSPECIFIED',
    'COUNSEL_MESSAGE_REACTION_LIKE',
    'COUNSEL_MESSAGE_REACTION_DISLIKE',
    'UNRECOGNIZED',
  ]),
});

export type ReactMessageRequest = z.infer<typeof reactMessageRequestSchema>;

// React Message Response
export const reactMessageResponseSchema = z.object({
  counselMessage: counselMessageSchema,
});

export type ReactMessageResponse = z.infer<typeof reactMessageResponseSchema>;

// Counselor User Relationship
export const counselorUserRelationshipSchema = z.object({
  id: z.string(),
  counselorId: z.string(),
  userId: z.string(),
  rapport: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export type CounselorUserRelationship = z.infer<typeof counselorUserRelationshipSchema>;

// Get Counselor User Relationships Params
export const getCounselorUserRelationshipsParamsSchema = z.object({
  userId: z.string().nullable(),
});

export type GetCounselorUserRelationshipsParams = z.infer<
  typeof getCounselorUserRelationshipsParamsSchema
>;

