import { fetchCoinbaseMarketData, getAssetPrice } from '@/services/api-service/api-service';
import { MarketData, Metrics } from '@/types/metrics-type';

export const getMarketData = async (): Promise<MarketData> => {
  const marketData = await fetchCoinbaseMarketData();

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
