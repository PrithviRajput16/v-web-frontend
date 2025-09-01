const mongoose = require('mongoose');
const path = require('path');
const Doctor = require('../models/Doctor.cjs');
const Hospital = require('../models/Hospital.cjs');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

const sampleDoctors = [
    {
        firstName: "Rajesh",
        lastName: "Kumar",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        specialty: "Cardiologist",
        specialties: ["Cardiology", "Interventional Cardiology"],
        qualifications: [
            {
                degree: "MBBS",
                institute: "All India Institute of Medical Sciences",
                year: 2005
            },
            {
                degree: "MD - Cardiology",
                institute: "Christian Medical College, Vellore",
                year: 2010
            }
        ],
        experience: 15,
        languages: ["English", "Hindi", "Tamil"],
        rating: 4.8,
        totalRatings: 124,
        consultationFee: 1500,
        availability: {
            Monday: [{ start: "09:00", end: "17:00" }],
            Tuesday: [{ start: "09:00", end: "17:00" }],
            Wednesday: [{ start: "09:00", end: "13:00" }],
            Thursday: [{ start: "09:00", end: "17:00" }],
            Friday: [{ start: "09:00", end: "17:00" }],
            Saturday: [{ start: "10:00", end: "14:00" }]
        },
        bio: "Senior Cardiologist with over 15 years of experience in treating complex heart conditions. Specializes in interventional cardiology and has performed over 1000 successful angioplasties.",
        awards: [
            {
                name: "Best Cardiologist Award",
                year: 2019,
                presentedBy: "Indian Medical Association"
            }
        ],
        memberships: ["Cardiological Society of India", "American College of Cardiology"],
        publications: [
            {
                title: "Advanced Techniques in Coronary Angioplasty",
                journal: "Journal of Interventional Cardiology",
                year: 2018,
                link: "https://example.com/publication1"
            }
        ]
    },
    {
        firstName: "Priya",
        lastName: "Sharma",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        specialty: "Orthopedic Surgeon",
        specialties: ["Orthopedics", "Joint Replacement"],
        qualifications: [
            {
                degree: "MBBS",
                institute: "Grant Medical College, Mumbai",
                year: 2008
            },
            {
                degree: "MS - Orthopedics",
                institute: "King Edward Memorial Hospital",
                year: 2013
            }
        ],
        experience: 12,
        languages: ["English", "Hindi", "Marathi"],
        rating: 4.7,
        totalRatings: 98,
        consultationFee: 1200,
        availability: {
            Monday: [{ start: "10:00", end: "18:00" }],
            Tuesday: [{ start: "10:00", end: "18:00" }],
            Wednesday: [{ start: "10:00", end: "18:00" }],
            Thursday: [{ start: "10:00", end: "15:00" }],
            Friday: [{ start: "10:00", end: "18:00" }]
        },
        bio: "Expert orthopedic surgeon specializing in joint replacement surgeries and sports injuries. Has successfully performed over 500 joint replacement surgeries with a 98% success rate.",
        awards: [
            {
                name: "Excellence in Orthopedics",
                year: 2020,
                presentedBy: "Indian Orthopaedic Association"
            }
        ],
        memberships: ["Indian Orthopaedic Association", "International Society of Orthopaedic Surgery"],
        publications: [
            {
                title: "Minimally Invasive Techniques in Knee Replacement",
                journal: "Journal of Orthopaedic Surgery",
                year: 2019,
                link: "https://example.com/publication2"
            }
        ]
    },
    {
        firstName: "Rajesh",
        lastName: "Kumar",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        specialty: "Cardiologist",
        specialties: ["Cardiology", "Interventional Cardiology"],
        qualifications: [
            {
                degree: "MBBS",
                institute: "All India Institute of Medical Sciences",
                year: 2005
            },
            {
                degree: "MD - Cardiology",
                institute: "Christian Medical College, Vellore",
                year: 2010
            }
        ],
        experience: 15,
        languages: ["English", "Hindi", "Tamil"],
        rating: 4.8,
        totalRatings: 124,
        consultationFee: 1500,
        availability: {
            Monday: [{ start: "09:00", end: "17:00" }],
            Tuesday: [{ start: "09:00", end: "17:00" }],
            Wednesday: [{ start: "09:00", end: "13:00" }],
            Thursday: [{ start: "09:00", end: "17:00" }],
            Friday: [{ start: "09:00", end: "17:00" }],
            Saturday: [{ start: "10:00", end: "14:00" }]
        },
        bio: "Senior Cardiologist with over 15 years of experience in treating complex heart conditions. Specializes in interventional cardiology and has performed over 1000 successful angioplasties.",
        awards: [
            {
                name: "Best Cardiologist Award",
                year: 2019,
                presentedBy: "Indian Medical Association"
            }
        ],
        memberships: ["Cardiological Society of India", "American College of Cardiology"],
        publications: [
            {
                title: "Advanced Techniques in Coronary Angioplasty",
                journal: "Journal of Interventional Cardiology",
                year: 2018,
                link: "https://example.com/publication1"
            }
        ]
    }, {
        firstName: "Rajesh",
        lastName: "Kumar",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        specialty: "Cardiologist",
        specialties: ["Cardiology", "Interventional Cardiology"],
        qualifications: [
            {
                degree: "MBBS",
                institute: "All India Institute of Medical Sciences",
                year: 2005
            },
            {
                degree: "MD - Cardiology",
                institute: "Christian Medical College, Vellore",
                year: 2010
            }
        ],
        experience: 15,
        languages: ["English", "Hindi", "Tamil"],
        rating: 4.8,
        totalRatings: 124,
        consultationFee: 1500,
        availability: {
            Monday: [{ start: "09:00", end: "17:00" }],
            Tuesday: [{ start: "09:00", end: "17:00" }],
            Wednesday: [{ start: "09:00", end: "13:00" }],
            Thursday: [{ start: "09:00", end: "17:00" }],
            Friday: [{ start: "09:00", end: "17:00" }],
            Saturday: [{ start: "10:00", end: "14:00" }]
        },
        bio: "Senior Cardiologist with over 15 years of experience in treating complex heart conditions. Specializes in interventional cardiology and has performed over 1000 successful angioplasties.",
        awards: [
            {
                name: "Best Cardiologist Award",
                year: 2019,
                presentedBy: "Indian Medical Association"
            }
        ],
        memberships: ["Cardiological Society of India", "American College of Cardiology"],
        publications: [
            {
                title: "Advanced Techniques in Coronary Angioplasty",
                journal: "Journal of Interventional Cardiology",
                year: 2018,
                link: "https://example.com/publication1"
            }
        ]
    }
];

const migrateDoctors = async () => {
    try {
        // 1. Connect to DB
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'healthcare',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000
        });
        console.log('✅ MongoDB connected for hospital migration');

        // Clear existing data
        await Doctor.deleteMany({});
        console.log('Cleared existing doctor data');

        // Get hospitals to assign to doctors
        const hospitals = await Hospital.find({});

        if (hospitals.length === 0) {
            throw new Error('Please migrate hospitals first');
        }

        // Assign hospitals to sample doctors
        sampleDoctors[0].hospital = hospitals[0]._id; // Apollo Hospitals
        sampleDoctors[1].hospital = hospitals[1]._id; // Fortis Memorial
        sampleDoctors[2].hospital = hospitals[0]._id; // Apollo Hospitals
        sampleDoctors[3].hospital = hospitals[0]._id; // Apollo Hospitals


        // Insert sample data
        await Doctor.insertMany(sampleDoctors);
        console.log('Sample doctors data migrated successfully');

        process.exit(0);
    } catch (err) {
        console.error('Migration error:', err);
        process.exit(1);
    }
};

migrateDoctors();