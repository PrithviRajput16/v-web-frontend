// controllers/bookingController.js
const Booking = require('../models/Bookings.cjs');

// Create booking
exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking({
            ...req.body,
            status: {
                read: false,
                replied: false
            }
        });

        const savedBooking = await booking.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: savedBooking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = '-createdAt', read, replied, doctor, hospital } = req.query;

        let query = {};

        // Filter by read status
        if (read !== undefined) {
            query['status.read'] = read === 'true';
        }

        // Filter by replied status
        if (replied !== undefined) {
            query['status.replied'] = replied === 'true';
        }

        // Filter by doctor
        if (doctor) {
            query.doctor = new RegExp(doctor, 'i');
        }

        // Filter by hospital
        if (hospital) {
            query.hospital = new RegExp(hospital, 'i');
        }

        const bookings = await Booking.find(query)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Booking.countDocuments(query);

        res.json({
            success: true,
            data: bookings,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching booking',
            error: error.message
        });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { read, replied } = req.body;
        const updateData = {};

        if (read !== undefined) updateData['status.read'] = read;
        if (replied !== undefined) updateData['status.replied'] = replied;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking status updated successfully',
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating booking status',
            error: error.message
        });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting booking',
            error: error.message
        });
    }
};

// Get booking statistics
exports.getBookingStats = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const unreadBookings = await Booking.countDocuments({ 'status.read': false });
        const repliedBookings = await Booking.countDocuments({ 'status.replied': true });
        const notRepliedBookings = await Booking.countDocuments({ 'status.replied': false });

        res.json({
            success: true,
            data: {
                total: totalBookings,
                unread: unreadBookings,
                replied: repliedBookings,
                notReplied: notRepliedBookings
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching booking statistics',
            error: error.message
        });
    }
};