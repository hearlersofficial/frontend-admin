import { v1, axiosInstance } from './client';
import { baseURL, baseConfig } from './config';

export { baseURL, baseConfig };

export const api = {
  V1: v1,
  axios: axiosInstance,
} as const;
