// migrations/createBookingsCollection.js
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const Booking = require('../models/Bookings.cjs');
const Doctor = require('../models/Doctor.cjs');
const Hospital = require('../models/Hospital.cjs');

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
            await Booking.deleteMany({});
            console.log('Cleared existing doctor data');
        }

        // Add sample data (optional)
        const sampleBooking = [{
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            date: new Date('2024-12-15'),
            time: '10:00',
            message: 'Sample booking for testing',
            status: {
                read: false,
                replied: false
            }
        }];

        const hospital = await Hospital.find({});
        const doctor = await Doctor.find({});
        console.log(hospital[0]);

        sampleBooking[0].hospital = hospital[0]._id;
        sampleBooking[0].doctor = doctor[0]._id;

        // await sampleBooking.save();
        // console.log('Sample booking created');

        await Booking.insertMany(sampleBooking);

        console.log('Migration completed successfully');
        process.exit(0);

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateBookings();