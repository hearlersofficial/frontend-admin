import { api } from '~/api';
import { extractData } from '../response.util';
import type { TokenResponse, KakaoLoginRequest, KakaoCallbackRequest } from './auth.types';
import { ApiSuccessResponse } from '../response.types';

export const authService = {
  /**
   * 액세스 토큰 재발급
   */
  refreshToken: async (): Promise<TokenResponse> => {
    const response = await api.axios.post<ApiSuccessResponse<TokenResponse>>('/v1/auth/refresh');
    return extractData(response);
  },

  /**
   * 비로그인 유저 생성
   */
  createUser: async (): Promise<TokenResponse> => {
    const response = await api.axios.post<ApiSuccessResponse<TokenResponse>>('/v1/auth/initiate');
    return extractData(response);
  },

  /**
   * 카카오 로그인 요청 (리다이렉트)
   */
  kakaoLogin: (params: KakaoLoginRequest): string => {
    const { 'redirect-url': redirectUrl } = params;
    return `${api.axios.defaults.baseURL}/v1/auth/login/kakao?redirect-url=${encodeURIComponent(redirectUrl)}`;
  },

  /**
   * 카카오 로그인 콜백
   */
  kakaoCallback: async (params: KakaoCallbackRequest): Promise<void> => {
    const { code, state } = params;
    await api.axios.get('/v1/auth/callback/kakao', {
      params: { code, state },
    });
  },
};

