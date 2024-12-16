import axios from 'axios';

import { GetTokenSilentlyOptions, GetTokenSilentlyVerboseResponse } from '@auth0/auth0-spa-js';

interface GetAccessTokenSilently {
  (options: GetTokenSilentlyOptions & { detailedResponse: true }): Promise<GetTokenSilentlyVerboseResponse>;
  (options?: GetTokenSilentlyOptions): Promise<string>;
  (options: GetTokenSilentlyOptions): Promise<GetTokenSilentlyVerboseResponse | string>;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? '/api',
});

// adds access tokens in all api requests
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
export const addAccessTokenInterceptor = (getAccessTokenSilently: GetAccessTokenSilently) => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
