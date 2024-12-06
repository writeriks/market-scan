import { FearAndGreed } from '@/types/fear-and-greed';
import { FundingRate } from '@/types/funding-rate-type';

export type Metrics = {
  fearAndGreed: FearAndGreed;
  btcDominance: Dominance;
  ethDominance: Dominance;
  stableCoinMarketCap: StableCoinMarketCap;
  defiData: DefiMarketCap;
  totalMarketCap: TotalMarketCap;
  altcoinData: AltcoinData;
  fundingRates?: FundingRate[];
};

export type Dominance = {
  name: string;
  value: string;
  change: string;
  price: string;
};

export type StableCoinMarketCap = {
  name: string;
  value: string;
  change: string;
};

export type DefiMarketCap = {
  name: string;
  value: string;
  volume: string;
  change: string;
};

export type TotalMarketCap = {
  name: string;
  value: string;
  volume: string;
  change: string;
};

export type AltcoinData = {
  name: string;
  value: string;
  volume: string;
};

export type MarketData = {
  name: string;
  value: string;
  change: number;
  price: string;
  volume: string;
};

export enum MetricNames {
  FEAR_AND_GREED = 'Fear And Greed',
  BTC_DOMINANCE = 'BTC Dominance',
  ETH_DOMINANCE = 'ETH Dominance',
  STABLE_COIN_MARKET_CAP = 'Stable Coin Market Cap',
  DEFI_MARKET_CAP = 'Defi Market Cap',
  TOTAL_MARKET_CAP = 'Total Market Cap',
  ALTCOIN_MARKET_CAP = 'Altcoin Market Cap',
}
