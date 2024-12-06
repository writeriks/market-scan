export type AssetPrice = {
  symbol: string;
  price: string;
  time: number;
};

export type MexcAssetInfo = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  prevClosePrice: string;
  lastPrice: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  count: number | null;
};

export type MexcAssetPrice = {
  symbol: string;
  price: string;
};

type Tag = {
  slug: string;
  name: string;
  category: string;
};

type Quote = {
  [currency: string]: {
    price: number;
    volume_24h: number;
    volume_change_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    tvl: number | null;
    last_updated: string;
  };
};

export type AssetDetail = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: Tag[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  is_active: number;
  infinite_supply: boolean;
  platform: string | null;
  cmc_rank: number;
  is_fiat: number;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  tvl_ratio: number | null;
  last_updated: string;
  quote: Quote;
};

export type AssetDetailResponse = {
  data: {
    [symbol: string]: AssetDetail[];
  };
};
