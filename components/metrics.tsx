'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import FearGreedIndexMeter from '@/components/fear-greed-index-meter';
import { useQuery } from '@tanstack/react-query';
import { fetchAllMetrics } from '@/services/api-service/api-service';
import { formatCurrency } from '@/services/util-service/util-service';

const Metrics: React.FC = () => {
  const { data: metrics } = useQuery({
    queryKey: ['get-all-metrics'],
    queryFn: () => fetchAllMetrics(),
  });
  console.log('🚀 ~ metrics:', metrics);

  if (!metrics) return null;

  const {
    btcDominance,
    defiData,
    ethDominance,
    fearAndGreed,
    stableCoinMarketCap,
    altcoinData,
    totalMarketCap,
  } = metrics;

  const metricsComponents = [
    {
      name: 'Fear And Greed',
      icon: PieChart,
      component: <FearGreedIndexMeter value={Number(fearAndGreed.value)} />,
    },
    {
      name: totalMarketCap.name,
      value: `${formatCurrency(Number(totalMarketCap.value))}`,
      change: `${totalMarketCap.change}%`,
      trend: Number(totalMarketCap.change) > 0 ? 'up' : 'down',
      icon: PieChart,
    },
    {
      name: btcDominance.name,
      value: `${btcDominance.value}%`,
      change: `${btcDominance.change}%`,
      trend: Number(btcDominance.change) > 0 ? 'up' : 'down',
      icon: PieChart,
      price: `${formatCurrency(Number(btcDominance.price))}`,
    },
    {
      name: ethDominance.name,
      value: `${ethDominance.value}%`,
      change: `${ethDominance.change}%`,
      trend: Number(ethDominance.change) > 0 ? 'up' : 'down',
      icon: PieChart,
      price: `${formatCurrency(Number(ethDominance.price))}`,
    },
    {
      name: defiData.name,
      value: `${formatCurrency(Number(defiData.value))}`,
      volume: `${formatCurrency(Number(defiData.volume))}`,
      change: `${defiData.change}%`,
      trend: Number(defiData.change) > 0 ? 'up' : 'down',
      icon: PieChart,
    },
    {
      name: stableCoinMarketCap.name,
      value: `${formatCurrency(Number(stableCoinMarketCap.value))}`,
      change: `${stableCoinMarketCap.change}%`,
      trend: Number(stableCoinMarketCap.change) > 0 ? 'up' : 'down',
      icon: PieChart,
    },
    {
      name: altcoinData.name,
      value: `${formatCurrency(Number(altcoinData.value))}`,
      volume: `${formatCurrency(Number(altcoinData.volume))}`,
    },
  ];

  return (
    <div className='lg:p-4'>
      <div className='flex flex-col items-center md:items-start justify-center '>
        <div className='grid grid-cols-2 xl:grid-cols-8 md:grid-cols-5 gap-4'>
          {metricsComponents.map(metric => (
            <Card key={metric.name} className='p-4 w-40 md:w-36 lg:w-full'>
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{metric.name}</p>
                  {metric.component ? (
                    metric.component
                  ) : (
                    <p className='text-2xl font-bold'>{metric.value}</p>
                  )}
                  <div className='flex items-center mt-1'>
                    {metric.trend === 'up' ? (
                      <TrendingUp className='w-4 h-4 text-green-500 mr-1' />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className='w-4 h-4 text-red-500 mr-1' />
                    ) : null}
                    <span
                      className={
                        metric.trend === 'up'
                          ? 'text-green-500'
                          : metric.trend === 'down'
                            ? 'text-red-500'
                            : ''
                      }
                    >
                      {metric.change}
                    </span>
                  </div>
                  <div className='flex items-center mt-1'>
                    {metric.price && <p>Price: {metric.price}</p>}
                  </div>
                  <div className='flex items-center mt-1'>
                    {metric.volume && <p>Volume: {metric.volume}</p>}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
