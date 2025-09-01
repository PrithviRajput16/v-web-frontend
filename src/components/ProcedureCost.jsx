import { useEffect, useState } from 'react';
import ProcedureCostCard from './ProcedureCostCard';
import SectionHeading from './home/SectionHeading';

export default function ProcedureCost() {
  const [procedureCosts, setProcedureCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcedureCosts = async () => {
      try {
        const response = await fetch('http://localhost:6003/api/procedure-costs/all');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Invalid API response structure');
        }

        setProcedureCosts(result.data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setProcedureCosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedureCosts();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto py-12">
          <SectionHeading
            center={true}
            title="Lowest Quotes Assured"
            subtitle="Quality Care at Best Prices"
          />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto py-12">
          <SectionHeading
            center={true}
            title="Lowest Quotes Assured"
            subtitle="Quality Care at Best Prices"
          />
          <div className="text-center py-10">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
              <p className="font-bold">Error loading procedure costs</p>
              <p className="mt-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container mx-auto py-12">
        <SectionHeading
          center={true}
          title="Lowest Quotes Assured"
          subtitle="Quality Care at Best Prices"
          description="We constantly negotiate better prices and alternatives without compromising treatment quality. Our prices are consistently lower."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-2 mx-auto">
          {procedureCosts.map((pc) => (
            <ProcedureCostCard
              key={pc._id}
              service={pc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}