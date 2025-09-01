const Treatment = require('../models/Treatments.cjs');
const HospitalTreatment = require('../models/HospitalTreatment.cjs');
const DoctorTreatment = require('../models/DoctorTreatment.cjs');

// @desc    Get all treatments with hospital and doctor info
// @route   GET /api/treatments/all
// @access  Public
exports.getAllTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find({ isActive: true })
            .sort({ title: 1 })
            .lean();

        res.json({
            success: true,
            count: treatments.length,
            data: treatments
        });
    } catch (err) {
        console.error('Get all treatments error:', err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get treatments with hospital offerings
// @route   GET /api/treatments/hospital-offerings
// @access  Public
exports.getTreatmentsWithHospitalOfferings = async (req, res) => {
    try {
        const { hospital, treatment } = req.query;

        const filter = { isActive: true };
        if (hospital) filter.hospital = hospital;
        if (treatment) filter.treatment = treatment;

        const hospitalTreatments = await HospitalTreatment.find(filter)
            .populate('hospital', 'name city country image rating')
            .populate('treatment', 'title description category icon typicalDuration typicalComplexity')
            .sort({ finalPrice: 1 });

        res.json({
            success: true,
            count: hospitalTreatments.length,
            data: hospitalTreatments
        });
    } catch (err) {
        console.error('Get hospital treatments error:', err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get treatments with doctor capabilities
// @route   GET /api/treatments/doctor-capabilities
// @access  Public
exports.getTreatmentsWithDoctorCapabilities = async (req, res) => {
    try {
        const { doctor, treatment } = req.query;

        const filter = { isActive: true };
        if (doctor) filter.doctor = doctor;
        if (treatment) filter.treatment = treatment;

        const doctorTreatments = await DoctorTreatment.find(filter)
            .populate('doctor', 'firstName lastName specialty image rating experience')
            .populate('treatment', 'title description category icon typicalDuration typicalComplexity')
            .sort({ successRate: -1 });

        res.json({
            success: true,
            count: doctorTreatments.length,
            data: doctorTreatments
        });
    } catch (err) {
        console.error('Get doctor treatments error:', err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get treatment by ID
// @route   GET /api/treatments/:id
// @access  Public
exports.getTreatment = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid treatment ID format'
            });
        }

        const treatment = await Treatment.findById(req.params.id);

        if (!treatment) {
            return res.status(404).json({
                success: false,
                error: 'Treatment not found'
            });
        }

        res.json({
            success: true,
            data: treatment
        });
    } catch (err) {
        console.error('Get treatment error:', err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

