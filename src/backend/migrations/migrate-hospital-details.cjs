const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const Hospital = require('../models/Hospital.cjs');
const HospitalDetail = require('../models/HospitalDetail.cjs');

const hospitalDetailsData = [
    {
        hospitalName: "Apollo Hospitals, Delhi",
        description: "Apollo Hospitals, Delhi is a state-of-the-art multi-specialty hospital offering comprehensive healthcare services. With cutting-edge technology and renowned medical professionals, we provide world-class treatment across various specialties including cardiac care, orthopedics, neurology, and cancer treatment.",
        address: "Mathura Road, New Delhi - 110076",
        coordinates: { lat: 28.5245, lng: 77.1855 },
        facilities: ["ICU", "Emergency", "Pharmacy", "Cafeteria", "WiFi", "Parking"],
        operationRooms: 15,
        outpatientFacilities: 50,
        totalArea: "45,000 m²",
        established: 1996,
        website: "https://apollohospitals.com/delhi",
        email: "info@apollodelhi.com",
        languages: ["English", "Hindi"],
        transportation: {
            airport: { distance: "20 km", time: "45 minutes" },
            railway: { distance: "8 km", time: "20 minutes" }
        },
        infrastructure: {
            parking: true,
            atm: true,
            prayerRoom: true,
            businessCenter: true,
            cafes: 2,
            restaurants: 1
        }
    }
    // Add more hospital details here
];

async function migrate() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'healthcare',
            serverSelectionTimeoutMS: 5000
        });

        console.log('🚀 Starting hospital details migration...');

        for (const detailData of hospitalDetailsData) {
            // Find the hospital by name
            const hospital = await Hospital.findOne({ name: detailData.hospitalName });

            if (hospital) {
                // Check if details already exist
                const existingDetails = await HospitalDetail.findOne({ hospital: hospital._id });

                if (!existingDetails) {
                    const { hospitalName, ...details } = detailData;
                    await HospitalDetail.create({
                        hospital: hospital._id,
                        ...details
                    });
                    console.log(`✅ Added details for ${hospital.name}`);
                } else {
                    console.log(`ℹ️  Details already exist for ${hospital.name}`);
                }
            } else {
                console.log(`❌ Hospital not found: ${detailData.hospitalName}`);
            }
        }

        console.log('🎉 Hospital details migration completed!');

    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 MongoDB connection closed');
    }
}

migrate();