export type FundingRate = {
  exchange: string;
  symbol: string;
  fundingTime: number;
  fundingRate: string;
  percentageChange: string;
};
export type BinanceFundingRate = {
  symbol: string;
  fundingTime: number;
  fundingRate: string;
  markPrice: string;
};
