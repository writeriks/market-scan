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

export type BybitFundingRateResponse = {
  result: {
    category: string;
    list: BybitFundingRate[];
  };
  time: number;
};

export type BybitFundingRate = {
  symbol: string;
  fundingRate: string;
  fundingRateTimestamp: string;
};
