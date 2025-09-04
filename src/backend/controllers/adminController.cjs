const Admin = require('../models/Admin.cjs');
const Hospital = require('../models/Hospital.cjs');
const Doctor = require('../models/Doctor.cjs');
const Treatment = require('../models/Treatments.cjs'); // ✅ FIXED - Remove the 's'
const HospitalTreatment = require('../models/HospitalTreatment.cjs');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide username and password'
            });
        }

        const admin = await Admin.findOne({ username, isActive: true });

        if (!admin || !(await admin.correctPassword(password, admin.password))) {
            return res.status(401).json({
                success: false,
                error: 'Incorrect username or password'
            });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        const token = signToken(admin._id);

        res.status(200).json({
            success: true,
            token,
            data: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                permissions: admin.permissions
            }
        });
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Admin Logout
exports.adminLogout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        console.error('Admin logout error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const [
            totalHospitals,
            totalDoctors,
            totalTreatments,
            totalHospitalTreatments,
            activeHospitals,
            activeDoctors
        ] = await Promise.all([
            Hospital.countDocuments(),
            Doctor.countDocuments(),
            Treatment.countDocuments(),
            HospitalTreatment.countDocuments(),
            Hospital.countDocuments({ isActive: true }),
            Doctor.countDocuments({ isActive: true })
        ]);

        res.json({
            success: true,
            data: {
                totalHospitals,
                totalDoctors,
                totalTreatments,
                totalHospitalTreatments,
                activeHospitals,
                activeDoctors
            }
        });
    } catch (err) {
        console.error('Get dashboard stats error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Hospital Management
exports.getHospitals = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { name: new RegExp(search, 'i') },
                { city: new RegExp(search, 'i') },
                { country: new RegExp(search, 'i') }
            ];
        }

        const hospitals = await Hospital.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Hospital.countDocuments(filter);

        res.json({
            success: true,
            count: hospitals.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: hospitals
        });
    } catch (err) {
        console.error('Get hospitals error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Similar methods for doctors, treatments, etc...
exports.getDoctors = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, hospital } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { firstName: new RegExp(search, 'i') },
                { lastName: new RegExp(search, 'i') },
                { specialty: new RegExp(search, 'i') }
            ];
        }
        if (hospital) filter.hospital = hospital;

        const doctors = await Doctor.find(filter)
            .populate('hospital', 'name city')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Doctor.countDocuments(filter);

        res.json({
            success: true,
            count: doctors.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: doctors
        });
    } catch (err) {
        console.error('Get doctors error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getTreatments = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }
        if (category) filter.category = category;

        const treatments = await Treatment.find(filter)
            .sort({ title: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Treatment.countDocuments(filter);

        res.json({
            success: true,
            count: treatments.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: treatments
        });
    } catch (err) {
        console.error('Get treatments error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getHospitalTreatments = async (req, res) => {
    try {
        const { page = 1, limit = 10, hospital, treatment } = req.query;
        const filter = {};

        if (hospital) filter.hospital = hospital;
        if (treatment) filter.treatment = treatment;

        const hospitalTreatments = await HospitalTreatment.find(filter)
            .populate('hospital', 'name city country image')
            .populate('treatment', 'title category')
            .sort({ finalPrice: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await HospitalTreatment.countDocuments(filter);

        res.json({
            success: true,
            count: hospitalTreatments.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: hospitalTreatments
        });
    } catch (err) {
        console.error('Get hospital treatments error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// CRUD operations for hospitals, doctors, treatments...
exports.createHospital = async (req, res) => {
    try {
        const hospital = await Hospital.create(req.body);
        res.status(201).json({ success: true, data: hospital });
    } catch (err) {
        console.error('Create hospital error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json({ success: true, data: hospital });
    } catch (err) {
        console.error('Update hospital error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Add similar methods for other entities...