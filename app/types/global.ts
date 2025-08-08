declare global {
  interface Window {
    ENV?: {
      API_URL?: string;
      BASE_URL?: string;
      ENVIRONMENT?: string;
    };
  }
}

export {};
