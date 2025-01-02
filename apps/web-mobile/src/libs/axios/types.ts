import { GetTokenSilentlyOptions, GetTokenSilentlyVerboseResponse } from '@auth0/auth0-spa-js';
import type { AxiosError } from 'axios';

export interface AxiosErrorApi {
  Message?: string;
  error?: string[];
  statusCOde: string;
}

export type HandleDispatchSentryEvent = {
  error: AxiosError;
};

export interface GetAccessTokenSilently {
  (options: GetTokenSilentlyOptions & { detailedResponse: true }): Promise<GetTokenSilentlyVerboseResponse>;
  (options?: GetTokenSilentlyOptions): Promise<string>;
  (options: GetTokenSilentlyOptions): Promise<GetTokenSilentlyVerboseResponse | string>;
}
