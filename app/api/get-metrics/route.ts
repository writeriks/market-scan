import {
  fetchCoinbaseMarketData,
  getMexcAssetInfo,
  getAssetPrice,
  getFearAndGreedIndex,
} from '@/services/api-service/api-service';
import { formatCurrency, formatLargeNumber } from '@/services/util-service/util-service';
import { MetricNames } from '@/types/metrics-type';
import { NextResponse } from 'next/server';

export async function GET(): Promise<any> {
  try {
    const fearAndGreedIndex = await getFearAndGreedIndex();
    const coinbaseData = await fetchCoinbaseMarketData();

    const btcPrice = await getAssetPrice('BTCUSDT');
    const btcInfo = await getMexcAssetInfo('BTCUSDT');

    const ethPrice = await getAssetPrice('ETHUSDT');
    const ethInfo = await getMexcAssetInfo('ETHUSDT');

    const metrics = [
      {
        name: MetricNames.FEAR_AND_GREED,
        value: fearAndGreedIndex.value,
      },

      {
        name: MetricNames.BTC_DOMINANCE,
        value: coinbaseData.btc_dominance.toFixed(2),
        change: coinbaseData.btc_dominance_24h_percentage_change,
        volume: formatLargeNumber(Number(btcInfo.quoteVolume)),
        price: formatCurrency(Number(btcPrice.price)),
      },
      {
        name: MetricNames.ETH_DOMINANCE,
        value: coinbaseData.eth_dominance.toFixed(2),
        change: coinbaseData.eth_dominance_24h_percentage_change,
        volume: formatLargeNumber(Number(ethInfo.quoteVolume)),
        price: formatCurrency(Number(ethPrice.price)),
      },
      {
        name: MetricNames.STABLE_COIN_MARKET_CAP,
        value: formatCurrency(Number(coinbaseData.stablecoin_market_cap.toFixed(2))),
        change: coinbaseData.stablecoin_24h_percentage_change,
      },

      {
        name: MetricNames.DEFI_MARKET_CAP,
        value: formatCurrency(Number(coinbaseData.defi_market_cap.toFixed(2))),
        volume: formatCurrency(Number(coinbaseData.defi_volume_24h.toFixed(2))),
        change: coinbaseData.defi_24h_percentage_change,
      },

      {
        name: MetricNames.TOTAL_MARKET_CAP,
        value: formatCurrency(Number(coinbaseData.quote.USD.total_market_cap.toFixed(2))),
        volume: formatCurrency(Number(coinbaseData.quote.USD.total_volume_24h.toFixed(2))),
        change:
          (coinbaseData.quote.USD.total_market_cap * 100) /
            coinbaseData.quote.USD.total_market_cap_yesterday -
          100,
      },

      {
        name: MetricNames.ALTCOIN_MARKET_CAP,
        value: formatCurrency(Number(coinbaseData.quote.USD.altcoin_market_cap.toFixed(2))),
        volume: formatCurrency(Number(coinbaseData.quote.USD.altcoin_volume_24h.toFixed(2))),
      },
    ];

    return NextResponse.json(metrics);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
