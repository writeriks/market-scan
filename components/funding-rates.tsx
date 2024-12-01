'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FundingRate } from '@/types/funding-rate-type';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FundingRatesProps {
  fundingRates: FundingRate[];
}

const FundingRates: React.FC<FundingRatesProps> = ({ fundingRates }) => {
  return (
    <Card className='p-6'>
      <div className='flex flex-col space-y-4'>
        <h2 className='text-2xl font-bold'>Funding Rates</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exchange</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Change %</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fundingRates.map(fundingRate => (
              <TableRow key={fundingRate.symbol}>
                <TableCell className='font-medium'>
                  <span className='text-sm text-muted-foreground ml-2'>{fundingRate.exchange}</span>
                </TableCell>
                <TableCell>{fundingRate.symbol}</TableCell>
                <TableCell>
                  <div className='flex items-center'>{fundingRate.fundingRate}</div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    {Number(fundingRate.percentageChange) > 0 ? (
                      <>
                        <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
                        <span className='text-green-500 mr-1'>
                          %{Number(fundingRate.percentageChange).toFixed(0)}
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
                        <span className='text-red-500 mr-1'>
                          %{Number(fundingRate.percentageChange).toFixed(0)}
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    {new Date(fundingRate.fundingTime).toLocaleTimeString('en-US', {
                      timeZone: 'UTC',
                    })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default FundingRates;
