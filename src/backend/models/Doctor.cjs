const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }],
    specialties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true }],
    qualifications: [String],
    experience: { type: Number },
    consultationFee: { type: Number },
    image: { type: String },
    bio: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

doctorSchema.index({ hospitals: 1 });
doctorSchema.index({ specialties: 1 });
doctorSchema.index({ rating: -1 });

module.exports = mongoose.model('Doctor', doctorSchema);