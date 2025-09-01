const mongoose = require('mongoose');
const path = require('path');
const ProcedureCost = require('../models/ProcedureCost.cjs');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

const sampleProcedures = [
    {
        title: "Coronary Angioplasty",
        description: "A procedure to open clogged heart arteries using a balloon and stent",
        icon: "❤️",
        basePrice: 150000,
        category: "Cardiology",
        duration: 120,
        complexity: "High",
        recoveryTime: "1-2 weeks"
    },
    {
        title: "Knee Replacement Surgery",
        description: "Surgical procedure to replace a damaged knee joint with an artificial one",
        icon: "🦴",
        basePrice: 250000,
        category: "Orthopedics",
        duration: 180,
        complexity: "High",
        recoveryTime: "6-12 weeks"
    },
    {
        title: "Brain Tumor Removal",
        description: "Surgical procedure to remove abnormal growths in the brain",
        icon: "🧠",
        basePrice: 500000,
        category: "Neurology",
        duration: 300,
        complexity: "Very High",
        recoveryTime: "2-3 months"
    },
    {
        title: "Root Canal Treatment",
        description: "Dental procedure to treat infection at the center of a tooth",
        icon: "🦷",
        basePrice: 8000,
        category: "Dentistry",
        duration: 90,
        complexity: "Medium",
        recoveryTime: "2-3 days"
    },
    {
        title: "Cataract Surgery",
        description: "Procedure to remove the cloudy lens and replace it with an artificial one",
        icon: "👁️",
        basePrice: 40000,
        category: "Ophthalmology",
        duration: 45,
        complexity: "Medium",
        recoveryTime: "1-2 weeks"
    },
    {
        title: "LASIK Eye Surgery",
        description: "Laser procedure to correct vision problems",
        icon: "👓",
        basePrice: 60000,
        category: "Ophthalmology",
        duration: 30,
        complexity: "Medium",
        recoveryTime: "1 week"
    },
    {
        title: "Skin Grafting",
        description: "Surgical procedure to transplant skin from one area to another",
        icon: "🩹",
        basePrice: 75000,
        category: "Dermatology",
        duration: 120,
        complexity: "High",
        recoveryTime: "3-4 weeks"
    },
    {
        title: "Appendectomy",
        description: "Surgical removal of the appendix",
        icon: "🔪",
        basePrice: 45000,
        category: "General Surgery",
        duration: 60,
        complexity: "Medium",
        recoveryTime: "2-3 weeks"
    }
];

const migrateProcedures = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'healthcare',
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ MongoDB connected for procedure costs migration');

        // Clear existing data
        await ProcedureCost.deleteMany({});
        console.log('Cleared existing procedure data');

        // Insert sample data
        await ProcedureCost.insertMany(sampleProcedures);
        console.log('Sample procedures data migrated successfully');

        process.exit(0);
    } catch (err) {
        console.error('Migration error:', err);
        process.exit(1);
    }
};

migrateProcedures();