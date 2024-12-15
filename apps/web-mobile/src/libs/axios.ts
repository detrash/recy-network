import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? '/api',
});

// adds access tokens in all api requests
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addAccessTokenInterceptor = (getAccessTokenSilently: any) => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();
    console.log('token', token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
