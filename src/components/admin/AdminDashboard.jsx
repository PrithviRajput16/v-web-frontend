import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:6003/api/admin/dashboard/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) setStats(result.data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Hospitals</h3>
                    <p className="text-3xl font-bold text-teal-600">{stats?.totalHospitals}</p>
                    <p className="text-sm text-gray-600">{stats?.activeHospitals} active</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Doctors</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats?.totalDoctors}</p>
                    <p className="text-sm text-gray-600">{stats?.activeDoctors} active</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Treatments</h3>
                    <p className="text-3xl font-bold text-green-600">{stats?.totalTreatments}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/admin/hospitals" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold">Manage Hospitals</h3>
                </Link>
                <Link to="/admin/doctors" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold">Manage Doctors</h3>
                </Link>
                <Link to="/admin/treatments" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold">Manage Treatments</h3>
                </Link>
                <Link to="/admin/hospital-treatments" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold">Manage Pricing</h3>
                </Link>
                <Link to="/admin/doctor-treatment" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold">Manage Doctor Treatments</h3>
                </Link>
                <Link to="/admin/hospital-treatment" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="font-semibold">Manage Hospital Treatments</h3>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;