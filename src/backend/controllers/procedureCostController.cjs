const ProcedureCost = require('../models/ProcedureCost.cjs');

// @desc    Get all procedure costs
// @route   GET /api/procedure-costs
// @access  Public
exports.getProcedureCosts = async (req, res) => {
  try {
    const procedureCosts = await ProcedureCost.find().sort({ title: 1 });
    
    res.json({
      success: true,
      count: procedureCosts.length,
      data: procedureCosts
    });
  } catch (err) {
    console.error('Get procedure costs error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};