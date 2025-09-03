import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaAward,
    FaCalendarCheck,
    FaEnvelope,
    FaGlobe,
    FaPhone,
    FaSpinner,
    FaStar,
    FaStethoscope
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                setLoading(true);

                // Fetch doctor data
                const doctorResponse = await fetch(`http://localhost:6003/api/doctors/${id}`);
                if (!doctorResponse.ok) {
                    throw new Error("Failed to fetch doctor data");
                }
                const doctorResult = await doctorResponse.json();

                if (!doctorResult.success) {
                    throw new Error("Invalid doctor data received");
                }

                setDoctor(doctorResult.data);
                setError(null);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading doctor details...</p>
                </div>
            </div>
        );
    }

    if (error || !doctor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">👨‍⚕️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor not found!</h2>
                    <p className="text-gray-600 mb-6">{error || "The doctor you're looking for doesn't exist."}</p>
                    <button
                        onClick={() => navigate("/doctors")}
                        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Back to Doctors
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
                            onClick={() => navigate("/doctors")}
                            className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Doctors
                        </button>
                        <div className="flex items-center space-x-4">
                            <Link
                                to={`/doctors/${doctor._id}/book`}
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
                {/* Doctor Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="relative">
                        <img
                            src={doctor.image}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                            className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h1 className="text-4xl font-bold mb-2">{`${doctor.firstName} ${doctor.lastName}`}</h1>
                            <div className="flex items-center space-x-4 flex-wrap">
                                <div className="flex items-center">
                                    <FaStethoscope className="mr-2" />
                                    <span>{doctor.specialty}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaStar className="mr-2 text-yellow-400" />
                                    <span>{doctor.rating} ({doctor.totalRatings} reviews)</span>
                                </div>
                                <div className="flex items-center">
                                    <FaAward className="mr-2" />
                                    <span>{doctor.experience} Years Experience</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                    <div className="flex space-x-8 border-b">
                        {["overview", "qualifications", "contact"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-2 font-medium transition-colors ${activeTab === tab
                                    ? "text-teal-600 border-b-2 border-teal-600"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* About Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">About Doctor</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {doctor.bio || `${doctor.firstName} ${doctor.lastName} is a skilled ${doctor.specialty} providing quality medical care.`}
                                </p>
                            </div>

                            {/* Specialties Section */}
                            {doctor.specialties && doctor.specialties.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Specialties</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {doctor.specialties.map((specialty, index) => (
                                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                                <FaStethoscope className="text-teal-600 mr-3 text-lg" />
                                                <span className="text-gray-700 font-medium">{specialty}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Qualifications</h2>
                                {doctor.qualifications && doctor.qualifications.length > 0 ? (
                                    <div className="space-y-3">
                                        {doctor.qualifications.map((qual, index) => (
                                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                                <span className="text-gray-700">
                                                    {qual.degree} - {qual.institute} ({qual.year})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No qualifications information available.</p>
                                )}
                            </div>

                            {/* Availability Section */}
                            {doctor.availability && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(doctor.availability).map(([day, slots], index) => (
                                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                                <span className="text-gray-700 font-medium">{day}: </span>
                                                <span className="text-gray-600 ml-2">
                                                    {slots.map((slot) => `${slot.start} - ${slot.end}`).join(", ")}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Awards Section */}
                            {doctor.awards && doctor.awards.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Awards</h2>
                                    <div className="space-y-3">
                                        {doctor.awards.map((award, index) => (
                                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                                <FaAward className="text-teal-600 mr-3 text-lg" />
                                                <span className="text-gray-700">
                                                    {award.name} ({award.year}, {award.presentedBy})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Memberships Section */}
                            {doctor.memberships && doctor.memberships.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Memberships</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.memberships.map((membership, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                {membership}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Publications Section */}
                            {doctor.publications && doctor.publications.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Publications</h2>
                                    <div className="space-y-3">
                                        {doctor.publications.map((pub, index) => (
                                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                                <span className="text-gray-700">
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-teal-600 hover:underline"
                                                    >
                                                        {pub.title}
                                                    </a>{" "}
                                                    ({pub.journal}, {pub.year})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                        </div>



                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Information</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <FaStethoscope className="text-teal-600 mr-3 w-5" />
                                        <span className="text-gray-700">{doctor.specialty}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaStar className="text-teal-600 mr-3 w-5" />
                                        <span className="text-gray-700">{doctor.rating} ({doctor.totalRatings} reviews)</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaAward className="text-teal-600 mr-3 w-5" />
                                        <span className="text-gray-700">{doctor.experience} Years Experience</span>
                                    </div>
                                    {doctor.consultationFee && (
                                        <div className="flex items-center">
                                            <FaCalendarCheck className="text-teal-600 mr-3 w-5" />
                                            <span className="text-gray-700">Consultation Fee: ₹{doctor.consultationFee}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contact Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                                <div className="space-y-3">
                                    {doctor.phone && (
                                        <div className="flex items-center">
                                            <FaPhone className="text-teal-600 mr-3 w-5" />
                                            <a href={`tel:${doctor.phone}`} className="text-gray-700 hover:text-teal-600">
                                                {doctor.phone}
                                            </a>
                                        </div>
                                    )}
                                    {doctor.email && (
                                        <div className="flex items-center">
                                            <FaEnvelope className="text-teal-600 mr-3 w-5" />
                                            <a href={`mailto:${doctor.email}`} className="text-gray-700 hover:text-teal-600">
                                                {doctor.email}
                                            </a>
                                        </div>
                                    )}
                                    {doctor.website && (
                                        <div className="flex items-center">
                                            <FaGlobe className="text-teal-600 mr-3 w-5" />
                                            <a
                                                href={doctor.website}
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

                            {/* Languages Card */}
                            {doctor.languages && doctor.languages.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Languages Spoken</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.languages.map((language, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                {language}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white">
                                <h3 className="text-xl font-bold mb-3">Ready to Book?</h3>
                                <p className="mb-4 opacity-90">Schedule your appointment with {`${doctor.firstName} ${doctor.lastName}`}.</p>
                                <Link
                                    to={`/doctors/${doctor._id}/book`}
                                    className="w-full bg-white text-teal-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                                >
                                    <FaCalendarCheck className="mr-2" />
                                    Book Appointment
                                </Link>
                            </div>



                        </div>
                    </div>
                )}

                {activeTab === "qualifications" && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Qualifications</h2>
                        {doctor.qualifications && doctor.qualifications.length > 0 ? (
                            <div className="space-y-3">
                                {doctor.qualifications.map((qual, index) => (
                                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700">
                                            {qual.degree} - {qual.institute} ({qual.year})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No qualifications information available.</p>
                        )}
                    </div>
                )}

                {activeTab === "contact" && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact & Availability</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                                <div className="space-y-3">
                                    {doctor.phone && (
                                        <div className="flex items-center">
                                            <FaPhone className="text-teal-600 mr-3 w-5" />
                                            <span className="text-gray-700">{doctor.phone}</span>
                                        </div>
                                    )}
                                    {doctor.email && (
                                        <div className="flex items-center">
                                            <FaEnvelope className="text-teal-600 mr-3 w-5" />
                                            <span className="text-gray-700">{doctor.email}</span>
                                        </div>
                                    )}
                                    {doctor.website && (
                                        <div className="flex items-center">
                                            <FaGlobe className="text-teal-600 mr-3 w-5" />
                                            <span className="text-gray-700">{doctor.website}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Availability */}
                            {doctor.availability && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Availability</h3>
                                    <div className="space-y-3">
                                        {Object.entries(doctor.availability).map(([day, slots], index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="text-gray-700 font-medium">{day}: </span>
                                                <span className="text-gray-600 ml-2">
                                                    {slots.map((slot) => `${slot.start} - ${slot.end}`).join(", ")}
                                                </span>
                                            </div>
                                        ))}
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

export default DoctorDetails;
