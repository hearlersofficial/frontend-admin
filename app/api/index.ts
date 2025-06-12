import { V1 } from '~/__generated__/V1';

const fetchWithCredentials: typeof fetch = (input, init) => {
  return fetch(input, {
    ...init,
    credentials: 'include',
  });
};

const baseURL = 'https://api.dev.hearlers.com';
const baseConfig = { baseURL, fetch: fetchWithCredentials };

export const api = {
  V1: new V1(baseConfig),
} as const;
