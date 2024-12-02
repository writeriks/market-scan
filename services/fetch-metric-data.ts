import {
  fetchFundingRates,
  fetchMarketData,
  getAssetPrice,
  getFearAndGreedIndex,
} from '@/services/api-service/api-service';
import { BinanceFundingRate, FundingRate } from '@/types/funding-rate-type';
import { MarketData, Metrics } from '@/types/metrics-type';

const getBinanceLastTwoFundingRatesForSymbol = async (symbol: string): Promise<FundingRate> => {
  const url = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol.toUpperCase()}USDT&limit=2`;
  const fundingRates: BinanceFundingRate[] = await fetchFundingRates(url);

  return {
    exchange: 'Binance',
    symbol: fundingRates[1].symbol,
    fundingTime: fundingRates[1].fundingTime,
    fundingRate: fundingRates[1].fundingRate,
    percentageChange: (
      ((Number(fundingRates[1].fundingRate) - Number(fundingRates[0].fundingRate)) /
        Number(fundingRates[0].fundingRate)) *
      100
    ).toFixed(2),
  };
};

const getMarketData = async (): Promise<MarketData> => {
  const marketData = await fetchMarketData();

  const btcPrice = await getAssetPrice('btc');
  const ethPrice = await getAssetPrice('eth');

  const btcDominance = {
    name: 'BTC Dominance',
    value: marketData.btc_dominance.toFixed(2),
    change: marketData.btc_dominance_24h_percentage_change.toFixed(2),
    price: btcPrice.price,
  };
  const ethDominance = {
    name: 'ETH Dominance',
    value: marketData.eth_dominance.toFixed(2),
    change: marketData.eth_dominance_24h_percentage_change.toFixed(2),
    price: ethPrice.price,
  };
  const stableCoinMarketCap = {
    name: 'Satble Coin Market Cap',
    value: marketData.stablecoin_market_cap.toFixed(2),
    change: marketData.stablecoin_24h_percentage_change.toFixed(2),
  };

  const defiData = {
    name: 'Defi Market Cap',
    value: marketData.defi_market_cap.toFixed(2),
    volume: marketData.defi_volume_24h.toFixed(2),
    change: marketData.defi_24h_percentage_change.toFixed(2),
  };

  const totalMarketCap = {
    name: 'Total Market Cap',
    value: marketData.quote.USD.total_market_cap.toFixed(2),
    volume: marketData.quote.USD.total_volume_24h.toFixed(2),
    change: (
      (marketData.quote.USD.total_market_cap * 100) /
        marketData.quote.USD.total_market_cap_yesterday -
      100
    ).toFixed(2),
  };
  const altcoinData = {
    name: 'Altcoin Market Cap',
    value: marketData.quote.USD.altcoin_market_cap.toFixed(2),
    volume: marketData.quote.USD.altcoin_volume_24h.toFixed(2),
  };

  return {
    btcDominance,
    ethDominance,
    stableCoinMarketCap,
    defiData,
    totalMarketCap,
    altcoinData,
  };
};

export const getFundingRates = async (): Promise<FundingRate[]> => {
  const btcBinanceFundingRates = await getBinanceLastTwoFundingRatesForSymbol('btc');
  const ethBinanceFundingRates = await getBinanceLastTwoFundingRatesForSymbol('eth');

  return [btcBinanceFundingRates, ethBinanceFundingRates];
};

export const getMetrics = async (): Promise<Metrics | undefined> => {
  try {
    const fearAndGreed = await getFearAndGreedIndex();
    const marketData = await getMarketData();
    const fundingRates = await getFundingRates();

    return { fearAndGreed, ...marketData, fundingRates };
  } catch (e) {
    console.error(e);
  }
};
