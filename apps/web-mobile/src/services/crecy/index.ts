import parseData from '@/utils/parseData';
import { useQuery } from '@tanstack/react-query';
import { userTokenPriceKey } from './keys';
import { TokenPriceResponse } from './types';
import axios from 'axios';

export const useGetTokenPrice = () => {
  return useQuery({
    queryKey: userTokenPriceKey(),
    queryFn: async () => {
      const response = await axios.get<TokenPriceResponse>(
        `https://api.geckoterminal.com/api/v2/simple/networks/celo/token_price/0x34C11A932853Ae24E845Ad4B633E3cEf91afE583`
      );
      return parseData(response);
    },
  });
};
