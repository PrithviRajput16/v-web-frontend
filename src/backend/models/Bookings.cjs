// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    doctor: {
        type: String,
        required: true,
        trim: true
    },
    hospital: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        read: {
            type: Boolean,
            default: false
        },
        replied: {
            type: Boolean,
            default: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);