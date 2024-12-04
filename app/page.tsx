import Metrics from '@/components/metrics';
import { getMetrics } from '@/services/fetch-metric-data';
import CryptoAnalyzer from '@/components/crypto-analyzer/crypto-analyzer';

export const dynamic = 'force-dynamic';

const Home: React.FC = async () => {
  const metrics = await getMetrics();

  return (
    <main className='container mx-auto sm:p-4 py-2 space-y-6'>
      {metrics && <Metrics metrics={metrics} />}
      <CryptoAnalyzer />
    </main>
  );
};

export default Home;
