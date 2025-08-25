import { useState } from 'react';
import ProcedureCostCard from './ProcedureCostCard';
import SectionHeading from './home/SectionHeading';

export default function ProcedureCost({procedurecost}) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       // 1. Make the API request
  //       const response = await fetch('http://localhost:6003/api/services/all');
  //       const result = await response.json();
  //       setServices(result.data);
  //       setError(null);
  //     } catch (err) {
  //       console.error('Fetch error:', {
  //         error: err,
  //         message: err.message,
  //         timestamp: new Date().toISOString()
  //       });
  //       setError(err.message);
  //       setServices([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchServices();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
          <p className="font-bold">Error loading services</p>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section classn>
      
        <div className="container mx-auto  py-12">
          <SectionHeading
            center={true}
            title="Lowest Quotes Assured"
            subtitle="Quality Care at Best Prices"
            description="We constantly negotiate better prices and alternatives without compromising treatment quality. Our prices are consistently lower."
          />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-2  mx-auto">
                {procedurecost.map((pc) => (
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
// row row-cols-lg-3 row-cols-2 g-3 mt-0 g-xl-4 treatment-cnt

// grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4