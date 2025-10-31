import type { AxiosResponse } from 'axios';
import type { ApiSuccessResponse } from './response.types';

/**
 * API 응답에서 data를 추출하는 헬퍼 함수
 */
export const extractData = <TData>(response: AxiosResponse<ApiSuccessResponse<TData>>): TData => {
  return response.data.data;
};

/**
 * API 응답 전체를 반환하는 헬퍼 함수
 */
export const extractResponse = <TData>(
  response: AxiosResponse<ApiSuccessResponse<TData>>,
): ApiSuccessResponse<TData> => {
  return response.data;
};

