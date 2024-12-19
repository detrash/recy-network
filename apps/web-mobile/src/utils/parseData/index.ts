import type { AxiosResponse } from 'axios';

import type { ApiResponse } from '@/entities/response';

export default function parseResponseData<T extends object>(
  response: AxiosResponse<ApiResponse<T>> | AxiosResponse<T>
): T {
  if (typeof response.data === `object` && `data` in response.data) {
    return response.data.data;
  }

  return response.data;
}
