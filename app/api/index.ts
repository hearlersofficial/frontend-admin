import { V1 } from '~/__generated__/V1';

const fetchWithCredentials: typeof fetch = (input, init) => {
  return fetch(input, {
    ...init,
    credentials: 'include',
  });
};

// const baseURL = 'https://api.dev.hearlers.com';

const isLocal = import.meta.env.VITE_ENVIRONMENT === 'local';
const baseURL = isLocal
  ? '/api' // 브라우저 -> vite 프록시 경유
  : 'https://api.dev.hearlers.com'; // 서버

const baseConfig = { baseURL, fetch: fetchWithCredentials, withCredentials: true };

export const api = {
  V1: new V1(baseConfig),
} as const;
