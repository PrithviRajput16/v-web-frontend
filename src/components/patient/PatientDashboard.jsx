import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url_prefix from "../../data/variable";

const PatientDashboard = () => {
    const [patientData, setPatientData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
        },
        emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
        },
        insurance: {
            provider: '',
            policyNumber: '',
            groupNumber: ''
        },
        medicalHistory: [],
        allergies: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('patientToken');
        if (!token) {
            navigate('/patient/login');
            return;
        }

        fetchPatientData();
        fetchAppointments();
    }, [navigate]);

    const fetchPatientData = async () => {
        try {
            const token = localStorage.getItem('patientToken');
            const response = await fetch(`${url_prefix}/api/patients/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();

            if (result.success) {
                setPatientData(result.data);
                // Pre-fill form data if details already exist
                if (result.data.address || result.data.emergencyContact || result.data.insurance) {
                    setFormData({
                        address: result.data.address || { street: '', city: '', state: '', country: '', zipCode: '' },
                        emergencyContact: result.data.emergencyContact || { name: '', relationship: '', phone: '' },
                        insurance: result.data.insurance || { provider: '', policyNumber: '', groupNumber: '' },
                        medicalHistory: result.data.medicalHistory || [],
                        allergies: result.data.allergies || []
                    });
                }
            } else {
                if (response.status === 401) {
                    localStorage.removeItem('patientToken');
                    localStorage.removeItem('patientData');
                    navigate('/patient/login');
                }
            }
        } catch (err) {
            console.error('Error fetching patient data:', err);
        }
    };

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('patientToken');
            const response = await fetch(`${url_prefix}/api/patients/appointments`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();

            if (result.success) {
                setAppointments(result.data);
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return {
                ...prev,
                [field]: newArray
            };
        });
    };

    const addArrayItem = (field, defaultValue = '') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], defaultValue]
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSaveDetails = async () => {
        try {
            const token = localStorage.getItem('patientToken');
            const response = await fetch(`${url_prefix}/api/patients/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                alert('Details updated successfully!');
                setShowDetailsModal(false);
                fetchPatientData(); // Refresh patient data
            } else {
                alert('Failed to update details: ' + result.error);
            }
        } catch (err) {
            console.error('Error updating details:', err);
            alert('Error updating details. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('patientToken');
        localStorage.removeItem('patientData');
        navigate('/patient/login');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Check if patient has any additional details
    const hasDetails = patientData && (
        patientData.address?.street ||
        patientData.emergencyContact?.name ||
        patientData.insurance?.provider ||
        (patientData.medicalHistory && patientData.medicalHistory.length > 0) ||
        (patientData.allergies && patientData.allergies.length > 0)
    );

    if (!patientData) {
        return <div className="p-6">Loading...</div>;
    }

    const upcomingAppointments = appointments.filter(apt =>
        new Date(apt.appointmentDate) >= new Date() &&
        ['scheduled', 'confirmed'].includes(apt.status)
    );

    const pastAppointments = appointments.filter(apt =>
        new Date(apt.appointmentDate) < new Date() ||
        ['completed', 'cancelled'].includes(apt.status)
    );

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Patient Dashboard</h1>
                    <p className="text-gray-600">
                        Welcome, {patientData.firstName} {patientData.lastName}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowDetailsModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {hasDetails ? 'View/Edit Details' : 'Add Details'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Patient Info Card */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p><span className="font-semibold">Name:</span> {patientData.firstName} {patientData.lastName}</p>
                        <p><span className="font-semibold">Email:</span> {patientData.email}</p>
                        <p><span className="font-semibold">Phone:</span> {patientData.phone}</p>
                    </div>
                    <div>
                        {patientData.dateOfBirth && (
                            <p><span className="font-semibold">Date of Birth:</span> {formatDate(patientData.dateOfBirth)}</p>
                        )}
                        {patientData.gender && (
                            <p><span className="font-semibold">Gender:</span> {patientData.gender}</p>
                        )}
                    </div>
                </div>

                {/* Quick view of details if they exist */}
                {hasDetails && (
                    <div className="mt-4 pt-4 border-t">
                        <h3 className="font-semibold mb-2">Additional Information:</h3>
                        {patientData.address?.street && (
                            <p><span className="font-semibold">Address:</span> {patientData.address.street}, {patientData.address.city}, {patientData.address.state} {patientData.address.zipCode}</p>
                        )}
                        {patientData.emergencyContact?.name && (
                            <p><span className="font-semibold">Emergency Contact:</span> {patientData.emergencyContact.name} ({patientData.emergencyContact.relationship}) - {patientData.emergencyContact.phone}</p>
                        )}
                        {patientData.insurance?.provider && (
                            <p><span className="font-semibold">Insurance:</span> {patientData.insurance.provider} {patientData.insurance.policyNumber && `(Policy: ${patientData.insurance.policyNumber})`}</p>
                        )}
                        {patientData.allergies && patientData.allergies.length > 0 && (
                            <p><span className="font-semibold">Allergies:</span> {patientData.allergies.join(', ')}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Appointments Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">My Appointments</h2>
                    <button
                        onClick={fetchAppointments}
                        className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700"
                    >
                        Refresh
                    </button>
                </div>

                <div className="flex border-b mb-4">
                    <button
                        className={`px-4 py-2 ${activeTab === 'upcoming' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming ({upcomingAppointments.length})
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'past' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('past')}
                    >
                        Past ({pastAppointments.length})
                    </button>
                </div>

                {loading ? (
                    <p>Loading appointments...</p>
                ) : activeTab === 'upcoming' ? (
                    upcomingAppointments.length === 0 ? (
                        <p className="text-gray-500">No upcoming appointments.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2">Hospital</th>
                                        <th className="px-4 py-2">Doctor</th>
                                        <th className="px-4 py-2">Treatment</th>
                                        <th className="px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingAppointments.map((appointment) => (
                                        <tr key={appointment._id} className="border-b">
                                            <td className="px-4 py-2">
                                                {formatDate(appointment.appointmentDate)}<br />
                                                <span className="text-sm text-gray-600">{appointment.appointmentTime}</span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {appointment.hospitalId?.name || appointment.hospitalName}
                                            </td>
                                            <td className="px-4 py-2">
                                                {appointment.doctorId ?
                                                    `${appointment.doctorId.firstName} ${appointment.doctorId.lastName}` :
                                                    appointment.doctorName}
                                            </td>
                                            <td className="px-4 py-2">
                                                {appointment.treatmentId?.title || appointment.treatmentName}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded text-xs ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {appointment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                ) : pastAppointments.length === 0 ? (
                    <p className="text-gray-500">No past appointments.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Hospital</th>
                                    <th className="px-4 py-2">Doctor</th>
                                    <th className="px-4 py-2">Treatment</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastAppointments.map((appointment) => (
                                    <tr key={appointment._id} className="border-b">
                                        <td className="px-4 py-2">
                                            {formatDate(appointment.appointmentDate)}<br />
                                            <span className="text-sm text-gray-600">{appointment.appointmentTime}</span>
                                        </td>
                                        <td className="px-4 py-2">
                                            {appointment.hospitalId?.name || appointment.hospitalName}
                                        </td>
                                        <td className="px-4 py-2">
                                            {appointment.doctorId ?
                                                `${appointment.doctorId.firstName} ${appointment.doctorId.lastName}` :
                                                appointment.doctorName}
                                        </td>
                                        <td className="px-4 py-2">
                                            {appointment.treatmentId?.title || appointment.treatmentName}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            {showDetailsModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl max-h-screen overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Patient Details</h2>

                        <div className="space-y-6">
                            {/* Address Information */}
                            <div>
                                <h3 className="text-lg font-medium mb-2">Address Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                        <input
                                            type="text"
                                            name="address.street"
                                            value={formData.address.street}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="address.city"
                                            value={formData.address.city}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="address.state"
                                            value={formData.address.state}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                        <input
                                            type="text"
                                            name="address.country"
                                            value={formData.address.country}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="address.zipCode"
                                            value={formData.address.zipCode}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div>
                                <h3 className="text-lg font-medium mb-2">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="emergencyContact.name"
                                            value={formData.emergencyContact.name}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Relationship</label>
                                        <input
                                            type="text"
                                            name="emergencyContact.relationship"
                                            value={formData.emergencyContact.relationship}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            name="emergencyContact.phone"
                                            value={formData.emergencyContact.phone}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Insurance Information */}
                            <div>
                                <h3 className="text-lg font-medium mb-2">Insurance Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Provider</label>
                                        <input
                                            type="text"
                                            name="insurance.provider"
                                            value={formData.insurance.provider}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Policy Number</label>
                                        <input
                                            type="text"
                                            name="insurance.policyNumber"
                                            value={formData.insurance.policyNumber}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Group Number</label>
                                        <input
                                            type="text"
                                            name="insurance.groupNumber"
                                            value={formData.insurance.groupNumber}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Medical History */}
                            <div>
                                <h3 className="text-lg font-medium mb-2">Medical History</h3>
                                {formData.medicalHistory.map((history, index) => (
                                    <div key={index} className="border p-4 rounded mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium">Condition {index + 1}</h4>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('medicalHistory', index)}
                                                    className="text-red-600 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Condition</label>
                                                <input
                                                    type="text"
                                                    value={history.condition}
                                                    onChange={(e) => handleArrayChange('medicalHistory', index, {
                                                        ...history,
                                                        condition: e.target.value
                                                    })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Diagnosis Date</label>
                                                <input
                                                    type="date"
                                                    value={history.diagnosisDate}
                                                    onChange={(e) => handleArrayChange('medicalHistory', index, {
                                                        ...history,
                                                        diagnosisDate: e.target.value
                                                    })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                    max={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Notes</label>
                                                <textarea
                                                    value={history.notes}
                                                    onChange={(e) => handleArrayChange('medicalHistory', index, {
                                                        ...history,
                                                        notes: e.target.value
                                                    })}
                                                    rows="3"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addArrayItem('medicalHistory', { condition: '', diagnosisDate: '', notes: '' })}
                                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300"
                                >
                                    + Add Another Condition
                                </button>
                            </div>

                            {/* Allergies */}
                            <div>
                                <h3 className="text-lg font-medium mb-2">Allergies</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {formData.allergies.map((allergy, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="text"
                                                value={allergy}
                                                onChange={(e) => handleArrayChange('allergies', index, e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-md p-2"
                                                placeholder="Allergy"
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('allergies', index)}
                                                    className="ml-2 text-red-600"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addArrayItem('allergies', '')}
                                    className="mt-2 bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300"
                                >
                                    + Add Another Allergy
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowDetailsModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveDetails}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;