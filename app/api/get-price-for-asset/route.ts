import { getMexcAssetInfo } from '@/services/api-service/api-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') ?? '';

    if (!symbol) {
      return NextResponse.json({
        status: 400,
        statusText: JSON.stringify('Symbol not found'),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    //    const response = await fetch(`https://api.mexc.com/api/v3/ticker/24hr?symbol=${symbol}USDT`);
    const response = await getMexcAssetInfo(symbol);

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
