import { AssetPrice } from '@/types/asset-type';
import { CoinMarketCapitalData } from '@/types/coin-marketcap-types';
import { FearAndGreed } from '@/types/fear-and-greed';

export const fetchUrl = async (url: string, headers?: {}, payload?: {}): Promise<Response> => {
  try {
    const options: RequestInit = {
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
      next: { revalidate: 60 },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    throw new Error('Failed to fetch metrics', error);
  }
};

export const getAssetPrice = async (ticker: string): Promise<AssetPrice> => {
  const response = await fetchUrl(
    `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${ticker.toUpperCase()}USDT`
  );

  return response.json();
};

export const getFearAndGreedIndex = async (): Promise<FearAndGreed> => {
  const response = await fetchUrl('https://api.alternative.me/fng/?limit=1');

  const data = await response.json();
  return data.data[0];
};

export const fetchAllAssetsPrices = async (): Promise<any[]> => {
  const response = await fetchUrl('/api/get-all-assets');
  return response.json();
};

export const fetchPriceForAsset = async (symbol: string): Promise<any[]> => {
  const response = await fetchUrl(`/api/get-price-for-asset?symbol=${symbol.toUpperCase()}`);
  return response.json();
};

export const fetchMarketData = async (): Promise<CoinMarketCapitalData> => {
  const headers = { 'X-CMC_PRO_API_KEY': `${process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY}` };

  const response = await fetchUrl(
    'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest',
    headers
  );
  const { data } = await response.json();
  return data;
};

export const fetchFundingRates = async (url: string): Promise<any[]> => {
  const response = await fetchUrl(url);
  return response.json();
};
