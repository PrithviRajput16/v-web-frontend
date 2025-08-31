import { useState } from "react";
import {
  FaArrowLeft,
  FaAward,
  FaBed,
  FaBone,
  FaBrain,
  FaCalendarCheck,
  FaEnvelope,
  FaEye,
  FaGlobe,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaPlane,
  FaPlusSquare,
  FaStar,
  FaStethoscope,
  FaSyringe,
  FaTrain
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

// Dummy hospital data for I.A.U VM Medical Park Florya Hospital
const dummyHospitals = [
  {
    _id: "68af55a071a94271f1e08cd3",
    name: "I.A.U VM Medical Park Florya Hospital",
    country: { name: "Turkey" },
    city: { name: "Istanbul" },
    address: "Besyol, Florya, Akasya Sk. No:4 D:1, Istanbul, 34295, Turkey",
    coordinates: { lat: 40.9760, lng: 28.7836 },
    accreditation: ["JCI", "NABH"],
    facilities: [
      "TV in room", "Private rooms", "Free Wifi", "Phone in Room", "Mobility accessible rooms",
      "Family accommodation", "Laundry", "Welcome Safe", "Nursery services", "Dry cleaning",
      "Personal concierge", "Prayer room", "Fitness center", "Spa and wellness", "Café",
      "Business center", "Shopping", "Beauty Salon", "Parking", "ATM", "Hairdressing salon",
      "Newspaper service", "Restaurants", "Vegetarian menu", "Diet menu", "Interpreter services"
    ],
    specialties: [
      { _id: "cardio", name: "Cardiology & Cardiac Surgery", icon: "FaHeart" },
      { _id: "neuro", name: "Neurology & Neurosurgery", icon: "FaBrain" },
      { _id: "ortho", name: "Orthopedics", icon: "FaBone" },
      { _id: "onco", name: "Oncology", icon: "FaPlusSquare" },
      { _id: "gastro", name: "Gastroenterology", icon: "FaStethoscope" },
      { _id: "hepatology", name: "Hepatology", icon: "FaStethoscope" },
      { _id: "ophthal", name: "Ophthalmology", icon: "FaEye" },
      { _id: "spine", name: "Spine Surgery", icon: "FaBone" },
      { _id: "plastic", name: "Cosmetic & Plastic Surgery", icon: "FaSyringe" },
      { _id: "general", name: "General Surgery", icon: "FaStethoscope" },
      { _id: "nephro", name: "Nephrology", icon: "FaStethoscope" },
      { _id: "bariatric", name: "Bariatric Surgery", icon: "FaStethoscope" },
      { _id: "gyneco", name: "Obstetrics & Gynecology", icon: "FaStethoscope" }
    ],
    rating: 4.8,
    totalRatings: 16,
    beds: 300,
    established: 2017,
    area: "51,000 m²",
    operationRooms: 13,
    outpatientFacilities: 92,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=400&fit=crop",
    phone: "+90 212 867 0000",
    email: "info@medicalparkflorya.com",
    website: "https://medicalpark.com.tr/florya",
    languages: ["Arabic", "English", "French", "German", "Greek", "Russian", "Swedish", "Turkish", "Romanian"],
    description: `Established in 2017, I.A.U. V.M. Medical Park Florya Hospital is a multidisciplinary JCI-accredited hospital with 300-bed capacity. The hospital provides comprehensive medical treatments including Cardiac Surgery, Oncology, Obstetrics & Gynecology, General Surgery, and Orthopedics.

The hospital features modern diagnostic methods such as Biopsy, Transesophageal echocardiography, Colonoscopy, Hormone Tests, and Heart M.R.I. They have a team of highly professional medical staff fluent in multiple languages for international patients' comfort.

Based on the 360-degree concept of service, the hospital offers world-class healthcare infrastructure with rooms designed like 5-star hotels, ensuring maximum comfort during treatment.`,

    transportation: {
      airport: { distance: "44 km", time: "41 minutes" },
      railway: { distance: "22.7 km", time: "26 minutes" }
    },

    doctors: [
      {
        id: 1,
        name: "Op. Dr. Semih Tiber Mentese",
        specialty: "Aesthetics and Plastic Surgeon",
        rating: 4.6,
        ratingsCount: 97,
        experience: 14,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 2,
        name: "Assoc. Dr. Sami Sökücü",
        specialty: "Orthopaedic and Joint Replacement Surgeon",
        experience: 20,
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 3,
        name: "Dr. Ahmet Alperen Koc",
        specialty: "Ophthalmologist",
        experience: 14,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 4,
        name: "Dr. Baris Demiriz",
        specialty: "General Surgeon",
        experience: 17,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
      }
    ],

    patientReviews: [
      {
        id: 1,
        patientName: "Mrs. Eva Vigario",
        country: "Angola",
        rating: 5,
        comment: "My gastric sleeve surgery took place at Medical Park Hospital, and it was a success. The nurses and doctors provided exceptional care throughout my stay! Thanks!",
        date: "2024-01-15"
      },
      {
        id: 2,
        patientName: "Seth Wiggins",
        country: "United States",
        rating: 5,
        comment: "I travelled from the USA to Turkey for rhinoplasty and hair transplantation at Medical Park Hospital. The experience was outstanding. Highly recommended!",
        date: "2024-02-20"
      }
    ]
  }
];

// Icon mapping component
const IconRenderer = ({ iconName, className }) => {
  const iconMap = {
    FaHeart: FaHeart,
    FaBrain: FaBrain,
    FaBone: FaBone,
    FaPlusSquare: FaPlusSquare,
    FaStethoscope: FaStethoscope,
    FaEye: FaEye,
    FaSyringe: FaSyringe
  };

  const IconComponent = iconMap[iconName] || FaStethoscope;
  return <IconComponent className={className} />;
};

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Directly find the hospital from dummy data
  const hospital = dummyHospitals.find(h => h._id === id);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🏥</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital not found!</h2>
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
                  <span>{hospital.city.name}, {hospital.country.name}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2 text-yellow-400" />
                  <span>{hospital.rating} ({hospital.totalRatings} Ratings)</span>
                </div>
                <div className="flex items-center">
                  <FaBed className="mr-2" />
                  <span>{hospital.beds} Beds</span>
                </div>
                <div className="flex items-center">
                  <FaAward className="mr-2" />
                  <span>Est. {hospital.established}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex space-x-8 border-b">
            {['overview', 'doctors', 'facilities', 'reviews'].map((tab) => (
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
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {hospital.description}
                </p>
              </div>

              {/* Specialties Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Specialties</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hospital.specialties.map((specialty) => (
                    <div key={specialty._id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <IconRenderer iconName={specialty.icon} className="text-teal-600 mr-3 text-lg" />
                      <span className="text-gray-700 font-medium">{specialty.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Languages Spoken</h2>
                <div className="flex flex-wrap gap-2">
                  {hospital.languages.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
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
                  <div className="flex items-center">
                    <FaAward className="text-teal-600 mr-3 w-5" />
                    <span className="text-gray-700">Est. {hospital.established}</span>
                  </div>
                  <div className="flex items-center">
                    <FaAward className="text-teal-600 mr-3 w-5" />
                    <span className="text-gray-700">{hospital.accreditation.join(', ')}</span>
                  </div>
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
                  {hospital.email && (
                    <div className="flex items-center">
                      <FaEnvelope className="text-teal-600 mr-3 w-5" />
                      <a href={`mailto:${hospital.email}`} className="text-gray-700 hover:text-teal-600">
                        {hospital.email}
                      </a>
                    </div>
                  )}
                  {hospital.website && (
                    <div className="flex items-center">
                      <FaGlobe className="text-teal-600 mr-3 w-5" />
                      <a
                        href={hospital.website}
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
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-teal-600 mr-3 mt-1 w-5 flex-shrink-0" />
                  <p className="text-gray-600">{hospital.address}</p>
                </div>

                {/* Transportation */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaPlane className="mr-2" />
                    <span>Airport: {hospital.transportation.airport.distance} ({hospital.transportation.airport.time})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaTrain className="mr-2" />
                    <span>Railway: {hospital.transportation.railway.distance} ({hospital.transportation.railway.time})</span>
                  </div>
                </div>
              </div>

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

        {activeTab === 'doctors' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hospital.doctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center p-6 bg-gray-50 rounded-lg">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm">{doctor.experience} years experience</p>
                    {doctor.rating && (
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"} size={12} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">{doctor.rating} ({doctor.ratingsCount} reviews)</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Facilities & Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hospital.facilities.map((facility, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Reviews</h2>
            <div className="space-y-6">
              {hospital.patientReviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.patientName}</h4>
                      <p className="text-gray-500 text-sm">{review.country}</p>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-gray-400 text-sm mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDetails;