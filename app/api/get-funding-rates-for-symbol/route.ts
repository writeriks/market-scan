import { fetchUrl } from '@/services/api-service/api-service';
import {
  BinanceFundingRate,
  BybitFundingRateResponse,
  FundingRate,
} from '@/types/funding-rate-type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') ?? '';

    // GET Binance funding rate
    const binanceFundingRateUrl = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol.toUpperCase()}USDT&limit=2`;
    const binanceResponse = await fetchUrl(binanceFundingRateUrl);
    const binanceFundingRateResponse: BinanceFundingRate[] = await binanceResponse.json();

    // GET Bybit funding rate
    const bybitFundingRateUrl = `https://api.bybit.com/v5/market/funding/history?category=linear&symbol=${symbol.toUpperCase()}USDT&limit=2`;
    const bybitResponse = await fetchUrl(bybitFundingRateUrl);
    const bybitFundingRateResponse: BybitFundingRateResponse = await bybitResponse.json();
    const fundingRates = bybitFundingRateResponse.result.list;

    const binanceFundingRate: FundingRate = {
      exchange: 'Binance',
      symbol: binanceFundingRateResponse[1].symbol,
      fundingTime: binanceFundingRateResponse[1].fundingTime,
      fundingRate: binanceFundingRateResponse[1].fundingRate,
      percentageChange: (
        ((Number(binanceFundingRateResponse[1].fundingRate) -
          Number(binanceFundingRateResponse[0].fundingRate)) /
          Number(binanceFundingRateResponse[0].fundingRate)) *
        100
      ).toFixed(2),
    };

    const bybitFundingRate: FundingRate = {
      exchange: 'Bybit',
      symbol: fundingRates[0].symbol,
      fundingTime: Number(fundingRates[0].fundingRateTimestamp),
      fundingRate: fundingRates[0].fundingRate,
      percentageChange: (
        ((Number(fundingRates[0].fundingRate) - Number(fundingRates[1].fundingRate)) /
          Number(fundingRates[1].fundingRate)) *
        100
      ).toFixed(2),
    };

    return NextResponse.json([binanceFundingRate, bybitFundingRate]);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
