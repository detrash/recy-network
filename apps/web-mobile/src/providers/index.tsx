import type { PropsWithChildren } from 'react';

import { AuthProvider } from './auth-provider';
import { Web3ModalProvider } from './web3-modal-provider';
import { QueryClientProvider } from './query-client-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <QueryClientProvider>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
