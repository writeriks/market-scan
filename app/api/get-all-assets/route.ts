import { getAllMexcAssetInfo } from '@/services/api-service/api-service';
import { NextResponse } from 'next/server';

export async function GET(): Promise<any> {
  try {
    const response = await getAllMexcAssetInfo();

    const usdtResponse = response.filter(asset => asset.symbol.includes('USDT'));

    return NextResponse.json(usdtResponse);
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      statusText: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
