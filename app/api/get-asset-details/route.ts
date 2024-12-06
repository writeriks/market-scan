import { getAssetDetails } from '@/services/api-service/api-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') ?? '';
    console.log('🚀 ~ GET ~ symbol:', symbol);

    if (!symbol) {
      return NextResponse.json({
        status: 400,
        statusText: JSON.stringify('Symbol not found'),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    const symbolWithoutUSDT = symbol.replace('USDT', '');

    const assetDetails = await getAssetDetails(symbolWithoutUSDT);
    console.log('🚀 ~ GET ~ assetDetails:', assetDetails);

    return NextResponse.json(assetDetails.data[symbolWithoutUSDT][0]);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
