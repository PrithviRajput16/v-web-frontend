import { useEffect, useState } from "react";
import TreatmentCard from "../components/TreatmentCard";

export default function Treatments() {
  const [treatments, setTreatment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hospitals data from API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('http://localhost:6003/api/treatments/all');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Invalid API response structure');
        }

        setTreatment(result.data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setTreatment([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);
  // console.log(treatments[0].icon);
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Treatments & Procedures</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {treatments.map((t) => (
          <TreatmentCard key={t._id} t={t} />
        ))}
      </div>
    </div>
  );
}
