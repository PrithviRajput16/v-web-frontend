const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });
const FAQ = require('../models/FAQ.cjs');

const faqsData = [
    {
        question: "How do I start the process of medical treatment?",
        answer: "Starting your medical journey is simple. Contact us through our website, phone, or email. Our team will guide you through the initial consultation, medical history review, and help you choose the right hospital and doctor for your condition.",
        category: "General",
        order: 1
    },
    {
        question: "What information do I need to provide for a treatment estimate?",
        answer: "For an accurate estimate, please share your medical reports, diagnosis details, current medications, and any previous treatments. The more information you provide, the more precise our cost estimation and treatment plan will be.",
        category: "General",
        order: 2
    },
    {
        question: "How long does it take to get a treatment plan and cost estimate?",
        answer: "We typically provide a preliminary treatment plan and cost estimate within 24-48 hours after reviewing your medical documents. In urgent cases, we can expedite this process.",
        category: "General",
        order: 3
    },
    {
        question: "Do you help with travel arrangements and visas?",
        answer: "Yes, we provide complete assistance with medical visas, travel arrangements, airport transfers, and local accommodation. Our team will guide you through the entire process to make your medical journey smooth.",
        category: "Travel",
        order: 4
    },
    {
        question: "What happens after I complete my treatment?",
        answer: "Post-treatment, we provide follow-up care instructions and connect you with our team for any questions. We also assist with arranging follow-up consultations and can help facilitate communication with your doctors back home.",
        category: "Post-Treatment",
        order: 5
    },
    {
        question: "Are the doctors and hospitals you work with accredited?",
        answer: "Absolutely. We partner only with accredited hospitals and highly qualified doctors who have international recognition and expertise in their respective specialties.",
        category: "Quality",
        order: 6
    },
    {
        question: "What languages do your coordinators speak?",
        answer: "Our care coordinators are fluent in English, Hindi, Arabic, Spanish, and several other languages to assist patients from different regions effectively.",
        category: "Support",
        order: 7
    },
    {
        question: "How do you ensure patient privacy and data security?",
        answer: "We take patient privacy seriously. All your medical information is handled with strict confidentiality and secured through encrypted channels in compliance with international healthcare privacy standards.",
        category: "Privacy",
        order: 8
    }
];

async function migrate() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'healthcare',
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ MongoDB connected for FAQs migration');

        await FAQ.deleteMany();
        console.log('🗑️  Cleared existing FAQs');

        const result = await FAQ.insertMany(faqsData);
        console.log(`📥 Inserted ${result.length} FAQs`);

        const count = await FAQ.countDocuments();
        console.log(`🔍 Total FAQs in DB: ${count}`);

    } catch (err) {
        console.error('❌ FAQs migration failed:', err);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🛑 MongoDB connection closed');
    }
}

migrate();