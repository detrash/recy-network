import type { WithAuth0Props } from '@auth0/auth0-react';

import { apiV1 } from '@/libs/axios';

export interface GetSDKAccessTokenParameters {
  levelName?: string;
  ttlInSecs?: number;
}

const defaultGetSDKAccessTokenParameters: Partial<GetSDKAccessTokenParameters> = {
  levelName: 'basic-kyc-level',
  ttlInSecs: 600,
};

export async function getSDKAccessToken({
  auth0,
  ...parameters
}: GetSDKAccessTokenParameters & WithAuth0Props): Promise<string> {
  const newParameters: GetSDKAccessTokenParameters = {
    ...defaultGetSDKAccessTokenParameters,
    ...parameters,
  };
  const {
    data: { token },
  } = await apiV1.post<{ token: string }>('/sumsub/get-access-token', newParameters, {
    fetchOptions: { auth0 },
  });

  return token;
}
