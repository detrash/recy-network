import type { PropsWithChildren } from 'react';

import { Auth0Provider } from '@auth0/auth0-react';

export function AuthProvider({ children }: PropsWithChildren) {
  return (
    <Auth0Provider
      domain="detrash-prod.us.auth0.com"
      clientId="w0B1ZGjTnWjWMKNwQNKPIxx2kDA1s26E"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "detrash-prod-api",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      {children}
    </Auth0Provider>
  );
}

