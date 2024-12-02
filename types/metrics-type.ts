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
  btcDominance: Dominance;
  ethDominance: Dominance;
  stableCoinMarketCap: StableCoinMarketCap;
  defiData: DefiMarketCap;
  totalMarketCap: TotalMarketCap;
  altcoinData: AltcoinData;
};
