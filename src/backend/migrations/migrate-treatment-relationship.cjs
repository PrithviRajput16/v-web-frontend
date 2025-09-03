const mongoose = require('mongoose');
const path = require('path');
const Treatment = require('../models/Treatments.cjs');
const HospitalTreatment = require('../models/HospitalTreatment.cjs');
const DoctorTreatment = require('../models/DoctorTreatment.cjs');
const Hospital = require('../models/Hospital.cjs');
const Doctor = require('../models/Doctor.cjs');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

async function migrate() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'healthcare',
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ MongoDB connected for FAQs migration');

        // Clear existing data
        await Treatment.deleteMany();
        await HospitalTreatment.deleteMany();
        await DoctorTreatment.deleteMany();
        console.log('🗑️  Cleared existing treatment data');

        // Get hospitals and doctors
        const hospitals = await Hospital.find();
        const doctors = await Doctor.find();


        if (hospitals.length === 0 || doctors.length === 0) {
            throw new Error('Please migrate hospitals and doctors first');
        }

        // Create base treatments
        const baseTreatments = [
            {
                title: 'Angioplasty',
                description: 'Heart artery procedure with stent placement',
                icon: '❤️',
                category: 'Cardiology',
                typicalDuration: 120,
                typicalComplexity: 'High',
                typicalRecoveryTime: '1-2 weeks'
            },
            {
                title: 'Knee Replacement Surgery',
                description: 'Total knee joint replacement with artificial implant',
                icon: '🦴',
                category: 'Orthopedics',
                typicalDuration: 180,
                typicalComplexity: 'High',
                typicalRecoveryTime: '6-12 weeks'
            },
            {
                title: 'Root Canal Treatment',
                description: 'Dental procedure to treat infected tooth root',
                icon: '🦷',
                category: 'Dentistry',
                typicalDuration: 90,
                typicalComplexity: 'Medium',
                typicalRecoveryTime: '2-3 days'
            }
        ];


        const createdTreatments = await Treatment.insertMany(baseTreatments);
        console.log(`📥 Created ${createdTreatments.length} base treatments`);

        // Create hospital-treatment relationships (same treatment offered by multiple hospitals)
        const hospitalTreatments = [];
        for (const treatment of createdTreatments) {
            for (const hospital of hospitals) {
                hospitalTreatments.push({
                    hospital: hospital._id,
                    treatment: treatment._id,
                    price: treatment.category === 'Cardiology' ? 150000 :
                        treatment.category === 'Orthopedics' ? 250000 : 8000,
                    discount: Math.floor(Math.random() * 20), // Random discount 0-20%
                    availability: 'Available',
                    waitingPeriod: Math.floor(Math.random() * 14) // Random wait 0-14 days
                });
            }
        }

        const createdHospitalTreatments = await HospitalTreatment.insertMany(hospitalTreatments);
        console.log(`📥 Created ${createdHospitalTreatments.length} hospital-treatment relationships`);

        // Create doctor-treatment relationships (same treatment performed by multiple doctors)
        const doctorTreatments = [];
        for (const treatment of createdTreatments) {
            for (const doctor of doctors) {
                // Only assign treatments that match doctor's specialty
                if (doctor.specialty.includes(treatment.category) ||
                    treatment.category === 'Dentistry') { // Dentists are rare, so assign to some doctors
                    doctorTreatments.push({
                        doctor: doctor._id,
                        treatment: treatment._id,
                        successRate: 80 + Math.floor(Math.random() * 20), // 80-99%
                        experienceWithProcedure: Math.floor(Math.random() * 10) + 1, // 1-10 years
                        casesPerformed: Math.floor(Math.random() * 200) + 10 // 10-210 cases
                    });
                }
            }
        }

        const createdDoctorTreatments = await DoctorTreatment.insertMany(doctorTreatments);
        console.log(`📥 Created ${createdDoctorTreatments.length} doctor-treatment relationships`);

        // Update hospitals and doctors with treatment references
        for (const ht of createdHospitalTreatments) {
            await Hospital.findByIdAndUpdate(ht.hospital, {
                $addToSet: { treatments: ht._id }
            });
        }

        for (const dt of createdDoctorTreatments) {
            await Doctor.findByIdAndUpdate(dt.doctor, {
                $addToSet: { treatments: dt._id }
            });
        }

        console.log('✅ Updated hospitals and doctors with treatment references');

        // Verify
        const sampleHospital = await Hospital.findById(hospitals[0]._id)
            .populate({
                path: 'treatments',
                populate: { path: 'treatment', select: 'title category' }
            });

        const sampleDoctor = await Doctor.findById(doctors[0]._id)
            .populate({
                path: 'treatments',
                populate: { path: 'treatment', select: 'title category' }
            });

        console.log('📋 Sample hospital treatments:', sampleHospital.treatments.length);
        console.log('📋 Sample doctor treatments:', sampleDoctor.treatments.length);

    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🛑 MongoDB connection closed');
    }
}

migrate();