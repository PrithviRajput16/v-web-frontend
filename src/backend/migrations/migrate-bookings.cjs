// migrations/createBookingsCollection.js
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const Booking = require('../models/Bookings.cjs');

const migrateBookings = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'healthcare',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000
        });
        console.log('✅ MongoDB connected for hospital migration');

        console.log('Connected to MongoDB');

        // Create collection if it doesn't exist
        const collectionExists = await mongoose.connection.db.listCollections({ name: 'bookings' }).hasNext();

        if (!collectionExists) {
            console.log('Creating bookings collection...');
            await Booking.createCollection();
            console.log('Bookings collection created successfully');
        } else {
            console.log('Bookings collection already exists');
        }

        // Add sample data (optional)
        const sampleBooking = new Booking({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            doctor: 'Dr. Smith',
            hospital: 'General Hospital',
            date: new Date('2024-12-15'),
            time: '10:00',
            message: 'Sample booking for testing',
            status: {
                read: false,
                replied: false
            }
        });

        await sampleBooking.save();
        console.log('Sample booking created');

        console.log('Migration completed successfully');
        process.exit(0);

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateBookings();