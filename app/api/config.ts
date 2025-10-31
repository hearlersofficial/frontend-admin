import { AxiosRequestConfig } from "axios";


const isLocal = import.meta.env.VITE_ENVIRONMENT === 'local';
const baseURL = isLocal ? '/api' : import.meta.env.VITE_API_URL;

// NOTE: fetch 설정은 실제로는 안들어가고 있었어서 지웠습니다.
// Axios 기반 설정 (Swagger Typescript API 생성물은 Axios 사용)
const baseConfig: AxiosRequestConfig = { baseURL, withCredentials: true };

export { baseURL, baseConfig };

