import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaClock,
    FaFilter,
    FaHospital,
    FaMapMarkerAlt,
    FaMoneyBill,
    FaProcedures,
    FaSearch,
    FaSpinner,
    FaStar
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";


const TreatmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [treatment, setTreatment] = useState(null);
    const [hospitalTreatments, setHospitalTreatments] = useState([]);
    const [filteredHospitalTreatments, setFilteredHospitalTreatments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [filters, setFilters] = useState({
        hospital: "",
        minPrice: "",
        maxPrice: "",
        availability: ""
    });
    const [doctorTreatments, setDoctorTreatments] = useState([]);
    const [filteredDoctorTreatments, setFilteredDoctorTreatments] = useState([]);
    const [doctorFilters, setDoctorFilters] = useState({
        name: "",
        specialty: "",
        availability: ""
    });


    useEffect(() => {
        const fetchTreatmentData = async () => {
            try {
                setLoading(true);

                // Fetch treatment basic info
                const treatmentResponse = await fetch(`http://localhost:6003/api/treatments/${id}`);
                if (!treatmentResponse.ok) {
                    throw new Error('Failed to fetch treatment data');
                }
                const treatmentResult = await treatmentResponse.json();

                if (!treatmentResult.success) {
                    throw new Error('Invalid treatment data received');
                }

                setTreatment(treatmentResult.data);

                // Fetch hospital treatments for this procedure
                const hospitalTreatmentsResponse = await fetch(`http://localhost:6003/api/hospital-treatment/by-treatment/${id}`);
                if (hospitalTreatmentsResponse.ok) {
                    const hospitalTreatmentsResult = await hospitalTreatmentsResponse.json();
                    if (hospitalTreatmentsResult.success) {
                        setHospitalTreatments(hospitalTreatmentsResult.data);
                        setFilteredHospitalTreatments(hospitalTreatmentsResult.data);
                    }
                }

                // Fetch doctor details
                const doctorTreatmentResponse = await fetch(`http://localhost:6003/api/doctor-treatment/by-treatment/${id}`)
                if (doctorTreatmentResponse.ok) {
                    const doctorTreatmentResult = await doctorTreatmentResponse.json()
                    setDoctorTreatments(doctorTreatmentResult.data);
                    setFilteredDoctorTreatments(doctorTreatmentResult.data);
                }

                setError(null);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTreatmentData();
    }, [id]);

    console.log(doctorTreatments)


    // console.log(hospitalTreatments.name);

    // Filter hospital treatments based on filters
    useEffect(() => {
        let filtered = hospitalTreatments;

        if (filters.hospital) {
            filtered = filtered.filter(ht =>
                ht.hospital && ht.hospital.name.toLowerCase().includes(filters.hospital.toLowerCase())
            );
        }

        if (filters.minPrice) {
            filtered = filtered.filter(ht => ht.finalPrice >= parseFloat(filters.minPrice));
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(ht => ht.finalPrice <= parseFloat(filters.maxPrice));
        }

        if (filters.availability) {
            filtered = filtered.filter(ht => ht.availability === filters.availability);
        }

        setFilteredHospitalTreatments(filtered);
    }, [filters, hospitalTreatments]);

    // console.log(filteredHospitalTreatments[0].city);

    // Extract unique values for filters
    const hospitals = [...new Set(hospitalTreatments
        .map(ht => ht.hospital?.name)
        .filter(Boolean)
    )];

    const availabilityOptions = [
        'Available', 'Limited', 'Waitlist', 'Not Available'
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading treatment details...</p>
                </div>
            </div>
        );
    }

    if (error || !treatment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚕️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Treatment not found!</h2>
                    <p className="text-gray-600 mb-6">{error || "The treatment you're looking for doesn't exist."}</p>
                    <button
                        onClick={() => navigate('/treatments')}
                        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Back to Treatments
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
                            onClick={() => navigate('/treatments')}
                            className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Treatments
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* <img src={treatment.icon}  /> */}

                {/* Treatment Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="flex items-center gap-6">
                            <span className="text-6xl">
                                {/* <img src={treatment.icon} alt={'⚕️'} /> */}
                                {/* <img src={"src/assets/lowest_price/Oncology.svg"} alt={'hello'} /> */}
                            </span>
                            <div>

                                <h1 className="text-4xl font-bold text-gray-800 mb-2">{treatment.title}</h1>
                                <div className="flex items-center space-x-6 flex-wrap">
                                    <div className="flex items-center text-teal-600 font-semibold">
                                        <FaProcedures className="mr-2" />
                                        <span>{treatment.category}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaClock className="mr-2" />
                                        <span>{treatment.typicalDuration} minutes</span>
                                    </div>
                                    <div className={`flex items-center font-semibold ${treatment.typicalComplexity === 'Low' ? 'text-green-600' :
                                        treatment.typicalComplexity === 'Medium' ? 'text-yellow-600' :
                                            treatment.typicalComplexity === 'High' ? 'text-orange-600' :
                                                'text-red-600'
                                        }`}>
                                        <span>{treatment.typicalComplexity} Complexity</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                    <div className="flex space-x-8 border-b">

                        {['overview', 'hospitals', 'doctors'].map((tab) => (
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
                            {/* Description Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Procedure</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {treatment.description || `${treatment.title} is a medical procedure that helps patients with various health conditions.`}
                                </p>
                            </div>

                            {/* Details Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Procedure Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-700 mb-2">Duration</h3>
                                            <p className="text-gray-600">{treatment.typicalDuration} minutes</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700 mb-2">Complexity</h3>
                                            <p className={`font-semibold ${treatment.typicalComplexity === 'Low' ? 'text-green-600' :
                                                treatment.typicalComplexity === 'Medium' ? 'text-yellow-600' :
                                                    treatment.typicalComplexity === 'High' ? 'text-orange-600' :
                                                        'text-red-600'
                                                }`}>
                                                {treatment.typicalComplexity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-700 mb-2">Recovery Time</h3>
                                            <p className="text-gray-600">{treatment.typicalRecoveryTime || 'Varies based on individual'}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
                                            <p className="text-teal-600 font-semibold">{treatment.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{hospitalTreatments.length}</div>
                                        <div className="text-sm text-blue-600">Hospitals</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">
                                            {hospitalTreatments.filter(ht => ht.availability === 'Available').length}
                                        </div>
                                        <div className="text-sm text-green-600">Available</div>
                                    </div>
                                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                                        <div className="text-2xl font-bold text-orange-600">
                                            {Math.min(...hospitalTreatments.map(ht => ht.price).filter(Boolean)) || 0}
                                        </div>
                                        <div className="text-sm text-orange-600">Starting Price (₹)</div>
                                    </div>
                                    {/* <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {Math.max(...hospitalTreatments.map(ht => ht.finalPrice).filter(Boolean)) || 0}
                                        </div>
                                        <div className="text-sm text-purple-600">Max Price (₹)</div>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white">
                                <h3 className="text-xl font-bold mb-3">Find This Treatment</h3>
                                <p className="mb-4 opacity-90">Available at {hospitalTreatments.length} hospitals</p>
                                <button
                                    onClick={() => setActiveTab('hospitals')}
                                    className="w-full bg-white text-teal-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    View Hospitals
                                </button>
                            </div>

                            {/* Price Range */}
                            {hospitalTreatments.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Price Range</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Starting from</span>
                                            <span className="font-semibold">
                                                ₹{Math.min(...hospitalTreatments.map(ht => ht.price).filter(Boolean))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Up to</span>
                                            <span className="font-semibold">
                                                ₹{Math.max(...hospitalTreatments.map(ht => ht.price).filter(Boolean))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t">
                                            <span className="text-gray-600">Average</span>
                                            <span className="font-semibold">
                                                ₹{Math.round(hospitalTreatments.reduce((sum, ht) => sum + ht.price, 0) / hospitalTreatments.length)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'hospitals' && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filter Sidebar */}
                        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-6 h-fit">
                            <div className="flex items-center gap-2 mb-6">
                                <FaFilter className="text-teal-600 text-lg" />
                                <h2 className="text-xl font-semibold text-gray-800">Filter Hospitals</h2>
                            </div>

                            {/* Hospital Name Filter */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <FaSearch className="text-teal-500" />
                                    Hospital Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search hospitals..."
                                    className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                    value={filters.hospital}
                                    onChange={(e) => setFilters({ ...filters, hospital: e.target.value })}
                                />
                            </div>

                            {/* Price Filter */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <FaMoneyBill className="text-teal-500" />
                                    Min Price (₹)
                                </label>
                                <input
                                    type="number"
                                    placeholder="Minimum price"
                                    className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                />
                            </div>

                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <FaMoneyBill className="text-teal-500" />
                                    Max Price (₹)
                                </label>
                                <input
                                    type="number"
                                    placeholder="Maximum price"
                                    className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                />
                            </div>

                            {/* Availability Filter */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <FaHospital className="text-teal-500" />
                                    Availability
                                </label>
                                <select
                                    className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                    value={filters.availability}
                                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                                >
                                    <option value="">All Availability</option>
                                    {availabilityOptions.map((option, i) => (
                                        <option key={i} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Results Count */}
                            <div className="mb-5 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">
                                    Showing {filteredHospitalTreatments.length} of {hospitalTreatments.length} hospitals
                                </p>
                            </div>

                            {/* Reset Filters Button */}
                            <button
                                onClick={() => setFilters({
                                    hospital: "",
                                    minPrice: "",
                                    maxPrice: "",
                                    availability: ""
                                })}
                                className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Reset Filters
                            </button>
                        </div>

                        {/* Hospitals List */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Hospitals Offering {treatment.title}</h2>
                                <p className="text-gray-600">
                                    {hospitalTreatments.length} hospitals provide this treatment with varying prices and availability.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {filteredHospitalTreatments.length > 0 ? (
                                    filteredHospitalTreatments.map((hospitalTreatment) => (
                                        <div key={hospitalTreatment._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Hospital Image */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={hospitalTreatment.hospital.image}
                                                        alt={hospitalTreatment.hospital?.name}
                                                        className="w-32 h-32 object-cover rounded-lg"
                                                    />
                                                </div>

                                                {/* Hospital Info */}
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                        {hospitalTreatment.hospital.name}
                                                    </h3>

                                                    <div className="flex items-center text-gray-600 mb-3">
                                                        <FaMapMarkerAlt className="mr-2" />
                                                        <span>{hospitalTreatment.hospital.city}, {hospitalTreatment.hospital.country}</span>
                                                    </div>

                                                    <div className="flex items-center mb-4">
                                                        <FaStar className="text-yellow-400 mr-1" />
                                                        <span className="text-gray-700 font-semibold">
                                                            {hospitalTreatment.hospital.rating}
                                                        </span>
                                                        <span className="text-gray-500 ml-2">({hospitalTreatment.beds} beds)</span>
                                                    </div>

                                                    {/* Treatment Details */}
                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <span className="text-sm text-gray-500">Price</span>
                                                            <div className="text-xl font-bold text-teal-600">
                                                                ₹{hospitalTreatment.price}
                                                            </div>
                                                            {hospitalTreatment.discount > 0 && (
                                                                <span className="text-sm text-green-600">
                                                                    {hospitalTreatment.discount}% off
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="text-sm text-gray-500">Availability</span>
                                                            <div className={`font-semibold ${hospitalTreatment.availability === 'Available' ? 'text-green-600' :
                                                                hospitalTreatment.availability === 'Limited' ? 'text-yellow-600' :
                                                                    hospitalTreatment.availability === 'Waitlist' ? 'text-orange-600' :
                                                                        'text-red-600'
                                                                }`}>
                                                                {hospitalTreatment.availability}
                                                            </div>
                                                            {hospitalTreatment.waitingPeriod > 0 && (
                                                                <span className="text-sm text-gray-500">
                                                                    {hospitalTreatment.waitingPeriod} days wait
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {hospitalTreatment.specialNotes && (
                                                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                            <p className="text-sm text-gray-600">{hospitalTreatment.specialNotes}</p>
                                                        </div>
                                                    )}

                                                    <div className="flex space-x-4">
                                                        <Link
                                                            to={`/hospitals/${hospitalTreatment.hospital?._id}`}
                                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                                        >
                                                            View Hospital
                                                        </Link>
                                                        <Link
                                                            to={`/hospitals/${hospitalTreatment.hospital?._id}/book`}
                                                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                                                        >
                                                            Book Appointment
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        // <HospitalCard hospital={hospitalTreatment} />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🏥</div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No hospitals found</h3>
                                        <p className="text-gray-600 mb-4">
                                            Try adjusting your filters to find hospitals offering this treatment.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'doctors' && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filter Sidebar */}
                        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-6 h-fit">
                            <div className="flex items-center gap-2 mb-6">
                                <FaFilter className="text-teal-600 text-lg" />
                                <h2 className="text-xl font-semibold text-gray-800">Filter Doctors</h2>
                            </div>

                            {/* Doctor Name Filter */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <FaSearch className="text-teal-500" />
                                    Doctor Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search doctors..."
                                    className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                    value={doctorFilters.name}
                                    onChange={(e) => setDoctorFilters({ ...doctorFilters, name: e.target.value })}
                                />
                            </div>

                            {/* Specialty Filter */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <FaProcedures className="text-teal-500" />
                                    Specialty
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Cardiology"
                                    className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                    value={doctorFilters.specialty}
                                    onChange={(e) => setDoctorFilters({ ...doctorFilters, specialty: e.target.value })}
                                />
                            </div>

                            {/* Availability Filter */}
                            <div className="mb-5">
                                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                                    <FaHospital className="text-teal-500" />
                                    Availability
                                </label>
                                <select
                                    className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                                    value={doctorFilters.availability}
                                    onChange={(e) => setDoctorFilters({ ...doctorFilters, availability: e.target.value })}
                                >
                                    <option value="">All</option>
                                    <option value="Available">Available</option>
                                    <option value="Limited">Limited</option>
                                    <option value="Waitlist">Waitlist</option>
                                    <option value="Not Available">Not Available</option>
                                </select>
                            </div>

                            {/* Reset Filters Button */}
                            <button
                                onClick={() => setDoctorFilters({
                                    name: "",
                                    specialty: "",
                                    availability: ""
                                })}
                                className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Reset Filters
                            </button>
                        </div>

                        {/* Doctors List */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Doctors Performing {treatment.title}</h2>
                                <p className="text-gray-600">
                                    {doctorTreatments.length} doctors are available for this procedure.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {filteredDoctorTreatments.length > 0 ? (
                                    filteredDoctorTreatments.map((doctorTreatment) => (
                                        <div key={doctorTreatment._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Doctor Image */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={doctorTreatment.doctor.image || "/default-doctor.png"}
                                                        alt={doctorTreatment.doctor?.name}
                                                        className="w-32 h-32 object-cover rounded-full"
                                                    />
                                                </div>

                                                {/* Doctor Info */}
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                        {doctorTreatment.doctor.name}
                                                    </h3>

                                                    <div className="flex items-center text-gray-600 mb-2">
                                                        <FaStar className="text-yellow-400 mr-1" />
                                                        <span className="text-gray-700 font-semibold">
                                                            {doctorTreatment.doctor.rating || "N/A"}
                                                        </span>
                                                        <span className="text-gray-500 ml-2">({doctorTreatment.doctor.experience} yrs exp.)</span>
                                                    </div>

                                                    <div className="text-teal-600 font-semibold mb-3">
                                                        {doctorTreatment.doctor.specialty}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div>
                                                            <span className="text-sm text-gray-500">Consultation Fee</span>
                                                            <div className="text-xl font-bold text-teal-600">
                                                                ₹{doctorTreatment.fee || "—"}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className="text-sm text-gray-500">Availability</span>
                                                            <div className={`font-semibold ${doctorTreatment.availability === 'Available' ? 'text-green-600' :
                                                                doctorTreatment.availability === 'Limited' ? 'text-yellow-600' :
                                                                    doctorTreatment.availability === 'Waitlist' ? 'text-orange-600' :
                                                                        'text-red-600'
                                                                }`}>
                                                                {doctorTreatment.availability}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {doctorTreatment.specialNotes && (
                                                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                            <p className="text-sm text-gray-600">{doctorTreatment.specialNotes}</p>
                                                        </div>
                                                    )}

                                                    <div className="flex space-x-4">
                                                        <Link
                                                            to={`/doctors/${doctorTreatment.doctor?._id}`}
                                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                                        >
                                                            View Profile
                                                        </Link>
                                                        <Link
                                                            to={`/doctors/${doctorTreatment.doctor?._id}/book`}
                                                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                                                        >
                                                            Book Appointment
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">👨‍⚕️</div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
                                        <p className="text-gray-600 mb-4">
                                            Try adjusting your filters to find doctors for this treatment.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TreatmentDetails;