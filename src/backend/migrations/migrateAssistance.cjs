const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const Assistance = require('../models/Assistance.cjs');

const assistanceData = [
    {
        title: "Medical Opinion and Cost Estimations",
        description: "Expert opinions and cost estimates from top healthcare providers.",
        icon: "FaUserMd",
        order: 1
    },
    {
        title: "Pre-Travel Consultations",
        description: "Understand your procedure before traveling with detailed guidance.",
        icon: "FaPlane",
        order: 2
    },
    {
        title: "Visa Assistance",
        description: "Complete medical visa assistance and documentation support.",
        icon: "FaPassport",
        order: 3
    },
    {
        title: "Money Exchange",
        description: "Convenient currency exchange services in your city.",
        icon: "FaMoneyBillWave",
        order: 4
    },
    {
        title: "Interpreters and Translators",
        description: "Fluent professionals to break language barriers at every step.",
        icon: "FaLanguage",
        order: 5
    },
    {
        title: "Transportation Assistance",
        description: "Complimentary airport transfers and local transportation.",
        icon: "FaCar",
        order: 6
    },
    {
        title: "Accommodation Options",
        description: "Near the hospital and matching your budget and needs.",
        icon: "FaBed",
        order: 7
    },
    {
        title: "Admission, Appointment, Pharma Care",
        description: "Full coordination of medical logistics and pharmacy services.",
        icon: "FaCalendarCheck",
        order: 8
    },
    {
        title: "Private Duty Nursing",
        description: "Arrangements of private nursing care as needed.",
        icon: "FaUserNurse",
        order: 9
    }
];

async function migrate() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'healthcare',
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ MongoDB connected for assistance migration');

        await Assistance.deleteMany();
        console.log('🗑️  Cleared existing assistance services');

        const result = await Assistance.insertMany(assistanceData);
        console.log(`📥 Inserted ${result.length} assistance services`);

        const count = await Assistance.countDocuments();
        console.log(`🔍 Total assistance services in DB: ${count}`);

    } catch (err) {
        console.error('❌ Assistance migration failed:', err);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🛑 MongoDB connection closed');
    }
}

migrate();