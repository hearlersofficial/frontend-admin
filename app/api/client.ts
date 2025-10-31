import axios from 'axios';

import { baseURL } from './config';


// 일반 axios 인스턴스 (generated 의존성 없음)
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { axiosInstance };

