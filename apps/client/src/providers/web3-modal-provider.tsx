import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import type { State } from 'wagmi';
import { WagmiProvider } from 'wagmi';

import { projectId, wagmiConfig } from '@/libs/wagmi';

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  enableAnalytics: true,
  // Optional - defaults to your Cloud configuration
  enableOnramp: true,

  projectId,
  // Optional - false as default
  wagmiConfig,
});

export function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
