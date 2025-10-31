import { z } from 'zod';

// User Profile
export const userProfileSchema = z.object({
  profileImage: z.string().optional().nullable(),
  gender: z.enum(['GENDER_UNSPECIFIED', 'GENDER_MALE', 'GENDER_FEMALE', 'UNRECOGNIZED']).optional(),
  mbti: z
    .enum([
      'MBTI_UNSPECIFIED',
      'MBTI_ENTP',
      'MBTI_ENFP',
      'MBTI_ENTJ',
      'MBTI_ENFJ',
      'MBTI_ESTP',
      'MBTI_ESTJ',
      'MBTI_ESFP',
      'MBTI_ESFJ',
      'MBTI_INTJ',
      'MBTI_INFJ',
      'MBTI_INTP',
      'MBTI_INFP',
      'MBTI_ISTP',
      'MBTI_ISTJ',
      'MBTI_ISFP',
      'MBTI_ISFJ',
      'UNRECOGNIZED',
    ])
    .optional(),
  birthday: z.string().optional().nullable(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// User
export const userSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  userProfile: userProfileSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type User = z.infer<typeof userSchema>;

// User Tracking
export const userTrackingSchema = z.object({
  hasSeenIntroCutscene: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional().nullable(),
});

export type UserTracking = z.infer<typeof userTrackingSchema>;

