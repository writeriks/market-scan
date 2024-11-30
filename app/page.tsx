import Metrics from "@/components/metrics";
import { getMetrics } from "@/services/fetch-metric-data";

const Home: React.FC = async () => {
  const metrics = await getMetrics();

  return (
    <main className="container mx-auto sm:p-4 py-2 space-y-6">
      <Metrics metrics={metrics} />
    </main>
  );
};

export default Home;
