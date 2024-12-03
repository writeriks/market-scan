import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  try {
    const response = await fetch('https://api.mexc.com/api/v3/ticker/24hr');
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.error();
  }
}
