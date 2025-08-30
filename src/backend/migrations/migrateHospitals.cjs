const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

const Hospital = require('../models/Hospital.cjs');

const hospitalsData = [
  {
    id: 1,
    name: "Apollo Hospitals, Delhi",
    country: "India",
    city: "Delhi",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
    specialties: ["Cardiology", "Oncology", "Orthopedics"],
    rating: 4.6,
    beds: 700,
    accreditation: ["JCI", "NABH"],
    phone: "+91 11 2345 6789",
    blurb:
      "A leading multi-specialty hospital known for advanced cardiac and cancer care.",
  },
  {
    id: 2,
    name: "Fortis Memorial, Gurgaon",
    country: "India",
    city: "Gurgaon",
    image:
      "https://images.unsplash.com/photo-1576765608642-ff4b3f0c3a22?q=80&w=1200&auto=format&fit=crop",
    specialties: ["Neurosurgery", "Transplants", "Pediatrics"],
    rating: 4.7,
    beds: 1000,
    accreditation: ["JCI"],
    phone: "+91 124 678 9900",
    blurb:
      "High-end quaternary care with international patient services and advanced ICUs.",
  },
  {
    id: 3,
    name: "Max Super Speciality, Saket",
    country: "India",
    city: "Delhi",
    image:
      "https://images.unsplash.com/photo-1580281658629-6c3b5b7c5c2b?q=80&w=1200&auto=format&fit=crop",
    specialties: ["Oncology", "ENT", "GI Surgery"],
    rating: 4.5,
    beds: 500,
    accreditation: ["NABH"],
    phone: "+91 11 4500 6500",
    blurb:
      "Comprehensive cancer and GI programs with minimally invasive surgery.",
  },
  {
    id: 4,
    name: "Kokilaben Dhirubhai Ambani, Mumbai",
    country: "India",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
    specialties: ["Cardiology", "Robotics", "Orthopedics"],
    rating: 4.6,
    beds: 750,
    accreditation: ["JCI", "NABH"],
    phone: "+91 22 3099 9999",
    blurb:
      "Robotic surgery programs and holistic tertiary care with global standards.",
  },
  {
    id: 5,
    name: "Kokilaben Dhirubhai Ambani, Mumbai",
    country: "America",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
    specialties: ["Cardiology", "Robotics", "Orthopedics"],
    rating: 4.6,
    beds: 750,
    accreditation: ["JCI", "NABH"],
    phone: "+91 22 3099 9999",
    blurb:
      "Robotic surgery programs and holistic tertiary care with global standards.",
  },
  {
    id: 6,
    name: "Kokilaben Dhirubhai Ambani, Mumbai",
    country: "America",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
    specialties: ["Cardiology", "Robotics", "Orthopedics"],
    rating: 4.6,
    beds: 750,
    accreditation: ["JCI", "NABH"],
    phone: "+91 22 3099 9999",
    blurb:
      "Robotic surgery programs and holistic tertiary care with global standards.",
  },
  {
    id: 7,
    name: "Kokilaben Dhirubhai Ambani, Mumbai",
    country: "Dubai",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
    specialties: ["Cardiology", "Robotics", "Orthopedics"],
    rating: 4.6,
    beds: 750,
    accreditation: ["JCI", "NABH"],
    phone: "+91 22 3099 9999",
    blurb:
      "Robotic surgery programs and holistic tertiary care with global standards.",
  }
];

async function migrate() {
  try {
    // Debug: Check if environment variables are loaded
    console.log('ATLAS_URI:', process.env.ATLAS_URI ? 'Loaded' : 'Missing');
    
    if (!process.env.ATLAS_URI) {
      throw new Error('ATLAS_URI environment variable is missing. Check your config.env file');
    }

    // 1. Connect to DB
    await mongoose.connect(process.env.ATLAS_URI, {
      dbName: 'healthcare',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000
    });
    console.log('✅ MongoDB connected for hospital migration');

    // 2. Clear existing data
    const deleteResult = await Hospital.deleteMany();
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing hospitals`);

    // 3. Insert new data
    const result = await Hospital.insertMany(hospitalsData);
    console.log(`📥 Inserted ${result.length} hospitals`);

    // 4. Verify migration
    const count = await Hospital.countDocuments();
    console.log(`🔍 Total hospitals in DB: ${count}`);

    // 5. Show sample of inserted data
    const sample = await Hospital.find().limit(2);
    console.log('📋 Sample hospitals:', sample.map(h => h.name));

  } catch (err) {
    console.error('❌ Hospital migration failed:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🛑 MongoDB connection closed');
    }
  }
}

// Run migration
migrate();