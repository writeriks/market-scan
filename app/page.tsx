import Metrics from '@/components/metrics';
import CryptoAnalyzer from '@/components/crypto-analyzer/crypto-analyzer';

const Home: React.FC = async () => (
  <main className='container mx-auto sm:p-4 py-2 space-y-6'>
    <Metrics />
    <CryptoAnalyzer />
  </main>
);

export default Home;
