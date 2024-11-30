import { FearAndGreed } from "@/types/fear-and-greed";

export type Metrics = {
  fearAndGreed: FearAndGreed;
  btcDominance: Dominance;
  ethDominance: Dominance;
  stableCoinMarketCap: StableCoinMarketCap;
  defiData: DefiData;
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

export type DefiData = {
  marketCap: string;
  volume: string;
  change: string;
};

export type MarketData = {
  btcDominance: Dominance;
  ethDominance: Dominance;
  stableCoinMarketCap: StableCoinMarketCap;
  defiData: DefiData;
};
