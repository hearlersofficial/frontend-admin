import { V1 } from '~/__generated__/V1';

const baseURL = 'https://api.dev.hearlers.com';
const baseConfig = { baseURL };

export const api = {
  V1: new V1(baseConfig),
} as const;
