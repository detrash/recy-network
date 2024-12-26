import { useAccount, useBalance } from 'wagmi';

const CRECY_TOKEN_ADDRESS = '0x34C11A932853Ae24E845Ad4B633E3cEf91afE583';

export const useCrecy = () => {
  const { address } = useAccount();

  const balance = useBalance({
    address,
    token: CRECY_TOKEN_ADDRESS,
  });

  return {
    ...balance,
  };
};
