import { fetchUrl } from '@/services/api-service/api-service';
import { calculatePercentageChange } from '@/services/util-service/util-service';
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
    const binanceFundingRateUrl = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol.toUpperCase()}&limit=2`;
    const binanceResponse = await fetchUrl(binanceFundingRateUrl);
    const binanceFundingRateResponse: BinanceFundingRate[] = await binanceResponse.json();
    console.log('🚀 ~ GET ~ binanceFundingRateResponse:', binanceFundingRateResponse);

    // GET Bybit funding rate
    const bybitFundingRateUrl = `https://api.bybit.com/v5/market/funding/history?category=linear&symbol=${symbol.toUpperCase()}&limit=2`;
    const bybitResponse = await fetchUrl(bybitFundingRateUrl);
    const bybitFundingRateResponse: BybitFundingRateResponse = await bybitResponse.json();
    const bybitFundingRates = bybitFundingRateResponse.result.list;

    let binanceFundingRate: FundingRate = {
      exchange: 'Binance',
      symbol: '',
      fundingTime: 0,
      fundingRate: '',
      percentageChange: '',
    };
    if (binanceFundingRateResponse.length) {
      binanceFundingRate = {
        ...binanceFundingRate,
        symbol: binanceFundingRateResponse[1].symbol,
        fundingTime: binanceFundingRateResponse[1].fundingTime,
        fundingRate: binanceFundingRateResponse[1].fundingRate,
        percentageChange: calculatePercentageChange(
          Number(binanceFundingRateResponse[1].fundingRate),
          Number(binanceFundingRateResponse[0].fundingRate)
        ).toFixed(2),
      };
    }

    let bybitFundingRate: FundingRate = {
      exchange: 'Bybit',
      symbol: '',
      fundingTime: 0,
      fundingRate: '',
      percentageChange: '',
    };
    if (bybitFundingRates.length) {
      bybitFundingRate = {
        ...bybitFundingRate,
        symbol: bybitFundingRates[0].symbol,
        fundingTime: Number(bybitFundingRates[0].fundingRateTimestamp),
        fundingRate: bybitFundingRates[0].fundingRate,
        percentageChange: calculatePercentageChange(
          Number(bybitFundingRates[0].fundingRate),
          Number(bybitFundingRates[1].fundingRate)
        ).toFixed(2),
      };
    }

    return NextResponse.json([binanceFundingRate, bybitFundingRate]);
  } catch {
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
