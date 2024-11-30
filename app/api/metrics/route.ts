import { getMetrics } from "@/services/fetch-metric-data";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<any> {
  try {
    const metrics = await getMetrics();

    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
