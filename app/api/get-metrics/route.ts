import { getMetrics } from '@/services/fetch-metric-data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const response = await getMetrics();

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.error();
  }
}
