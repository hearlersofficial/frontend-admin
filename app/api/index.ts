import { axiosInstance } from './client';
import { baseURL, baseConfig } from './config';

export { baseURL, baseConfig };

export const api = {
  axios: axiosInstance,
} as const;
