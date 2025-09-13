import {
    ArrowLeft,
    Award,
    HeartPulse,
    ImageIcon,
    Mail,
    MessageCircle,
    Phone,
    Plus,
    Save,
    Shield,
    Star,
    Stethoscope,
    Users,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url_prefix from "../../data/variable";
import ImageUpload from './ImageUpload';

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
        email: "",
        highlights: [
            { icon: "HeartPulse", text: "" },
            { icon: "Stethoscope", text: "" },
            { icon: "Users", text: "" }
        ]
    };

    // Icon options with mapping to components
    const iconOptions = [
        { value: "HeartPulse", label: "Heart Pulse", icon: <HeartPulse className="w-4 h-4" /> },
        { value: "Stethoscope", label: "Stethoscope", icon: <Stethoscope className="w-4 h-4" /> },
        { value: "Users", label: "Users", icon: <Users className="w-4 h-4" /> },
        { value: "Star", label: "Star", icon: <Star className="w-4 h-4" /> },
        { value: "Shield", label: "Shield", icon: <Shield className="w-4 h-4" /> },
        { value: "Award", label: "Award", icon: <Award className="w-4 h-4" /> }
    ];

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
                setAboutData(initialData);
            }
        } catch (err) {
            console.error('Error fetching about data:', err);
            setAboutData(initialData);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-center">
                    <div className="rounded-full bg-teal-100 h-12 w-12 mx-auto mb-4"></div>
                    <p className="text-teal-600">Loading about data...</p>
                </div>
            </div>
        );
    }

    if (!aboutData) return <div className="p-6">Loading about data...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 p-6 bg-white rounded-xl shadow-sm">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">About Page Management</h1>
                        <p className="text-gray-600 mt-2">Customize your about page content and appearance</p>
                    </div>
                    <div className="flex space-x-3 mt-4 sm:mt-0">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Dashboard
                        </button>
                        <button
                            type="submit"
                            form="about-form"
                            disabled={saving}
                            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <form id="about-form" onSubmit={saveAboutData} className="space-y-8 p-6">
                        {/* Basic Information Section */}
                        <div className="border-b border-gray-100 pb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <ImageIcon className="w-5 h-5 mr-2 text-teal-600" />
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={aboutData.title}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                        placeholder="About Our Company"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        name="subtitle"
                                        value={aboutData.subtitle}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                        placeholder="Brief description of your company"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mission Title</label>
                                    <input
                                        type="text"
                                        name="missionTitle"
                                        value={aboutData.missionTitle}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                        placeholder="Our Mission"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                                    <ImageUpload
                                        onImageUpload={handleImageUpload}
                                        currentImage={aboutData.image}
                                        folder="about"
                                        maxSize={5}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mission Description Section */}
                        <div className="border-b border-gray-100 pb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mission Description</h2>
                            <textarea
                                name="missionDescription"
                                value={aboutData.missionDescription}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                                placeholder="Describe your company's mission and values..."
                            />
                        </div>

                        {/* Contact Information Section */}
                        <div className="border-b border-gray-100 pb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <MessageCircle className="w-5 h-5 mr-2 text-teal-600" />
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <Phone className="w-4 h-4 mr-1" />
                                        WhatsApp Number
                                    </label>
                                    <input
                                        type="text"
                                        name="whatsappNumber"
                                        value={aboutData.whatsappNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="+1234567890"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        Default WhatsApp Message
                                    </label>
                                    <input
                                        type="text"
                                        name="whatsappMessage"
                                        value={aboutData.whatsappMessage}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="Hello! I have a question..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <Mail className="w-4 h-4 mr-1" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={aboutData.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="contact@example.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Highlights Section */}
                        <div className="pb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Key Highlights</h2>
                                <button
                                    type="button"
                                    onClick={addHighlight}
                                    className="flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Highlight
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {aboutData.highlights.map((highlight, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="w-full md:w-1/4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                            <div className="relative">
                                                <select
                                                    value={highlight.icon}
                                                    onChange={(e) => handleHighlightChange(index, 'icon', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                >
                                                    {iconOptions.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    {iconOptions.find(opt => opt.value === highlight.icon)?.icon}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={highlight.text}
                                                    onChange={(e) => handleHighlightChange(index, 'text', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                    required
                                                    placeholder="Enter highlight text"
                                                />
                                                {aboutData.highlights.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeHighlight(index)}
                                                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Remove highlight"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors shadow-md"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                {saving ? 'Saving Changes...' : 'Save All Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AboutManagement;