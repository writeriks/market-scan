import { fetchFundingRates } from '@/services/api-service/api-service';
import { BinanceFundingRate, FundingRate } from '@/types/funding-rate-type';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') ?? '';

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

    const btcBinanceFundingRates = await getBinanceLastTwoFundingRatesForSymbol(symbol);

    const response = btcBinanceFundingRates;

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
