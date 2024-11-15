import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import type { State } from 'wagmi';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Get projectId at https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

if (!projectId) throw new Error('WalletConnect Project ID is not defined');

const metadata = {
  name: 'Recy Network',
  description:
    'Recy Network is a solution of recycling and composting for humanity to live in a world free of waste in nature!',
  url: 'https://v2.app.recy.life',
  icons: ['https://raw.githubusercontent.com/detrash/recy-app-legacy/main/public/recy-logo.png'],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;

const config = defaultWagmiConfig({
  chains,
  metadata,
  projectId,
});

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  enableAnalytics: true,
  // Optional - defaults to your Cloud configuration
  enableOnramp: true,
  projectId,
  wagmiConfig: config,
});

export function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
