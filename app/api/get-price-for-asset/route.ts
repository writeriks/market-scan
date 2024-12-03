import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') ?? '';

    const response = await fetch(`https://api.mexc.com/api/v3/ticker/24hr?symbol=${symbol}USDT`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.error();
  }
}
