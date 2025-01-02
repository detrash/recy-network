import { useAccount, useBalance } from 'wagmi';
import { useGetTokenPrice } from '@/services/crecy';
import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

const CRECY_TOKEN_ADDRESS = '0x34C11A932853Ae24E845Ad4B633E3cEf91afE583' as `0x${string}`;

export const useCrecy = () => {
  const { address } = useAccount();

  // Fetch token balance
  const balance = useBalance({
    address,
    token: CRECY_TOKEN_ADDRESS,
  });

  // Fetch token price
  const { data: tokenPriceData, error: errorFetchingTokenPrice } = useGetTokenPrice();

  const tokenPrices = tokenPriceData?.attributes?.token_prices ?? {};
  const tokenPrice = tokenPrices[CRECY_TOKEN_ADDRESS.toLowerCase()];

  const numericTokenPrice = tokenPrice ? Number(tokenPrice) : NaN;

  const formattedTokenPrice = !isNaN(numericTokenPrice)
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numericTokenPrice)
    : '-';

  // Handle balance error with useEffect
  useEffect(() => {
    if (balance.error) {
      toast({
        variant: 'destructive',
        title: balance.error.name,
        description: balance.error.message,
      });
    }
  }, [balance.error]);

  // Handle token price error with useEffect
  useEffect(() => {
    if (errorFetchingTokenPrice) {
      toast({
        variant: 'destructive',
        title: errorFetchingTokenPrice.name,
        description: errorFetchingTokenPrice.message,
      });
    }
  }, [errorFetchingTokenPrice]);

  return {
    ...balance,
    formattedTokenPrice,
    tokenPriceError: errorFetchingTokenPrice,
  };
};
