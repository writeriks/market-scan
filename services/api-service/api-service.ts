import { AssetPrice } from '@/types/asset-type';
import { CoinMarketCapitalData } from '@/types/coin-marketcap-types';
import { FearAndGreed } from '@/types/fear-and-greed';

/**
 * Utility function to fetch data from a given URL.
 * @param url - The endpoint to fetch data from.
 * @param headers - Optional headers for the request.
 * @param payload - Optional payload for POST/PUT requests.
 * @returns A Promise resolving to the response object.
 */
export const fetchUrl = async (
  url: string,
  headers: Record<string, string> = {},
  payload?: Record<string, any>
): Promise<Response> => {
  try {
    const options: RequestInit = {
      method: payload ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : undefined,
      cache: 'no-store',
    };

    const response = await fetch(url, options);

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch metrics');
  }
};

/**
 * Fetches the price of a specific asset by ticker symbol.
 * @param ticker - The asset's ticker symbol.
 * @returns A Promise resolving to the asset price.
 */
export const getAssetPrice = async (ticker: string): Promise<AssetPrice> => {
  const url = `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${ticker.toUpperCase()}USDT`;
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches the latest Fear and Greed Index.
 * @returns A Promise resolving to the Fear and Greed Index data.
 */
export const getFearAndGreedIndex = async (): Promise<FearAndGreed> => {
  const url = 'https://api.alternative.me/fng/?limit=1';
  const response = await fetchUrl(url);
  const data = await response.json();
  return data.data[0];
};

/**
 * Fetches prices for all assets.
 * @returns A Promise resolving to a list of asset prices.
 */
export const fetchAllAssetsPrices = async (): Promise<any[]> => {
  const url = '/api/get-all-assets';
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches the price for a specific asset by symbol.
 * @param symbol - The symbol of the asset.
 * @returns A Promise resolving to the price of the specified asset.
 */
export const fetchPriceForAsset = async (symbol: string): Promise<any[]> => {
  const url = `/api/get-price-for-asset?symbol=${symbol.toUpperCase()}`;
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches global market data from CoinMarketCap.
 * @returns A Promise resolving to the market data.
 */
export const fetchMarketData = async (): Promise<CoinMarketCapitalData> => {
  const url = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';
  const headers = {
    'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || '',
  };
  const response = await fetchUrl(url, headers);
  const { data } = await response.json();
  return data;
};

/**
 * Fetches funding rates from a specified URL.
 * @param url - The endpoint to fetch funding rates from.
 * @returns A Promise resolving to a list of funding rates.
 */
export const fetchFundingRates = async (url: string): Promise<any[]> => {
  const response = await fetchUrl(url);
  return response.json();
};
