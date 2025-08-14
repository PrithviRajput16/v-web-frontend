import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import url_prefix from '../data/variable';
import ServiceCard from './ServiceCard';


export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(url_prefix+'api/services/all');
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64"> 
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Error loading services: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (


    <section className="bg-sectiondiv">
        <div className="container mx-auto px-4 py-12">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
            Our Medical Services
        </motion.h2>          
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
             <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
  );
}