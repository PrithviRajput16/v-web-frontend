const Hospital = require('../models/Hospital.cjs');

// @desc    Get all hospitals with optional filtering
// @route   GET /api/hospitals
// @access  Public
exports.getHospitalStatus = async (req, res) => {
  try {
    res.json({ 
      status: 'Hospitals API is healthy',
      dbStatus: req.dbStatus || 'Unknown' // Injected from middleware
    });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({ 
      error: 'Service unavailable',
      details: err.message
    });
  }
};

exports.getHospitals = async (req, res) => {
    try {
        const { country, city, specialty, minRating, page = 1, limit = 10 } = req.query;

        // Build filter object
        const filter = {};
        if (country) filter.country = new RegExp(country, 'i');
        if (city) filter.city = new RegExp(city, 'i');
        if (minRating) filter.rating = { $gte: parseFloat(minRating) };
        if (specialty) filter.specialties = new RegExp(specialty, 'i');

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { rating: -1, name: 1 }
        };

        const hospitals = await Hospital.find(filter)
            .sort(options.sort)
            .limit(options.limit * 1)
            .skip((options.page - 1) * options.limit);

        const total = await Hospital.countDocuments(filter);

        res.json({
            success: true,
            count: hospitals.length,
            total,
            page: options.page,
            pages: Math.ceil(total / options.limit),
            data: hospitals
        });
    } catch (err) {
        console.error('Get hospitals error:', err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single hospital
// @route   GET /api/hospitals/:id
// @access  Public
exports.getHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {
            return res.status(404).json({
                success: false,
                error: 'Hospital not found'
            });
        }

        res.json({
            success: true,
            data: hospital
        });
    } catch (err) {
        console.error('Get hospital error:', err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new hospital
// @route   POST /api/hospitals
// @access  Private/Admin
exports.createHospital = async (req, res) => {
    try {
        const hospital = await Hospital.create(req.body);

        res.status(201).json({
            success: true,
            data: hospital
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};