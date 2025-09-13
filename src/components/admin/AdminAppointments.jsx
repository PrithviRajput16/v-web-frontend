import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url_prefix from "../../data/variable";
const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const limit = 10000;

    // Fetch bookings
    const fetchBookings = async (pageNum = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }
            const response = await fetch(
                `${url_prefix}/api/admin/bookings?page=${pageNum}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const result = await response.json();
            if (result.success) {
                setBookings(result.data);
                setTotal(result.total);
                setPage(result.page);
                setPages(result.pages);
                console.log(result.data[0]);
            }
            else {
                console.error('Failed to fetch bookings:', result.error);
                if (response.status === 401) {
                    localStorage.removeItem('adminToken');
                    navigate('/admin');
                }
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    // WhatsApp confirmation function
    const sendWhatsAppConfirmation = (booking) => {
        // Format the phone number (remove any non-digit characters and add country code)
        const phoneNumber = booking.phone.replace(/\D/g, '');

        // If phone number doesn't start with country code, add India code (91)
        const formattedPhone = phoneNumber.startsWith('91') ? phoneNumber : `91${phoneNumber}`;

        // Create the confirmation message
        const message = `
*APPOINTMENT CONFIRMATION* ✅

Dear ${booking.name},

Your appointment has been confirmed with the following details:

*Doctor:* Dr. ${booking.doctor?.firstName} ${booking.doctor?.lastName}
*Hospital:* ${booking.hospital?.name}
*Date:* ${new Date(booking.date).toLocaleDateString()}
*Time:* ${booking.time}

*Patient Details:*
Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}

Please arrive 15 minutes before your scheduled time.
Bring any previous medical reports and your ID proof.


*Note:* ${booking.message || 'No additional notes provided.'}

We look forward to seeing you!

Best regards,
Medical Team
    `.trim();

        // Create WhatsApp link
        const whatsappLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(whatsappLink, '_blank');

        // Optional: Mark as replied in the system
        updateBookingStatus(booking._id, { replied: true, read: true });

        // Show success message
        alert('WhatsApp confirmation message opened!');
    };

    // Update booking status
    const updateBookingStatus = async (bookingId, updates) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }

            const response = await fetch(`${url_prefix}/api/admin/bookings/${bookingId}?page=1&limit=10000`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
            });

            const result = await response.json();
            if (result.success) {
                alert('Booking status updated successfully');
                setIsModalOpen(false);
                fetchBookings(page, search);
            } else {
                alert('Failed: ' + result.error);
            }
        } catch (err) {
            console.error('Error updating booking:', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete booking
    const handleDeleteBooking = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
            return;
        }

        try {
            const response = await fetch(`${url_prefix}/api/admin/bookings/${id}?page=1&limit=100000`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await response.json();
            if (result.success) {
                alert('Booking deleted successfully');
                fetchBookings(page, search);
            } else {
                alert('Failed: ' + result.error);
            }
        } catch (err) {
            console.error('Error deleting booking:', err);
        } finally {
            setLoading(false);
        }
    };

    // Open update modal
    const openUpdateModal = (booking) => {
        setCurrentBooking(booking);
        setIsModalOpen(true);
    };

    // Search
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
        fetchBookings(1, e.target.value);
    };

    // Pagination
    const handlePrevPage = () => {
        if (page > 1) fetchBookings(page - 1, search);
    };
    const handleNextPage = () => {
        if (page < pages) fetchBookings(page + 1, search);
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
        } else {
            fetchBookings();
        }
    }, [navigate]);

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Booking Management</h1>
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

            {/* Update Booking Modal */}
            {isModalOpen && currentBooking && (
                <BookingModal
                    booking={currentBooking}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={updateBookingStatus}
                />
            )}

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Booking List</h2>
                    <span className="text-sm text-gray-600">Total: {total} bookings</span>
                </div>

                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by name, email, phone, doctor, or hospital"
                    className="mb-4 w-full p-2 rounded-md border border-gray-300 shadow-sm"
                />

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Patient</th>
                                <th className="px-4 py-2">Contact</th>
                                <th className="px-4 py-2">Doctor</th>
                                <th className="px-4 py-2">Hospital</th>
                                <th className="px-4 py-2">Date & Time</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Created</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        <div className="font-medium">{booking.name}</div>
                                        {booking.message && (
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {booking.message}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>{booking.email}</div>
                                        <div className="text-sm text-gray-600">{booking.phone}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {booking.doctor?.firstName} {booking.doctor?.lastName}
                                    </td>
                                    <td className="px-4 py-2">{booking.hospital?.name}</td>
                                    <td className="px-4 py-2">
                                        <div>{new Date(booking.date).toLocaleDateString()}</div>
                                        <div className="text-sm text-gray-600">{booking.time}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col space-y-2">
                                            {/* WhatsApp Confirmation Button */}
                                            <button
                                                onClick={() => sendWhatsAppConfirmation(booking)}
                                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm flex items-center justify-center"
                                                title="Send WhatsApp Confirmation"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                                                </svg>
                                                WhatsApp
                                            </button>

                                            {/* Update Button */}
                                            <button
                                                onClick={() => openUpdateModal(booking)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                                            >
                                                Update
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDeleteBooking(booking._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {bookings.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                        No bookings found
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400"
                    >
                        Previous
                    </button>
                    <span className="text-sm">Page {page} of {pages}</span>
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

// Status Badge Component
const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        if (status.read && status.replied && status.confirmed) return 'bg-green-100 text-green-800';
        if (status.read && status.replied) return 'bg-blue-100 text-blue-800';
        if (status.read) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    const getStatusText = (status) => {
        if (status.read && status.replied && status.confirmed) return 'Confirmed';
        if (status.read && status.replied) return 'Replied';
        if (status.read) return 'Read';
        return 'Unread';
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {getStatusText(status)}
        </span>
    );
};

// Booking Modal Component
const BookingModal = ({ booking, onClose, onUpdate }) => {
    const [status, setStatus] = useState(booking.status);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = (field, value) => {
        setStatus(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onUpdate(booking._id, status);
        } catch (error) {
            console.error('Error updating booking:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Update Booking Status</h2>

                <div className="mb-4 p-4 bg-gray-50 rounded">
                    <h3 className="font-medium mb-2">Booking Details:</h3>
                    <p><strong>Patient:</strong> {booking.name}</p>
                    <p><strong>Doctor:</strong> {booking.doctor}</p>
                    <p><strong>Hospital:</strong> {booking.hospital}</p>
                    <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    {booking.message && (
                        <p><strong>Message:</strong> {booking.message}</p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>

                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={status.read}
                                    onChange={(e) => handleStatusChange('read', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Mark as Read</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={status.replied}
                                    onChange={(e) => handleStatusChange('replied', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Mark as Replied</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={status.confirmed}
                                    onChange={(e) => handleStatusChange('confirmed', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Mark as Confirmed</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Status'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingManagement;