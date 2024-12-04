import Metrics from '@/components/metrics';
import CryptoAnalyzer from '@/components/crypto-analyzer/crypto-analyzer';

export const dynamic = 'force-dynamic';

const Home: React.FC = async () => {
  return (
    <main className='container mx-auto sm:p-4 py-2 space-y-6'>
      <Metrics />
      <CryptoAnalyzer />
    </main>
  );
};

export default Home;
