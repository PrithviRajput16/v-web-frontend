import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalManagement = () => {
    const [hospitals, setHospitals] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentHospital, setCurrentHospital] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        city: '',
        image: '',
        specialties: '',
        rating: '',
        beds: '',
        accreditation: '',
        phone: '',
        blurb: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const limit = 10;

    // Fetch hospitals
    const fetchHospitals = async (pageNum = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }
            const response = await fetch(
                `http://localhost:6003/api/admin/hospitals?page=${pageNum}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const result = await response.json();
            if (result.success) {
                setHospitals(result.data);
                setTotal(result.total);
                setPage(result.page);
                setPages(result.pages);
            } else {
                console.error('Failed to fetch hospitals:', result.error);
                alert('Failed to fetch hospitals: ' + result.error);
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    navigate('/admin/login');
                }
            }
        } catch (err) {
            console.error('Failed to fetch hospitals:', err);
            alert('Failed to fetch hospitals');
        } finally {
            setLoading(false);
        }
    };

 

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add hospital
    const handleAddHospital = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        const data = {
            name: formData.name,
            country: formData.country,
            city: formData.city,
            image: formData.image,
            specialties: formData.specialties ? formData.specialties.split(',').map(s => s.trim()) : [],
            rating: formData.rating ? parseFloat(formData.rating) : undefined,
            beds: formData.beds ? parseInt(formData.beds) : undefined,
            accreditation: formData.accreditation ? formData.accreditation.split(',').map(a => a.trim()) : [],
            phone: formData.phone,
            blurb: formData.blurb
        };
        try {
            const response = await fetch('http://localhost:6003/api/admin/hospitals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert('Hospital added successfully');
                setFormData({
                    name: '', country: '', city: '', image: '', specialties: '',
                    rating: '', beds: '', accreditation: '', phone: '', blurb: ''
                });
                fetchHospitals(page, search);
            } else {
                console.error('Failed to add hospital:', result.error);
                alert('Failed to add hospital: ' + result.error);
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    navigate('/admin');
                }
            }
        } catch (err) {
            console.error('Error adding hospital:', err);
            alert('Failed to add hospital');
        } finally {
            setLoading(false);
        }
    };

    // Open update modal
    const openUpdateModal = (hospital) => {
        setCurrentHospital(hospital);
        setFormData({
            name: hospital.name,
            country: hospital.country,
            city: hospital.city,
            image: hospital.image,
            specialties: hospital.specialties.join(', '),
            rating: hospital.rating || '',
            beds: hospital.beds || '',
            accreditation: hospital.accreditation.join(', '),
            phone: hospital.phone,
            blurb: hospital.blurb
        });
        setIsModalOpen(true);
    };

    //add hospital modal
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    // Update hospital
    const handleUpdateHospital = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        const data = {
            name: formData.name,
            country: formData.country,
            city: formData.city,
            image: formData.image,
            specialties: formData.specialties ? formData.specialties.split(',').map(s => s.trim()) : [],
            rating: formData.rating ? parseFloat(formData.rating) : undefined,
            beds: formData.beds ? parseInt(formData.beds) : undefined,
            accreditation: formData.accreditation ? formData.accreditation.split(',').map(a => a.trim()) : [],
            phone: formData.phone,
            blurb: formData.blurb
        };
        try {
            const response = await fetch(`http://localhost:6003/api/admin/hospitals/${currentHospital._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert('Hospital updated successfully');
                setIsModalOpen(false);
                fetchHospitals(page, search);
            } else {
                console.error('Failed to update hospital:', result.error);
                alert('Failed to update hospital: ' + result.error);
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    navigate('/admin/login');
                }
            }
        } catch (err) {
            console.error('Error updating hospital:', err);
            alert('Failed to update hospital');
        } finally {
            setLoading(false);
        }
    };

    // Delete hospital
    const handleDeleteHospital = async (id) => {
        if (!window.confirm('Are you sure you want to delete this hospital?')) return;
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        try {
            const response = await fetch(`http://localhost:6003/api/admin/hospitals/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) {
                alert('Hospital deleted successfully');
                fetchHospitals(page, search);
            } else {
                console.error('Failed to delete hospital:', result.error);
                alert('Failed to delete hospital: ' + result.error);
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    navigate('/admin/login');
                }
            }
        } catch (err) {
            console.error('Error deleting hospital:', err);
            alert('Failed to delete hospital');
        } finally {
            setLoading(false);
        }
    };

    // Handle search
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
        fetchHospitals(1, e.target.value);
    };

    // Pagination
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            fetchHospitals(page - 1, search);
        }
    };

    const handleNextPage = () => {
        if (page < pages) {
            setPage(page + 1);
            fetchHospitals(page + 1, search);
        }
    };

    // Logout
    const handleLogout = async () => {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        try {
            const response = await fetch('http://localhost:6003/api/admin/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
            } else {
                console.error('Failed to logout:', result.error);
                alert('Failed to logout');
            }
        } catch (err) {
            console.error('Error logging out:', err);
            alert('Failed to logout');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchHospitals();
        }
    }, [navigate]);

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Hospital Management</h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>


            </header>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    {/* <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"></div> */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Hospital</h2>
                        <form onSubmit={handleAddHospital} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input
                                        type="te"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Specialties (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="specialties"
                                        value={formData.specialties}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Number of Beds</label>
                                    <input
                                        type="number"
                                        name="beds"
                                        value={formData.beds}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Accreditations (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="accreditation"
                                        value={formData.accreditation}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blurb</label>
                                <textarea
                                    name="blurb"
                                    value={formData.blurb}
                                    onChange={handleInputChange}
                                    required
                                    maxLength="500"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className='flex gap-4'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add Hospital
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            <div className="bg-white p-6 rounded-lg shadow">
                <div className='flex justify-between items-center mb-6'>
                    <h2 className="text-xl font-semibold mb-4">Hospital List</h2>
                    <button
                        onClick={() => openAddModal()}
                        className='bg-[#008080] text-white px-4 py-2 rounded hover:bg-red-600'
                    >
                        + Add Hospital
                    </button>
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by name, city, or country"
                    className="mb-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Country</th>
                            <th className="px-4 py-2">City</th>
                            <th className="px-4 py-2">Rating</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.map((hospital) => (
                            <tr key={hospital._id}>
                                <td className="border px-4 py-2">{hospital.name}</td>
                                <td className="border px-4 py-2">{hospital.country}</td>
                                <td className="border px-4 py-2">{hospital.city}</td>
                                <td className="border px-4 py-2">{hospital.rating || 'N/A'}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => openUpdateModal(hospital)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteHospital(hospital._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>Page {page} of {pages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={page === pages}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                        <h2 className="text-xl font-semibold mb-4">Update Hospital</h2>
                        <form onSubmit={handleUpdateHospital} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Specialties (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="specialties"
                                        value={formData.specialties}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Number of Beds</label>
                                    <input
                                        type="number"
                                        name="beds"
                                        value={formData.beds}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Accreditations (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="accreditation"
                                        value={formData.accreditation}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blurb</label>
                                <textarea
                                    name="blurb"
                                    value={formData.blurb}
                                    onChange={handleInputChange}
                                    required
                                    maxLength="500"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HospitalManagement;