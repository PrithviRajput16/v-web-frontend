import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';
import './PatientOpinions.css';

const PatientOpinions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sample patient opinions data
  const opinions = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "From USA",
      treatment: "Cardiac Surgery",
      rating: 5,
      image: "https://images.unsplash.com/photo-1551836026-d5c8c5ab235e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      text: "The care I received was exceptional. The doctors took time to explain everything and the hospital facilities were world-class. My recovery has been smooth thanks to their post-treatment support."
    },
    {
      id: 2,
      name: "Robert Chen",
      location: "From Australia",
      treatment: "Orthopedic Surgery",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      text: "From consultation to post-surgery care, the team was professional and compassionate. The results exceeded my expectations and I'm back to my active lifestyle."
    },
    {
      id: 3,
      name: "Aisha Patel",
      location: "From UK",
      treatment: "Cancer Treatment",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      text: "The oncology department provided excellent care during my treatment. The staff was supportive throughout my journey and the facilities were top-notch."
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      location: "From Canada",
      treatment: "Neurology Treatment",
      rating: 4,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      text: "The medical team was knowledgeable and caring. They explained all options clearly and helped me make informed decisions about my treatment."
    }
  ];

  const nextOpinion = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === opinions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevOpinion = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? opinions.length - 1 : prevIndex - 1
    );
  };

  const goToOpinion = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="patient-opinions-section py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Patients Say
        </motion.h2>
        <motion.p 
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Read genuine experiences from patients who have trusted us with their healthcare journey.
        </motion.p>

        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevOpinion}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white rounded-full p-2 shadow-md hover:bg-blue-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-blue-600 text-lg" />
          </button>
          
          <button 
            onClick={nextOpinion}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white rounded-full p-2 shadow-md hover:bg-blue-50 transition-colors"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-blue-600 text-lg" />
          </button>

          {/* Testimonial Carousel */}
          <div className="overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Patient Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
                      <img 
                        src={opinions[currentIndex].image} 
                        alt={opinions[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="flex-1 text-center md:text-left">
                    <FaQuoteLeft className="text-blue-200 text-2xl mb-4 mx-auto md:mx-0" />
                    
                    <p className="text-gray-700 italic mb-6">
                      "{opinions[currentIndex].text}"
                    </p>
                    
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {opinions[currentIndex].name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {opinions[currentIndex].location} • {opinions[currentIndex].treatment}
                      </p>
                      
                      {/* Star Rating */}
                      <div className="flex justify-center md:justify-start gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < opinions[currentIndex].rating ? "text-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {opinions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToOpinion(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientOpinions;