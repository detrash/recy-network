import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Get projectId at https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

if (!projectId) throw new Error('WalletConnect Project ID is not defined');

const metadata = {
  description: 'Web3Modal Example',
  // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],

  name: 'Web3Modal',
  url: 'https://web3modal.com',
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;

export const wagmiConfig = defaultWagmiConfig({
  chains,
  enableEmail: true,
  metadata,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
