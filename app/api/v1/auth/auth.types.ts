import { z } from 'zod';

// Token Response
export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  accessTokenExpiresAt: z.string(),
  refreshTokenExpiresAt: z.string(),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>;

// Refresh Token Request (no body)
export const refreshTokenRequestSchema = z.object({});

export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;

// Create User (Initiate) Request (no body)
export const createUserRequestSchema = z.object({});

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;

// Kakao Login Request
export const kakaoLoginRequestSchema = z.object({
  'redirect-url': z.string(),
});

export type KakaoLoginRequest = z.infer<typeof kakaoLoginRequestSchema>;

// Kakao Callback Request
export const kakaoCallbackRequestSchema = z.object({
  code: z.string(),
  state: z.string(),
});

export type KakaoCallbackRequest = z.infer<typeof kakaoCallbackRequestSchema>;

