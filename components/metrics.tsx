'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import FearGreedIndexMeter from '@/components/fear-greed-index-meter';
import { useQuery } from '@tanstack/react-query';
import { fetchAllMetrics } from '@/services/api-service/api-service';
import { MarketData, MetricNames } from '@/types/metrics-type';

const Metrics: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-all-metrics'],
    queryFn: () => fetchAllMetrics(),
  });

  const mockedMetrics: MarketData[] = [
    { name: MetricNames.FEAR_AND_GREED, value: '0', change: 0, price: '0', volume: '000' },
    { name: MetricNames.BTC_DOMINANCE, value: '0', change: 0, price: '0', volume: '000' },
    { name: MetricNames.ETH_DOMINANCE, value: '0', change: 0, price: '0', volume: '000' },
    { name: MetricNames.STABLE_COIN_MARKET_CAP, value: '0', change: 0, price: '0', volume: '000' },
    { name: MetricNames.DEFI_MARKET_CAP, value: '0', change: 0, price: '0', volume: '000' },
    { name: MetricNames.TOTAL_MARKET_CAP, value: '0', change: 0, price: '0', volume: '000' },
    { name: MetricNames.ALTCOIN_MARKET_CAP, value: '0', change: 0, price: '0', volume: '000' },
  ];
  /* if (!data) return null; */

  const renderMetrics = (metric: MarketData): any => {
    switch (metric.name) {
      case MetricNames.FEAR_AND_GREED:
        return <FearGreedIndexMeter value={Number(metric.value)} />;
      case MetricNames.BTC_DOMINANCE:
      case MetricNames.ETH_DOMINANCE:
        return (
          <>
            <p className='text-sm text-muted-foreground'>{metric.name}</p>
            <p className='text-sm font-bold'>{metric.value}%</p>
            <div className='flex items-center text-sm mt-1'>
              {metric.change > 0 ? (
                <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
              ) : metric.change < 0 ? (
                <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
              ) : null}
              {metric.change && (
                <span className={metric.change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {metric.change.toFixed(2)}%
                </span>
              )}
            </div>
            <div className='flex items-center mt-1 text-sm'>
              {metric.price && (
                <p>
                  Price:{' '}
                  <span className={metric.change > 0 ? 'text-green-500' : 'text-red-500'}>
                    {metric.price}
                  </span>
                </p>
              )}
            </div>
            <div className='flex items-center mt-1 text-sm'>
              {metric.volume && <p>Volume: {metric.volume}</p>}
            </div>
          </>
        );
      default:
        return (
          <>
            <p className='text-sm text-muted-foreground'>{metric.name}</p>
            <p className='text-sm font-bold'>{metric.value}</p>
            <div className='flex items-center text-sm mt-1'>
              {metric.change > 0 ? (
                <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
              ) : metric.change < 0 ? (
                <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
              ) : null}
              {metric.change && (
                <span className={metric.change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {metric.change.toFixed(2)}%
                </span>
              )}
            </div>
            <div className='flex items-center mt-1 text-sm'>
              {metric.price && (
                <p>
                  Price:{' '}
                  <span className={metric.change > 0 ? 'text-green-500' : 'text-red-500'}>
                    {metric.price}
                  </span>
                </p>
              )}
            </div>
            <div className='flex items-center mt-1 text-sm'>
              {metric.volume && <p>Volume: {metric.volume}</p>}
            </div>
          </>
        );
    }
  };

  return (
    <div className='lg:p-4'>
      <div className='flex flex-col items-center md:items-start justify-center '>
        <div className='grid grid-cols-2 xl:grid-cols-7 md:grid-cols-5 gap-4'>
          {(data ?? mockedMetrics).map((metric, index) => (
            <Card key={`${metric.name}-${index}`} className='p-4 w-40 md:w-36 lg:w-full relative'>
              {isLoading && (
                <div className='absolute inset-0 bg-black/50 flex items-center justify-center z-10'>
                  <div className='text-white  text-sm'>Loading...</div>
                </div>
              )}
              <div className='flex items-start justify-between'>
                <div>{renderMetrics(metric)}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
