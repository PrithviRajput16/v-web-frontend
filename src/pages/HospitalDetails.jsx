import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaAward,
  FaBed,
  FaCalendarCheck,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaPlane,
  FaSpinner,
  FaStar,
  FaStethoscope,
  FaTrain
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        setLoading(true);

        // Fetch hospital basic info
        const hospitalResponse = await fetch(`http://localhost:6003/api/hospitals/${id}`);
        if (!hospitalResponse.ok) {
          throw new Error('Failed to fetch hospital data');
        }
        const hospitalResult = await hospitalResponse.json();

        if (!hospitalResult.success) {
          throw new Error('Invalid hospital data received');
        }

        setHospital(hospitalResult.data);

        // Fetch hospital details
        const detailsResponse = await fetch(`http://localhost:6003/api/hospitals/${id}/details`);
        if (detailsResponse.ok) {
          const detailsResult = await detailsResponse.json();
          if (detailsResult.success) {
            setDetails(detailsResult.data);
          }
        }

        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🏥</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital not found!</h2>
          <p className="text-gray-600 mb-6">{error || "The hospital you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate('/hospitals')}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Hospitals
          </button>
        </div>
      </div>
    );
  }

  console.log(details);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/hospitals')}
              className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Hospitals
            </button>
            <div className="flex items-center space-x-4">
              <Link
                to={`/hospitals/${hospital._id}/book`}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
              >
                <FaCalendarCheck className="mr-2" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hospital Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{hospital.name}</h1>
              <div className="flex items-center space-x-4 flex-wrap">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{hospital.city}, {hospital.country}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2 text-yellow-400" />
                  <span>{hospital.rating}</span>
                </div>
                <div className="flex items-center">
                  <FaBed className="mr-2" />
                  <span>{hospital.beds} Beds</span>
                </div>
                {details?.established && (
                  <div className="flex items-center">
                    <FaAward className="mr-2" />
                    <span>Est. {details.established}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex space-x-8 border-b">
            {['overview', 'facilities', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-colors ${activeTab === tab
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About Hospital</h2>
                <p className="text-gray-600 leading-relaxed">
                  {details?.description || hospital.blurb || `${hospital.name} is a leading healthcare facility providing quality medical services.`}
                </p>
              </div>

              {/* Specialties Section */}
              {hospital.specialties && hospital.specialties.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Specialties</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hospital.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <FaStethoscope className="text-teal-600 mr-3 text-lg" />
                        <span className="text-gray-700 font-medium">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accreditation Section */}
              {hospital.accreditation && hospital.accreditation.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Accreditations</h2>
                  <div className="flex flex-wrap gap-2">
                    {hospital.accreditation.map((acc, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Idhr se maine add kra hai */}

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Facilities & Amenities</h2>
                {details?.facilities && details.facilities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {details.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No facilities information available.</p>
                )}
              </div>


              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact & Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                    <div className="space-y-3">
                      {hospital.phone && (
                        <div className="flex items-center">
                          <FaPhone className="text-teal-600 mr-3 w-5" />
                          <span className="text-gray-700">{hospital.phone}</span>
                        </div>
                      )}
                      {details?.email && (
                        <div className="flex items-center">
                          <FaEnvelope className="text-teal-600 mr-3 w-5" />
                          <span className="text-gray-700">{details.email}</span>
                        </div>
                      )}
                      {details?.website && (
                        <div className="flex items-center">
                          <FaGlobe className="text-teal-600 mr-3 w-5" />
                          <span className="text-gray-700">{details.website}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  {details?.address && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Address</h3>
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-teal-600 mr-3 mt-1 w-5 flex-shrink-0" />
                        <p className="text-gray-600">{details.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>





            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaBed className="text-teal-600 mr-3 w-5" />
                    <span className="text-gray-700">{hospital.beds} Beds</span>
                  </div>
                  {details?.established && (
                    <div className="flex items-center">
                      <FaAward className="text-teal-600 mr-3 w-5" />
                      <span className="text-gray-700">Est. {details.established}</span>
                    </div>
                  )}
                  {hospital.accreditation && hospital.accreditation.length > 0 && (
                    <div className="flex items-center">
                      <FaAward className="text-teal-600 mr-3 w-5" />
                      <span className="text-gray-700">{hospital.accreditation.join(', ')}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FaStethoscope className="text-teal-600 mr-3 w-5" />
                    <span className="text-gray-700">Multi Specialty</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {hospital.phone && (
                    <div className="flex items-center">
                      <FaPhone className="text-teal-600 mr-3 w-5" />
                      <a href={`tel:${hospital.phone}`} className="text-gray-700 hover:text-teal-600">
                        {hospital.phone}
                      </a>
                    </div>
                  )}
                  {details?.email && (
                    <div className="flex items-center">
                      <FaEnvelope className="text-teal-600 mr-3 w-5" />
                      <a href={`mailto:${details.email}`} className="text-gray-700 hover:text-teal-600">
                        {details.email}
                      </a>
                    </div>
                  )}
                  {details?.website && (
                    <div className="flex items-center">
                      <FaGlobe className="text-teal-600 mr-3 w-5" />
                      <a
                        href={details.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-teal-600"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Card */}
              {details?.address && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-teal-600 mr-3 mt-1 w-5 flex-shrink-0" />
                    <p className="text-gray-600">{details.address}</p>
                  </div>

                  {/* Transportation */}
                  {details.transportation && (
                    <div className="mt-4 space-y-2">
                      {details.transportation.airport && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FaPlane className="mr-2" />
                          <span>Airport: {details.transportation.airport.distance} ({details.transportation.airport.time})</span>
                        </div>
                      )}
                      {details.transportation.railway && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FaTrain className="mr-2" />
                          <span>Railway: {details.transportation.railway.distance} ({details.transportation.railway.time})</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Ready to Book?</h3>
                <p className="mb-4 opacity-90">Schedule your appointment with our expert medical team.</p>
                <Link
                  to={`/hospitals/${hospital._id}/book`}
                  className="w-full bg-white text-teal-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <FaCalendarCheck className="mr-2" />
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Facilities & Amenities</h2>
            {details?.facilities && details.facilities.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {details.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No facilities information available.</p>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact & Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                <div className="space-y-3">
                  {hospital.phone && (
                    <div className="flex items-center">
                      <FaPhone className="text-teal-600 mr-3 w-5" />
                      <span className="text-gray-700">{hospital.phone}</span>
                    </div>
                  )}
                  {details?.email && (
                    <div className="flex items-center">
                      <FaEnvelope className="text-teal-600 mr-3 w-5" />
                      <span className="text-gray-700">{details.email}</span>
                    </div>
                  )}
                  {details?.website && (
                    <div className="flex items-center">
                      <FaGlobe className="text-teal-600 mr-3 w-5" />
                      <span className="text-gray-700">{details.website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              {details?.address && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Address</h3>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-teal-600 mr-3 mt-1 w-5 flex-shrink-0" />
                    <p className="text-gray-600">{details.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDetails;