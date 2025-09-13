const Admin = require('../models/Admin.cjs');
const Hospital = require('../models/Hospital.cjs');
const Doctor = require('../models/Doctor.cjs');
const Treatment = require('../models/Treatments.cjs'); // ✅ FIXED - Remove the 's'
const HospitalTreatment = require('../models/HospitalTreatment.cjs');
const DoctorTreatment = require('../models/DoctorTreatment.cjs'); // make sure the path is correct
const ProcedureCost = require('../models/ProcedureCost.cjs');
const FAQ = require('../models/FAQ.cjs');
const PatientOpinion = require('../models/PatientOpinions.cjs');
const HospitalDetail = require('../models/HospitalDetail.cjs');



const jwt = require('jsonwebtoken');
// const { default: HospitalDetail } = require('../models/HospitalDetail.cjs');

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

// exports.getHospitalDetails = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search } = req.query;
//         const filter = {};

//         if (search) {
//             filter.$or = [
//                 { description: new RegExp(search, 'i') },
//                 { address: new RegExp(search, 'i') },
//                 { website: new RegExp(search, 'i') },
//                 { email: new RegExp(search, 'i') }
//             ];
//         }

//         const hospitalDetails = await HospitalDetail.find(filter)
//             .populate('hospital')
//             .sort({ createdAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await HospitalDetail.countDocuments(filter);

//         res.json({
//             success: true,
//             count: hospitalDetails.length,
//             total,
//             page: parseInt(page),
//             pages: Math.ceil(total / limit),
//             data: hospitalDetails
//         });
//     } catch (err) {
//         console.error('Get hospital details error:', err);
//         res.status(500).json({ success: false, error: 'Server Error' });
//     }
// };

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

// exports.getTreatments = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search, category } = req.query;
//         const filter = {};

//         if (search) {
//             filter.$or = [
//                 { title: new RegExp(search, 'i') },
//                 { description: new RegExp(search, 'i') }
//             ];
//         }
//         if (category) filter.category = category;

//         const treatments = await Treatment.find(filter)
//             .sort({ title: 1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await Treatment.countDocuments(filter);

//         res.json({
//             success: true,
//             count: treatments.length,
//             total,
//             page: parseInt(page),
//             pages: Math.ceil(total / limit),
//             data: treatments
//         });
//     } catch (err) {
//         console.error('Get treatments error:', err);
//         res.status(500).json({ success: false, error: 'Server Error' });
//     }
// };

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

exports.createHospitalDetails = async (req, res) => {
    try {
        const hospitalDetail = await HospitalDetail.create(req.body);
        res.status(201).json({ success: true, data: hospitalDetail });
    } catch (err) {
        console.error('Create Hospital Detail error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}



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

// ================= DOCTOR CRUD =================

// Create Doctor
exports.createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json({ success: true, data: doctor });
    } catch (err) {
        console.error('Create doctor error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Update Doctor
exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doctor) {
            return res.status(404).json({ success: false, error: 'Doctor not found' });
        }
        res.json({ success: true, data: doctor });
    } catch (err) {
        console.error('Update doctor error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Delete Doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, error: 'Doctor not found' });
        }
        res.json({ success: true, message: 'Doctor deleted successfully' });
    } catch (err) {
        console.error('Delete doctor error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get Single Doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
            .populate('hospital', 'name city')
            .populate('treatments');

        if (!doctor) {
            return res.status(404).json({ success: false, error: 'Doctor not found' });
        }

        res.json({ success: true, data: doctor });
    } catch (err) {
        console.error('Get doctor by id error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// ================= HOSPITAL TREATMENT CRUD =================

// Create HospitalTreatment
exports.createHospitalTreatment = async (req, res) => {
    try {
        const hospitalTreatment = await HospitalTreatment.create(req.body);
        res.status(201).json({ success: true, data: hospitalTreatment });
    } catch (err) {
        console.error('Create hospital treatment error:', err);

        // Handle unique constraint (hospital + treatment already exists)
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'This hospital already offers this treatment'
            });
        }

        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Update HospitalTreatment
exports.updateHospitalTreatment = async (req, res) => {
    try {
        const hospitalTreatment = await HospitalTreatment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!hospitalTreatment) {
            return res.status(404).json({ success: false, error: 'Hospital Treatment not found' });
        }

        res.json({ success: true, data: hospitalTreatment });
    } catch (err) {
        console.error('Update hospital treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Delete HospitalTreatment
exports.deleteHospitalTreatment = async (req, res) => {
    try {
        const hospitalTreatment = await HospitalTreatment.findByIdAndDelete(req.params.id);
        if (!hospitalTreatment) {
            return res.status(404).json({ success: false, error: 'Hospital Treatment not found' });
        }

        res.json({ success: true, message: 'Hospital Treatment deleted successfully' });
    } catch (err) {
        console.error('Delete hospital treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get Single HospitalTreatment by ID
exports.getHospitalTreatmentById = async (req, res) => {
    try {
        const hospitalTreatment = await HospitalTreatment.findById(req.params.id)
            .populate('hospital', 'name city country')
            .populate('treatment', 'title category');

        if (!hospitalTreatment) {
            return res.status(404).json({ success: false, error: 'Hospital Treatment not found' });
        }

        res.json({ success: true, data: hospitalTreatment });
    } catch (err) {
        console.error('Get hospital treatment by id error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// ================= DOCTOR TREATMENT CRUD =================

// Create DoctorTreatment
exports.createDoctorTreatment = async (req, res) => {
    try {
        const doctorTreatment = await DoctorTreatment.create(req.body);
        res.status(201).json({ success: true, data: doctorTreatment });
    } catch (err) {
        console.error('Create doctor treatment error:', err);

        // Handle unique constraint (doctor + treatment already exists)
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'This doctor already has this treatment assigned'
            });
        }

        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Update DoctorTreatment
exports.updateDoctorTreatment = async (req, res) => {
    try {
        const doctorTreatment = await DoctorTreatment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!doctorTreatment) {
            return res.status(404).json({ success: false, error: 'Doctor Treatment not found' });
        }

        res.json({ success: true, data: doctorTreatment });
    } catch (err) {
        console.error('Update doctor treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Delete DoctorTreatment
exports.deleteDoctorTreatment = async (req, res) => {
    try {
        const doctorTreatment = await DoctorTreatment.findByIdAndDelete(req.params.id);
        if (!doctorTreatment) {
            return res.status(404).json({ success: false, error: 'Doctor Treatment not found' });
        }

        res.json({ success: true, message: 'Doctor Treatment deleted successfully' });
    } catch (err) {
        console.error('Delete doctor treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get Single DoctorTreatment by ID
exports.getDoctorTreatmentById = async (req, res) => {
    try {
        const doctorTreatment = await DoctorTreatment.findById(req.params.id)
            .populate('doctor', 'firstName lastName fullName specialty hospital')
            .populate('treatment', 'title category');

        if (!doctorTreatment) {
            return res.status(404).json({ success: false, error: 'Doctor Treatment not found' });
        }

        res.json({ success: true, data: doctorTreatment });
    } catch (err) {
        console.error('Get doctor treatment by id error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get All DoctorTreatments (with filters)
exports.getDoctorTreatments = async (req, res) => {
    try {
        const { page = 1, limit = 10, doctor, treatment } = req.query;
        const filter = {};

        if (doctor) filter.doctor = doctor;
        if (treatment) filter.treatment = treatment;

        const doctorTreatments = await DoctorTreatment.find(filter)
            .populate('doctor', 'firstName lastName fullName specialty hospital')
            .populate('treatment', 'title category')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await DoctorTreatment.countDocuments(filter);

        res.json({
            success: true,
            count: doctorTreatments.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: doctorTreatments
        });
    } catch (err) {
        console.error('Get doctor treatments error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// ================= TREATMENT CRUD =================

// Create Treatment
exports.createTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.create(req.body);
        res.status(201).json({ success: true, data: treatment });
    } catch (err) {
        console.error('Create treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Update Treatment
exports.updateTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!treatment) {
            return res.status(404).json({ success: false, error: 'Treatment not found' });
        }

        res.json({ success: true, data: treatment });
    } catch (err) {
        console.error('Update treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Delete Treatment
exports.deleteTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findByIdAndDelete(req.params.id);

        if (!treatment) {
            return res.status(404).json({ success: false, error: 'Treatment not found' });
        }

        res.json({ success: true, message: 'Treatment deleted successfully' });
    } catch (err) {
        console.error('Delete treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get Single Treatment
exports.getTreatmentById = async (req, res) => {
    try {
        const treatment = await Treatment.findById(req.params.id)
            .populate('hospitalOfferings', 'hospital cost isAvailable')
            .populate('doctorCapabilities', 'doctor successRate experienceWithProcedure casesPerformed');

        if (!treatment) {
            return res.status(404).json({ success: false, error: 'Treatment not found' });
        }

        res.json({ success: true, data: treatment });
    } catch (err) {
        console.error('Get treatment error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get All Treatments (with search & filters)
exports.getTreatments = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, search } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (search) filter.$text = { $search: search };

        const treatments = await Treatment.find(filter)
            .sort({ createdAt: -1 })
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


// ================= PROCEDURE COST CRUD =================
exports.createProcedureCost = async (req, res) => {
    try {
        const procedure = await ProcedureCost.create(req.body);
        res.status(201).json({ success: true, data: procedure });
    } catch (err) {
        console.error('Create procedure cost error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateProcedureCost = async (req, res) => {
    try {
        const procedure = await ProcedureCost.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!procedure) {
            return res.status(404).json({ success: false, error: 'Procedure not found' });
        }
        res.json({ success: true, data: procedure });
    } catch (err) {
        console.error('Update procedure cost error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deleteProcedureCost = async (req, res) => {
    try {
        const procedure = await ProcedureCost.findByIdAndDelete(req.params.id);
        if (!procedure) {
            return res.status(404).json({ success: false, error: 'Procedure not found' });
        }
        res.json({ success: true, message: 'Procedure deleted successfully' });
    } catch (err) {
        console.error('Delete procedure cost error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getProcedureCosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, search } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (search) filter.$or = [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];

        const procedures = await ProcedureCost.find(filter)
            .populate('treatment', 'title category')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await ProcedureCost.countDocuments(filter);
        res.json({
            success: true,
            count: procedures.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: procedures
        });
    } catch (err) {
        console.error('Get procedure costs error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getProcedureCostById = async (req, res) => {
    try {
        const procedure = await ProcedureCost.findById(req.params.id).populate('treatment', 'title category');
        if (!procedure) {
            return res.status(404).json({ success: false, error: 'Procedure not found' });
        }
        res.json({ success: true, data: procedure });
    } catch (err) {
        console.error('Get procedure cost by id error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// ================= FAQ CRUD =================
exports.createFAQ = async (req, res) => {
    try {
        const faq = await FAQ.create(req.body);
        res.status(201).json({ success: true, data: faq });
    } catch (err) {
        console.error('Create FAQ error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
        res.json({ success: true, data: faq });
    } catch (err) {
        console.error('Update FAQ error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndDelete(req.params.id);
        if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
        res.json({ success: true, message: 'FAQ deleted successfully' });
    } catch (err) {
        console.error('Delete FAQ error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getFAQs = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, search } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (search) filter.$or = [{ question: new RegExp(search, 'i') }, { answer: new RegExp(search, 'i') }];

        const faqs = await FAQ.find(filter)
            .sort({ order: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await FAQ.countDocuments(filter);
        res.json({
            success: true,
            count: faqs.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: faqs
        });
    } catch (err) {
        console.error('Get FAQs error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// ================= PATIENT OPINION CRUD =================
exports.createPatientOpinion = async (req, res) => {
    try {
        const opinion = await PatientOpinion.create(req.body);
        res.status(201).json({ success: true, data: opinion });
    } catch (err) {
        console.error('Create patient opinion error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updatePatientOpinion = async (req, res) => {
    try {
        const opinion = await PatientOpinion.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });
        if (!opinion) return res.status(404).json({ success: false, error: 'Patient opinion not found' });
        res.json({ success: true, data: opinion });
    } catch (err) {
        console.error('Update patient opinion error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.deletePatientOpinion = async (req, res) => {
    try {
        const opinion = await PatientOpinion.findByIdAndDelete(req.params.id);
        if (!opinion) return res.status(404).json({ success: false, error: 'Patient opinion not found' });
        res.json({ success: true, message: 'Patient opinion deleted successfully' });
    } catch (err) {
        console.error('Delete patient opinion error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getPatientOpinions = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const filter = {};
        if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { text: new RegExp(search, 'i') }];

        const opinions = await PatientOpinion.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await PatientOpinion.countDocuments(filter);
        res.json({
            success: true,
            count: opinions.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: opinions
        });
    } catch (err) {
        console.error('Get patient opinions error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// ==============================
// HOSPITAL DETAIL CONTROLLERS
// ==============================

// @desc    Get all hospital details
// @route   GET /api/admin/hospital-details
// @access  Protected
exports.getHospitalDetails = async (req, res) => {
    try {
        const details = await HospitalDetail.find().populate('hospital', 'name');
        res.status(200).json({
            status: 'success',
            results: details.length,
            data: details
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// @desc    Get single hospital detail by ID
// @route   GET /api/admin/hospital-details/:id
// @access  Protected
exports.getHospitalDetailById = async (req, res) => {
    try {
        const detail = await HospitalDetail.findById(req.params.id).populate('hospital', 'name');
        if (!detail) {
            return res.status(404).json({ status: 'fail', message: 'Hospital detail not found' });
        }
        res.status(200).json({ status: 'success', data: detail });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// @desc    Create hospital detail
// @route   POST /api/admin/hospital-details
// @access  Protected (superadmin, admin)
exports.createHospitalDetail = async (req, res) => {
    try {
        const detail = await HospitalDetail.create(req.body);
        res.status(201).json({ status: 'success', data: detail });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// @desc    Update hospital detail
// @route   PUT /api/admin/hospital-details/:id
// @access  Protected (superadmin, admin)
exports.updateHospitalDetail = async (req, res) => {
    try {
        const detail = await HospitalDetail.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!detail) {
            return res.status(404).json({ status: 'fail', message: 'Hospital detail not found' });
        }
        res.status(200).json({ status: 'success', data: detail });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// @desc    Delete hospital detail
// @route   DELETE /api/admin/hospital-details/:id
// @access  Protected (superadmin only)
exports.deleteHospitalDetail = async (req, res) => {
    try {
        const detail = await HospitalDetail.findByIdAndDelete(req.params.id);
        if (!detail) {
            return res.status(404).json({ status: 'fail', message: 'Hospital detail not found' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};



// ==============================
// BOOKING MANAGEMENT CONTROLLERS
// ==============================

const Booking = require('../models/Bookings.cjs'); // Make sure to import Booking model

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Protected
exports.getBookings = async (req, res) => {
    try {
        const { page = 1, limit = 10, read, replied, confirmed, search } = req.query;
        const filter = {};

        // Filter by status
        if (read !== undefined) filter['status.read'] = read === 'true';
        if (replied !== undefined) filter['status.replied'] = replied === 'true';
        if (confirmed !== undefined) filter['status.confirmed'] = confirmed === 'true';

        // Search filter
        if (search) {
            filter.$or = [
                { name: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') },
                { phone: new RegExp(search, 'i') },
                { doctor: new RegExp(search, 'i') },
                { hospital: new RegExp(search, 'i') }
            ];
        }

        const bookings = await Booking.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Booking.countDocuments(filter);

        res.json({
            success: true,
            count: bookings.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: bookings
        });
    } catch (err) {
        console.error('Get bookings error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get booking statistics
// @route   GET /api/admin/bookings/stats
// @access  Protected
exports.getBookingStats = async (req, res) => {
    try {
        const [
            totalBookings,
            unreadBookings,
            repliedBookings,
            confirmedBookings,
            todayBookings
        ] = await Promise.all([
            Booking.countDocuments(),
            Booking.countDocuments({ 'status.read': false }),
            Booking.countDocuments({ 'status.replied': true }),
            Booking.countDocuments({ 'status.confirmed': true }),
            Booking.countDocuments({
                createdAt: {
                    $gte: new Date().setHours(0, 0, 0, 0),
                    $lt: new Date().setHours(23, 59, 59, 999)
                }
            })
        ]);

        res.json({
            success: true,
            data: {
                total: totalBookings,
                unread: unreadBookings,
                replied: repliedBookings,
                confirmed: confirmedBookings,
                today: todayBookings
            }
        });
    } catch (err) {
        console.error('Get booking stats error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single booking by ID
// @route   GET /api/admin/bookings/:id
// @access  Protected
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }
        res.json({
            success: true,
            data: booking
        });
    } catch (err) {
        console.error('Get booking by id error:', err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id
// @access  Protected
exports.updateBookingStatus = async (req, res) => {
    try {
        const { read, replied, confirmed } = req.body;
        const updateData = {};

        if (read !== undefined) updateData['status.read'] = read;
        if (replied !== undefined) updateData['status.replied'] = replied;
        if (confirmed !== undefined) updateData['status.confirmed'] = confirmed;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking status updated successfully',
            data: booking
        });
    } catch (err) {
        console.error('Update booking status error:', err);
        res.status(400).json({
            success: false,
            error: 'Error updating booking status'
        });
    }
};

// @desc    Delete booking
// @route   DELETE /api/admin/bookings/:id
// @access  Protected (superadmin only)
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }
        res.json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (err) {
        console.error('Delete booking error:', err);
        res.status(500).json({
            success: false,
            error: 'Error deleting booking'
        });
    }
};