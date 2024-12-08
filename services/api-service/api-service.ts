import {
  AssetDetail,
  AssetDetailResponse,
  MexcAssetInfo,
  MexcAssetPrice,
} from '@/types/asset-type';
import { CoinMarketCapitalData } from '@/types/coin-marketcap-types';
import { FearAndGreed } from '@/types/fear-and-greed';
import { FundingRate } from '@/types/funding-rate-type';
import { MarketData } from '@/types/metrics-type';

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
    const options = {
      method: payload ? 'POST' : 'GET',
      headers: {
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    };

    const response = await fetch(url, options);

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch metrics');
  }
};

/**
 * Fetches the latest Fear and Greed Index.
 * @returns A Promise resolving to the Fear and Greed Index data.
 */
export const getFearAndGreedIndex = async (): Promise<FearAndGreed> => {
  const url = 'https://api.alternative.me/fng/';
  const response = await fetchUrl(url);
  const data = await response.json();
  return data.data[0];
};

export const getAssetDetails = async (symbol: string): Promise<AssetDetailResponse> => {
  const headers = {
    'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || '',
  };
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol.toUpperCase()}`;
  const response = await fetchUrl(url, headers);
  return response.json();
};

export const fetchAssetDetails = async (symbol: string): Promise<AssetDetail> => {
  const url = `/api/get-asset-details?symbol=${symbol}`;
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches the price of a specific asset by ticker symbol.
 * @param ticker - The asset's ticker symbol.
 * @returns A Promise resolving to the asset price.
 */
export const getAssetPrice = async (ticker: string): Promise<MexcAssetPrice> => {
  // https://fapi.binance.com/fapi/v1/ticker/price https://api.mexc.com/api/v3/ticker/24hr?symbol=BTCUSDT
  const url = `https://api.mexc.com/api/v3/ticker/price?symbol=${ticker.toUpperCase()}`;
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches the price of a specific asset by ticker symbol.
 * @param ticker - The asset's ticker symbol.
 * @returns A Promise resolving to the asset price.
 */
export const getAllMexcAssetInfo = async (): Promise<MexcAssetInfo[]> => {
  // https://fapi.binance.com/fapi/v1/ticker/price https://api.mexc.com/api/v3/ticker/24hr?symbol=BTCUSDT
  const url = `https://api.mexc.com/api/v3/ticker/24hr`;
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches the price of a specific asset by ticker symbol.
 * @param ticker - The asset's ticker symbol.
 * @returns A Promise resolving to the asset price.
 */
export const getMexcAssetInfo = async (ticker: string): Promise<MexcAssetInfo> => {
  // https://fapi.binance.com/fapi/v1/ticker/price https://api.mexc.com/api/v3/ticker/24hr?symbol=BTCUSDT
  const url = `https://api.mexc.com/api/v3/ticker/24hr?symbol=${ticker.toUpperCase()}`;
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetch all assets prices.
 * @returns A Promise resolving to a list of all assets prices.
 */
export const fetchAllAssetsPrices = async (): Promise<MexcAssetInfo[]> => {
  const url = '/api/get-all-assets';
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches all metrics.
 * @returns A Promise resolving to a list of metrics.
 */
export const fetchAllMetrics = async (): Promise<MarketData[]> => {
  const url = '/api/get-metrics';
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches the price for a specific asset by symbol.
 * @param symbol - The symbol of the asset.
 * @returns A Promise resolving to the price of the specified asset.
 */
export const fetchPriceForAsset = async (symbol: string): Promise<MexcAssetInfo> => {
  const url = `/api/get-price-for-asset?symbol=${symbol.toUpperCase()}`;
  const response = await fetchUrl(url);
  return response.json();
};

/**
 * Fetches global market data from CoinMarketCap.
 * @returns A Promise resolving to the market data.
 */
export const fetchCoinbaseMarketData = async (): Promise<CoinMarketCapitalData> => {
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

/**
 * Fetches the funding rate for a specific asset.
 * @param symbol - The asset's symbol.
 * @returns A Promise resolving to the asset's funding rate.
 */
export const getFundingRateForAsset = async (symbol: string): Promise<FundingRate[]> => {
  const fundingRate = await fetchUrl(`/api/get-funding-rates-for-symbol?symbol=${symbol}`);
  return fundingRate.json();
};
