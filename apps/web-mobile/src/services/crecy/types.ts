export interface TokenPriceResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      token_prices: {
        [tokenAddress: string]: string;
      };
    };
  };
}
