import { useEffect, useState } from 'react';
import url_prefix from "../data/variable";
import { useLanguage } from '../hooks/useLanguage';
import ServiceCard from './ServiceCard';
import SectionHeading from './home/SectionHeading';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language] = useLanguage();
  const [headings, setHeadings] = useState({
    'title': 'Not Available For Selected Language',
    'sub': '',
    'desc': ''
  });

  useEffect(() => {
    if (!language) {
      console.log('Language not yet available, skipping fetch');
      return;
    }
    const fetchServices = async () => {

      try {
        // 1. Make the API request
        const response = await fetch(url_prefix + '/api/treatments/all');
        const result = await response.json();


        // setServices(result.data);
        // setError(null);
        if (result.success) {
          let dataToSet;
          if (Array.isArray(result.data)) {
            dataToSet = result.data.filter(
              item => item.language?.toLowerCase() === language?.toLowerCase()
            );
          } else {
            dataToSet =
              result.data.language?.toLowerCase() === language?.toLowerCase()
                ? [result.data]
                : [];
          }

          if (dataToSet.length > 0) {
            console.log('Setting aboutData:', dataToSet);
            setServices(dataToSet);
            console.log(services)
            setHeadings({
              title: dataToSet[0].htitle,
              sub: dataToSet[0].hsubtitle,
              desc: dataToSet[0].hdesc
            })
          }
        }
      } catch (err) {
        console.error('Fetch error:', {
          error: err,
          message: err.message,
          timestamp: new Date().toISOString()
        });
        setError(err.message);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

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
    <section className="bg-sectiondiv">
      <div className="container mx-auto  py-12">

        <SectionHeading
          center={true}
          // title="Our Medical Services"
          // subtitle="Specialized Treatments"
          // description="We offer a wide range of medical treatments and procedures with the highest standards of care"
          title={headings.title}
          subtitle={headings.sub}
          description={headings.desc}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4  mx-auto">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
// row row-cols-lg-3 row-cols-2 g-3 mt-0 g-xl-4 treatment-cnt

// grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4