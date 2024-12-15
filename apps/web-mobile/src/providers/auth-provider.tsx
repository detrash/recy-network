import type { PropsWithChildren } from 'react';

import { Auth0Provider } from '@auth0/auth0-react';

export function AuthProvider({ children }: PropsWithChildren) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_ISSUER_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: import.meta.env.VITE_AUTH0_SCOPE,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
