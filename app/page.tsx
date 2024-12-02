import Metrics from '@/components/metrics';
import FundingRates from '@/components/funding-rates';
import { getMetrics } from '@/services/fetch-metric-data';
import TickerAnalyzer from '@/components/ticker-analyzer/ticker-analyzer';

const Home: React.FC = async () => {
  const metrics = await getMetrics();

  if (!metrics) {
    throw new Error(`anan`);
  }

  const { fundingRates } = metrics;

  return (
    <main className='container mx-auto sm:p-4 py-2 space-y-6'>
      <Metrics metrics={metrics} />
      <div className='w-full flex justify-between'>
        <div className='lg:w-1/2 p-4'>
          <TickerAnalyzer />
        </div>
        <div className='lg:w-1/2 p-4'>
          <FundingRates fundingRates={fundingRates} />
        </div>
      </div>
    </main>
  );
};

export default Home;
