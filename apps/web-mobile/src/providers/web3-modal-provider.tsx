import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { WagmiProvider } from 'wagmi';
import { mainnet, Chain } from 'wagmi/chains';
import React from 'react';

const celoChain: Chain = {
  id: 42220,
  name: 'Celo',
  nativeCurrency: {
    decimals: 18,
    name: 'Celo',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: { http: ['https://forno.celo.org/'] },
  },
  blockExplorers: {
    default: { name: 'Celo Explorer', url: 'https://explorer.celo.org/' },
  },
  testnet: false,
};

// 1. Get projectId from https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

if (!projectId) throw new Error('WalletConnect Project ID is not defined');

// 2. Create wagmiConfig
const metadata = {
  name: 'Recy Network',
  description:
    'Recy Network is a solution of recycling and composting for humanity to live in a world free of waste in nature!',
  url: 'https://app.recy.life', // origin must match your domain & subdomain
  icons: ['https://raw.githubusercontent.com/detrash/recy-app-legacy/main/public/recy-logo.png'],
};

const chains = [mainnet, celoChain] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function Web3ModalProvider({ children }: React.PropsWithChildren) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
