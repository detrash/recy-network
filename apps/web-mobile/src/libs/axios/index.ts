import axios from 'axios';
import { setupInterceptors } from './interceptors';

export const apiV1 = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/v1/`,
  timeout: 30000,
  headers: {
    'Content-Type': `application/json`,
  },
});

setupInterceptors(apiV1);
