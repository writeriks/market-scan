import {
  fetchCoinbaseMarketData,
  getAssetPrice,
  getFearAndGreedIndex,
} from '@/services/api-service/api-service';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const fearAndGreed = await getFearAndGreedIndex();
    const coinbaseData = await fetchCoinbaseMarketData();

    const btcPrice = await getAssetPrice('btc');
    console.log('🚀 ~ GET ~ btcPrice:', btcPrice);
    const ethPrice = await getAssetPrice('eth');

    const btcDominance = {
      name: 'BTC Dominance',
      value: coinbaseData.btc_dominance.toFixed(2),
      change: coinbaseData.btc_dominance_24h_percentage_change.toFixed(2),
      price: btcPrice.lastPrice,
    };
    const ethDominance = {
      name: 'ETH Dominance',
      value: coinbaseData.eth_dominance.toFixed(2),
      change: coinbaseData.eth_dominance_24h_percentage_change.toFixed(2),
      price: ethPrice.lastPrice,
    };
    const stableCoinMarketCap = {
      name: 'Satble Coin Market Cap',
      value: coinbaseData.stablecoin_market_cap.toFixed(2),
      change: coinbaseData.stablecoin_24h_percentage_change.toFixed(2),
    };

    const defiData = {
      name: 'Defi Market Cap',
      value: coinbaseData.defi_market_cap.toFixed(2),
      volume: coinbaseData.defi_volume_24h.toFixed(2),
      change: coinbaseData.defi_24h_percentage_change.toFixed(2),
    };

    const totalMarketCap = {
      name: 'Total Market Cap',
      value: coinbaseData.quote.USD.total_market_cap.toFixed(2),
      volume: coinbaseData.quote.USD.total_volume_24h.toFixed(2),
      change: (
        (coinbaseData.quote.USD.total_market_cap * 100) /
          coinbaseData.quote.USD.total_market_cap_yesterday -
        100
      ).toFixed(2),
    };
    const altcoinData = {
      name: 'Altcoin Market Cap',
      value: coinbaseData.quote.USD.altcoin_market_cap.toFixed(2),
      volume: coinbaseData.quote.USD.altcoin_volume_24h.toFixed(2),
    };

    const response = {
      fearAndGreed,
      btcDominance,
      ethDominance,
      stableCoinMarketCap,
      defiData,
      totalMarketCap,
      altcoinData,
    };

    return NextResponse.json({ status: 200, ...response });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
