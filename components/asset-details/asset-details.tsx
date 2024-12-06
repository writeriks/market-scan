import React from 'react';
import { fetchAssetDetails } from '@/services/api-service/api-service';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  formatCurrency,
  formatNumberDecimalPoints,
  formatStringDateToHour,
} from '@/services/util-service/util-service';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface AssetDetailsProps {
  symbol: string;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ symbol }) => {
  const { data: assetDetails, isLoading } = useQuery({
    queryKey: [`get-asset-details-${symbol}`],
    queryFn: () => fetchAssetDetails(symbol),
  });

  return (
    <Card className='p-6 relative'>
      {/* Loading overlay */}
      {isLoading && (
        <div className='absolute inset-0 bg-black/50 flex items-center justify-center z-10'>
          <div className='text-white  text-sm'>Loading...</div>
        </div>
      )}
      <div className='flex flex-col space-y-4'>
        <h2 className='text-xl font-bold'>Asset Details</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className='text-sm text-muted-foreground ml-2 flex'>
                  {assetDetails?.name} ({assetDetails?.symbol})
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              <>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>Price</span>
                  </TableCell>
                  <TableCell>
                    ${formatNumberDecimalPoints(assetDetails?.quote['USD']?.price ?? 0, 10, 10)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>Market Cap</span>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(assetDetails?.quote['USD']?.market_cap ?? 0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>Max Supply</span>
                  </TableCell>
                  <TableCell>
                    {assetDetails?.infinite_supply
                      ? 'Infinite'
                      : formatNumberDecimalPoints(assetDetails?.max_supply ?? 0, 0, 0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>
                      Circulating Supply
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatNumberDecimalPoints(assetDetails?.circulating_supply ?? 0, 0, 0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>Volume 24h</span>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(assetDetails?.quote['USD'].volume_24h ?? 0)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>
                      Price Change(1h)
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      {Number(assetDetails?.quote['USD'].percent_change_1h) > 0 ? (
                        <>
                          <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
                          <span className='text-green-500 mr-1'>
                            %
                            {formatNumberDecimalPoints(
                              assetDetails?.quote['USD'].percent_change_1h ?? 0,
                              2,
                              2
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
                          <span className='text-red-500 mr-1'>
                            {formatNumberDecimalPoints(
                              assetDetails?.quote['USD'].percent_change_1h ?? 0,
                              2,
                              2
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>
                      Price Change(24h)
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      {Number(assetDetails?.quote['USD'].percent_change_24h) > 0 ? (
                        <>
                          <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
                          <span className='text-green-500 mr-1'>
                            %
                            {formatNumberDecimalPoints(
                              assetDetails?.quote['USD'].percent_change_24h ?? 0,
                              2,
                              2
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
                          <span className='text-red-500 mr-1'>
                            %{Number(assetDetails?.quote['USD'].percent_change_24h).toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>
                      Price Change(7d)
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      {Number(assetDetails?.quote['USD'].percent_change_7d) > 0 ? (
                        <>
                          <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
                          <span className='text-green-500 mr-1'>
                            %
                            {formatNumberDecimalPoints(
                              assetDetails?.quote['USD'].percent_change_7d ?? 0,
                              2,
                              2
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
                          <span className='text-red-500 mr-1'>
                            %{Number(assetDetails?.quote['USD'].percent_change_7d).toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>
                      Price Change(30d)
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      {Number(assetDetails?.quote['USD'].percent_change_30d) > 0 ? (
                        <>
                          <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
                          <span className='text-green-500 mr-1'>
                            %
                            {formatNumberDecimalPoints(
                              assetDetails?.quote['USD'].percent_change_30d ?? 0,
                              2,
                              2
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
                          <span className='text-red-500 mr-1'>
                            %{Number(assetDetails?.quote['USD'].percent_change_30d).toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium'>
                    <span className='text-sm text-muted-foreground ml-2 flex'>Last Update</span>
                  </TableCell>
                  <TableCell>{formatStringDateToHour(assetDetails?.last_updated ?? '')}</TableCell>
                </TableRow>
              </>
            }
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AssetDetails;
