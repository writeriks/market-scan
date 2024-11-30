"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

const trendingCoins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$48,234.21",
    change: "+5.2%",
    trend: "up",
    volume: "$28.5B",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,834.12",
    change: "-1.8%",
    trend: "down",
    volume: "$15.2B",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "$102.45",
    change: "+8.4%",
    trend: "up",
    volume: "$4.8B",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: "$0.58",
    change: "+2.1%",
    trend: "up",
    volume: "$1.2B",
  },
];

export function TrendingCoins() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Trending Coins</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead className="text-right">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trendingCoins.map((coin) => (
              <TableRow key={coin.symbol}>
                <TableCell className="font-medium">
                  {coin.name}
                  <span className="text-sm text-muted-foreground ml-2">
                    {coin.symbol}
                  </span>
                </TableCell>
                <TableCell>{coin.price}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {coin.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        coin.trend === "up" ? "text-green-500" : "text-red-500"
                      }
                    >
                      {coin.change}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{coin.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}