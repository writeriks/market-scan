import Metrics from '@/components/metrics';
import FundingRates from '@/components/funding-rates';
import { getMetrics } from '@/services/fetch-metric-data';

const Home: React.FC = async () => {
  const metrics = await getMetrics();
  const { fundingRates } = metrics;

  return (
    <main className='container mx-auto sm:p-4 py-2 space-y-6'>
      <Metrics metrics={metrics} />
      <div className='lg:w-1/2'>
        <FundingRates fundingRates={fundingRates} />
      </div>
    </main>
  );
};

export default Home;
