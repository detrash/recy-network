import { apiV1 } from '.';

import { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import type { AxiosErrorApi, GetAccessTokenSilently } from './types';

const onResponse = (response: AxiosResponse) => response;

const onResponseError = async (error: AxiosError<AxiosErrorApi>): Promise<AxiosError<AxiosErrorApi>> => {
  const status = error.status || error.request?.statusCode;
  const code = error.code;

  if (status === 401 || status === 403 || code === AxiosError.ERR_NETWORK) {
    localStorage.removeItem('@@auth0spajs@@::4RJTAtLfumITEEkSQ2H62j9uIv1J0sah::@@user@@');

    const redirect = (window.location.href = '/');

    return Promise.reject(redirect);
  }

  return Promise.reject(error);
};

const onRequest = async (config: InternalAxiosRequestConfig) => {
  const { headers } = config;

  return { ...config, headers };
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

// adds access tokens in all api requests
// this interceptor is only added when the auth0 instance is ready and exports the getAccessTokenSilently method
export const addAccessTokenInterceptor = (getAccessTokenSilently: GetAccessTokenSilently) => {
  apiV1.interceptors.request.use(
    async (config) => {
      try {
        const token = await getAccessTokenSilently();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          localStorage.removeItem('@@auth0spajs@@::4RJTAtLfumITEEkSQ2H62j9uIv1J0sah::@@user@@');
          window.location.href = '/';
        }

        return config;
      } catch (error) {
        localStorage.removeItem('@@auth0spajs@@::4RJTAtLfumITEEkSQ2H62j9uIv1J0sah::@@user@@');
        window.location.href = '/';
        return Promise.reject(error);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
};
