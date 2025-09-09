import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hospital Treatment Management Component
const HospitalTreatmentManagement = () => {
    const [treatments, setTreatments] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [allTreatments, setAllTreatments] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentTreatment, setCurrentTreatment] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const limit = 10;

    const initialFormData = {
        hospital: '',
        treatment: '',
        price: 0,
        discount: 0,
        availability: 'Available',
        waitingPeriod: 0,
        specialNotes: '',
        isActive: true
    };

    const [formData, setFormData] = useState(initialFormData);

    // Fetch hospital treatments
    const fetchHospitalTreatments = async (pageNum = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }
            const response = await fetch(
                `http://localhost:6003/api/admin/hospital-treatments?page=${pageNum}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const result = await response.json();
            if (result.success) {
                setTreatments(result.data);
                setTotal(result.total);
                setPage(result.page);
                setPages(result.pages);
            } else {
                console.error('Failed to fetch hospital treatments:', result.error);
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    navigate('/admin');
                }
            }
        } catch (err) {
            console.error('Error fetching hospital treatments:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch hospitals for dropdown
    const fetchHospitals = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) return;

            const response = await fetch('http://localhost:6003/api/admin/hospitals', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await response.json();
            if (result.success) {
                setHospitals(result.data);
            }
        } catch (err) {
            console.error('Error fetching hospitals:', err);
        }
    };

    // Fetch all treatments for dropdown
    const fetchAllTreatments = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) return;

            const response = await fetch('http://localhost:6003/api/admin/treatments', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await response.json();
            if (result.success) {
                setAllTreatments(result.data);
            }
        } catch (err) {
            console.error('Error fetching treatments:', err);
        }
    };

    // Input handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add hospital treatment
    const handleAddHospitalTreatment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        const data = {
            ...formData,
            price: Number(formData.price),
            discount: Number(formData.discount),
            waitingPeriod: Number(formData.waitingPeriod),
            isActive: formData.isActive === 'true' || formData.isActive === true
        };

        try {
            const response = await fetch('http://localhost:6003/api/admin/hospital-treatments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                alert('Hospital treatment added successfully');
                setIsAddModalOpen(false);
                setFormData(initialFormData);
                fetchHospitalTreatments(page, search);
            } else {
                alert('Failed: ' + result.error);
            }
        } catch (err) {
            console.error('Error adding hospital treatment:', err);
        } finally {
            setLoading(false);
        }
    };

    // Update hospital treatment modal
    const openUpdateModal = (treatment) => {
        setCurrentTreatment(treatment);
        setFormData({
            hospital: treatment.hospital?._id || treatment.hospital,
            treatment: treatment.treatment?._id || treatment.treatment,
            price: treatment.price || 0,
            discount: treatment.discount || 0,
            availability: treatment.availability || 'Available',
            waitingPeriod: treatment.waitingPeriod || 0,
            specialNotes: treatment.specialNotes || '',
            isActive: treatment.isActive
        });
        setIsModalOpen(true);
    };

    // Update hospital treatment
    const handleUpdateHospitalTreatment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        const data = {
            ...formData,
            price: Number(formData.price),
            discount: Number(formData.discount),
            waitingPeriod: Number(formData.waitingPeriod),
            isActive: formData.isActive === 'true' || formData.isActive === true
        };

        try {
            const response = await fetch(`http://localhost:6003/api/admin/hospital-treatments/${currentTreatment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                alert('Hospital treatment updated successfully');
                setIsModalOpen(false);
                fetchHospitalTreatments(page, search);
            } else {
                alert('Failed: ' + result.error);
            }
        } catch (err) {
            console.error('Error updating hospital treatment:', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete hospital treatment
    const handleDeleteHospitalTreatment = async (id) => {
        if (!window.confirm('Are you sure you want to delete this hospital treatment?')) return;
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        try {
            const response = await fetch(`http://localhost:6003/api/admin/hospital-treatments/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await response.json();
            if (result.success) {
                alert('Hospital treatment deleted successfully');
                fetchHospitalTreatments(page, search);
            } else {
                alert('Failed: ' + result.error);
            }
        } catch (err) {
            console.error('Error deleting hospital treatment:', err);
        } finally {
            setLoading(false);
        }
    };

    // Search
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
        fetchHospitalTreatments(1, e.target.value);
    };

    // Pagination
    const handlePrevPage = () => {
        if (page > 1) fetchHospitalTreatments(page - 1, search);
    };
    const handleNextPage = () => {
        if (page < pages) fetchHospitalTreatments(page + 1, search);
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
        } else {
            fetchHospitalTreatments();
            fetchHospitals();
            fetchAllTreatments();
        }
    }, [navigate]);

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Hospital Treatment Management</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem('adminToken');
                        navigate('/admin');
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            {/* Add Hospital Treatment Modal */}
            {isAddModalOpen && (
                <HospitalTreatmentForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleAddHospitalTreatment}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setFormData(initialFormData);
                    }}
                    hospitals={hospitals}
                    allTreatments={allTreatments}
                    title="Add New Hospital Treatment"
                />
            )}

            {/* Update Hospital Treatment Modal */}
            {isModalOpen && (
                <HospitalTreatmentForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleUpdateHospitalTreatment}
                    onClose={() => setIsModalOpen(false)}
                    hospitals={hospitals}
                    allTreatments={allTreatments}
                    title="Update Hospital Treatment"
                />
            )}

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Hospital Treatment List</h2>
                    <button
                        onClick={() => {
                            setFormData(initialFormData);
                            setIsAddModalOpen(true);
                        }}
                        className="bg-[#008080] text-white px-4 py-2 rounded hover:bg-teal-600"
                    >
                        + Add Hospital Treatment
                    </button>
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by hospital or treatment"
                    className="mb-4 w-full p-2 rounded-md border border-gray-300 shadow-sm"
                />
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Hospital</th>
                                <th className="px-4 py-2">Treatment</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Discount</th>
                                <th className="px-4 py-2">Final Price</th>
                                <th className="px-4 py-2">Availability</th>
                                <th className="px-4 py-2">Waiting Period</th>
                                <th className="px-4 py-2">Active</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treatments.map((ht) => (
                                <tr key={ht._id} className="border-b">
                                    <td className="px-4 py-2">{ht.hospital?.name || 'N/A'}</td>
                                    <td className="px-4 py-2">{ht.treatment?.title || 'N/A'}</td>
                                    <td className="px-4 py-2">₹{ht.price}</td>
                                    <td className="px-4 py-2">{ht.discount}%</td>
                                    <td className="px-4 py-2">₹{ht.price - ht.price * ht.discount / 100}</td>
                                    <td className="px-4 py-2">{ht.availability}</td>
                                    <td className="px-4 py-2">{ht.waitingPeriod} days</td>
                                    <td className="px-4 py-2">{ht.isActive ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => openUpdateModal(ht)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteHospitalTreatment(ht._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400"
                    >
                        Previous
                    </button>
                    <span className="text-sm">Page {page} of {pages} (Total: {total})</span>
                    <button
                        onClick={handleNextPage}
                        disabled={page === pages}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

const HospitalTreatmentForm = ({
    formData,
    handleInputChange,
    handleSubmit,
    onClose,
    hospitals,
    allTreatments,
    title
}) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-screen overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hospital</label>
                            <select
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Select Hospital</option>
                                {hospitals.map(hospital => (
                                    <option key={hospital._id} value={hospital._id}>
                                        {hospital.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Treatment</label>
                            <select
                                name="treatment"
                                value={formData.treatment}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Select Treatment</option>
                                {allTreatments.map(treatment => (
                                    <option key={treatment._id} value={treatment._id}>
                                        {treatment.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                min="0"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Availability</label>
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="Available">Available</option>
                                <option value="Limited">Limited</option>
                                <option value="Waitlist">Waitlist</option>
                                <option value="Not Available">Not Available</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Waiting Period (days)</label>
                            <input
                                type="number"
                                name="waitingPeriod"
                                value={formData.waitingPeriod}
                                onChange={handleInputChange}
                                min="0"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        {/* <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Special Notes</label>
                            <textarea
                                name="specialNotes"
                                value={formData.specialNotes}
                                onChange={handleInputChange}
                                rows="3"
                                maxLength="500"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                            <p className="text-xs text-gray-500">{formData.specialNotes.length}/500 characters</p>
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                name="isActive"
                                value={formData.isActive}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HospitalTreatmentManagement;
