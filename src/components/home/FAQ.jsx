import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import './FAQ.css';
import faqdata from '../../data/faqdata';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
// faqData;


console.log(faqdata)
  const faqData = [
    {
      question: "How do I start the process of medical treatment?",
      answer: "Starting your medical journey is simple. Contact us through our website, phone, or email. Our team will guide you through the initial consultation, medical history review, and help you choose the right hospital and doctor for your condition."
    },
    {
      question: "What information do I need to provide for a treatment estimate?",
      answer: "For an accurate estimate, please share your medical reports, diagnosis details, current medications, and any previous treatments. The more information you provide, the more precise our cost estimation and treatment plan will be."
    },
    {
      question: "How long does it take to get a treatment plan and cost estimate?",
      answer: "We typically provide a preliminary treatment plan and cost estimate within 24-48 hours after reviewing your medical documents. In urgent cases, we can expedite this process."
    },
    {
      question: "Do you help with travel arrangements and visas?",
      answer: "Yes, we provide complete assistance with medical visas, travel arrangements, airport transfers, and local accommodation. Our team will guide you through the entire process to make your medical journey smooth."
    },
    {
      question: "What happens after I complete my treatment?",
      answer: "Post-treatment, we provide follow-up care instructions and connect you with our team for any questions. We also assist with arranging follow-up consultations and can help facilitate communication with your doctors back home."
    },
    {
      question: "Are the doctors and hospitals you work with accredited?",
      answer: "Absolutely. We partner only with accredited hospitals and highly qualified doctors who have international recognition and expertise in their respective specialties."
    },
    {
      question: "What languages do your coordinators speak?",
      answer: "Our care coordinators are fluent in English, Hindi, Arabic, Spanish, and several other languages to assist patients from different regions effectively."
    },
    {
      question: "How do you ensure patient privacy and data security?",
      answer: "We take patient privacy seriously. All your medical information is handled with strict confidentiality and secured through encrypted channels in compliance with international healthcare privacy standards."
    }
  ];

  // Split FAQ data into two columns
  const leftColumn = faqData.slice(0, Math.ceil(faqData.length / 2));
  const rightColumn = faqData.slice(Math.ceil(faqData.length / 2));

  return (
    <section className="faq-section bg-gray-100 py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/30 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-100/30 rounded-full translate-x-20 translate-y-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaQuestionCircle className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our medical treatment process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumn.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index} 
                isActive={activeIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            {rightColumn.map((faq, index) => (
              <FAQItem 
                key={index + leftColumn.length} 
                faq={faq} 
                index={index + leftColumn.length} 
                isActive={activeIndex === index + leftColumn.length}
                onClick={() => toggleFAQ(index + leftColumn.length)}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 bg-sectiondiv rounded-2xl p-8 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our care coordinators are available 24/7 to answer any questions you may have about your medical journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#008080] hover:bg-[#006080] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
              Contact Us Now
            </button>
            <button className="border border-[#008080] text-[#008080] hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors duration-300">
              Request a Call Back
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Item Component for better code organization
const FAQItem = ({ faq, index, isActive, onClick }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button
        className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isActive}
      >
        <h3 className="text-lg font-semibold text-gray-800 pr-4">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <FaChevronDown className="text-blue-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.4, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-gray-600">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;