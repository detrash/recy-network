import type { PropsWithChildren } from 'react';

import { AuthProvider } from './auth-provider';
import { Web3ModalProvider } from './web3-modal-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <Web3ModalProvider>{children}</Web3ModalProvider>
    </AuthProvider>
  );
}
