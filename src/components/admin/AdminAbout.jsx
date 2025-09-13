import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url_prefix from "../../data/variable";
import ImageUpload from './ImageUpload'; // Import the ImageUpload component

const AboutManagement = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    // Initial empty state
    const initialData = {
        title: "",
        subtitle: "",
        missionTitle: "",
        missionDescription: "",
        image: "",
        whatsappNumber: "",
        whatsappMessage: "",
        highlights: [
            { icon: "HeartPulse", text: "" },
            { icon: "Stethoscope", text: "" },
            { icon: "Users", text: "" }
        ]
    };

    // Fetch about data
    const fetchAboutData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }

            const response = await fetch(url_prefix + '/api/admin/about', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await response.json();

            if (result.success) {
                setAboutData(result.data || initialData);
            } else {
                console.error('Failed to fetch about data:', result.error);
                setAboutData(initialData); // Fallback to initial data on error
            }
        } catch (err) {
            console.error('Error fetching about data:', err);
            setAboutData(initialData); // Fallback to initial data on error
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAboutData(prev => ({ ...prev, [name]: value }));
    };

    // Handle image upload
    const handleImageUpload = (imageUrl) => {
        setAboutData(prev => ({ ...prev, image: imageUrl }));
    };

    // Handle highlight changes
    const handleHighlightChange = (index, field, value) => {
        setAboutData(prev => ({
            ...prev,
            highlights: prev.highlights.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    // Add new highlight
    const addHighlight = () => {
        setAboutData(prev => ({
            ...prev,
            highlights: [...prev.highlights, { icon: "HeartPulse", text: "" }]
        }));
    };

    // Remove highlight
    const removeHighlight = (index) => {
        if (aboutData.highlights.length > 1) {
            setAboutData(prev => ({
                ...prev,
                highlights: prev.highlights.filter((_, i) => i !== index)
            }));
        }
    };

    // Save about data
    const saveAboutData = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }

            const response = await fetch(url_prefix + '/api/admin/about', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(aboutData),
            });

            const result = await response.json();
            if (result.success) {
                alert('About page updated successfully!');
            } else {
                alert('Failed: ' + result.error);
            }
        } catch (err) {
            console.error('Error saving about data:', err);
            alert('Error saving about page data');
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
        } else {
            fetchAboutData();
        }
    }, [navigate]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!aboutData) return <div className="p-6">Loading about data...</div>;

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">About Page Management</h1>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Dashboard
                </button>
            </header>

            <div className="bg-white p-6 rounded-lg shadow">
                <form onSubmit={saveAboutData} className="space-y-6">
                    {/* Basic Information */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={aboutData.title}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={aboutData.subtitle}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mission Title</label>
                                <input
                                    type="text"
                                    name="missionTitle"
                                    value={aboutData.missionTitle}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <ImageUpload
                                    onImageUpload={handleImageUpload}
                                    currentImage={aboutData.image}
                                    folder="about"
                                    maxSize={5}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mission Description */}
                    <div className="border-b pb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mission Description</label>
                        <textarea
                            name="missionDescription"
                            value={aboutData.missionDescription}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* WhatsApp Information */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4">WhatsApp Configuration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                                <input
                                    type="text"
                                    name="whatsappNumber"
                                    value={aboutData.whatsappNumber}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded mt-1"
                                    placeholder="+1234567890"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Default Message</label>
                                <input
                                    type="text"
                                    name="whatsappMessage"
                                    value={aboutData.whatsappMessage}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded mt-1"
                                    placeholder="Hello! I have a question..."
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="border-b pb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Highlights</h2>
                            <button
                                type="button"
                                onClick={addHighlight}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                            >
                                + Add Highlight
                            </button>
                        </div>
                        {aboutData.highlights.map((highlight, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Icon Name</label>
                                    <select
                                        value={highlight.icon}
                                        onChange={(e) => handleHighlightChange(index, 'icon', e.target.value)}
                                        className="w-full border p-2 rounded mt-1"
                                    >
                                        <option value="HeartPulse">Heart Pulse</option>
                                        <option value="Stethoscope">Stethoscope</option>
                                        <option value="Users">Users</option>
                                        <option value="Star">Star</option>
                                        <option value="Shield">Shield</option>
                                        <option value="Award">Award</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <div className="flex-grow">
                                        <label className="block text-sm font-medium text-gray-700">Text</label>
                                        <input
                                            type="text"
                                            value={highlight.text}
                                            onChange={(e) => handleHighlightChange(index, 'text', e.target.value)}
                                            className="w-full border p-2 rounded mt-1"
                                            required
                                        />
                                    </div>
                                    {aboutData.highlights.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeHighlight(index)}
                                            className="ml-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AboutManagement;