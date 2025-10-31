import axios from 'axios';
import { V1 } from '~/__generated__/V1';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseConfig, baseURL } from './config';

const AUTH_REFRESH_PATH = '/v1/auth/refresh';
const REFRESH_TIMEOUT_MS = 10000;
const REFRESH_COOLDOWN_MS = 15000; // refresh 실패 시 재시도 유예 시간

let refreshInFlight: Promise<void> | null = null;
let refreshDisabledUntil = 0;

const isRefreshRequest = (url?: string): boolean => !!url && url.includes(AUTH_REFRESH_PATH);

const doRefresh = async (v1Instance: V1['instance']): Promise<void> => {
  // 회로 차단기: 실패 직후 일정 시간 동안 재시도 금지
  if (Date.now() < refreshDisabledUntil) throw new Error('refresh_cooldown');
  const resp = await v1Instance.post(AUTH_REFRESH_PATH, undefined, {
    timeout: REFRESH_TIMEOUT_MS,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  if (resp.status !== 200) throw new Error('refresh_failed');
};

// V1 인스턴스 생성 + 401 자동 refresh 인터셉터
const v1 = new V1(baseConfig);

v1.instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const responseStatus = error.response?.status;
    const requestConfig = error.config as (AxiosRequestConfig & { __isRetry?: boolean }) | undefined;
    const requestUrl = requestConfig?.url;

    // 재귀/루프 방지 및 조건 확인
    if (
      !responseStatus ||
      responseStatus !== 401 ||
      !requestConfig ||
      isRefreshRequest(requestUrl) ||
      requestConfig.__isRetry
    ) {
      return Promise.reject(error);
    }

    // 단일 비행: 하나의 refresh만 수행. 바로 직전 실패로 쿨다운 중이면 스킵
    if (!refreshInFlight) {
      refreshInFlight = doRefresh(v1.instance)
        .catch((e) => {
          // 실패 시 쿨다운 활성화
          refreshDisabledUntil = Date.now() + REFRESH_COOLDOWN_MS;
          throw e;
        })
        .finally(() => {
          refreshInFlight = null;
        });
    }

    try {
      await refreshInFlight;
    } catch {
      return Promise.reject(error);
    }

    // 원 요청 1회만 재시도
    requestConfig.__isRetry = true;
    return v1.instance.request(requestConfig);
  }
);

// 일반 axios 인스턴스 (generated 의존성 없음)
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { v1, axiosInstance };

