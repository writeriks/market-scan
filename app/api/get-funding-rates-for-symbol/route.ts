import { fetchUrl } from '@/services/api-service/api-service';
import { BybitFundingRate, BybitFundingRateResponse, FundingRate } from '@/types/funding-rate-type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') ?? '';

    /* const url = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol.toUpperCase()}USDT&limit=2`; */
    const url = `https://api.bybit.com/v5/market/funding/history?category=linear&symbol=${symbol.toUpperCase()}USDT&limit=2`;
    const response = await fetchUrl(url);
    const bybitFundingRateResponse: BybitFundingRateResponse = await response.json();
    const fundingRates: BybitFundingRate[] = bybitFundingRateResponse.result.list;
    console.log('🚀 ~ GET ~ fundingRates:', fundingRates);

    /* const fundingRate: FundingRate = {
      exchange: 'Binance',
      symbol: fundingRates[1].symbol,
      fundingTime: fundingRates[1].fundingTime,
      fundingRate: fundingRates[1].fundingRate,
      percentageChange: (
        ((Number(fundingRates[1].fundingRate) - Number(fundingRates[0].fundingRate)) /
          Number(fundingRates[0].fundingRate)) *
        100
      ).toFixed(2),
    }; */

    const fundingRate: FundingRate = {
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
    console.log('🚀 ~ GET ~ fundingRate:', fundingRate);

    return NextResponse.json(fundingRate);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
