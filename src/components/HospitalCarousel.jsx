import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "../components/home/SectionHeading";
import HospitalCard from "./HospitalCard";
import { MdLocalPhone } from "react-icons/md";
const HospitalCarousel = ({ hospitals }) => {
  // Group hospitals by country
  const countryGroups = hospitals.reduce((acc, hospital) => {
    acc[hospital.country] = acc[hospital.country] || [];
    acc[hospital.country].push(hospital);
    return acc;
  }, {});

  const countryNames = Object.keys(countryGroups);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const selectCountry = (index) => {
    setDirection(index > currentCountryIndex ? 1 : -1);
    setCurrentCountryIndex(index);
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0.5,
      transition: { duration: 0.5 },
    }),
  };

  const currentCountry = countryNames[currentCountryIndex];
  const currentHospitals = countryGroups[currentCountry] || [];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Our Partner Hospitals
        </h2>
        <SectionHeading
          center={true}
          title="Partner Hospitals"
          subtitle="World-Class Healthcare Facilities"
          description="We collaborate with accredited hospitals that offer state-of-the-art technology and expert medical staff"
        />

        {/* Country tabs */}
        {/* Just put flex-center to center the names */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <div className="flex space-x-1">
            {countryNames.map((country, index) => (
              <button
                key={country}
                onClick={() => selectCountry(index)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  index === currentCountryIndex
                    ? "bg-[#008080] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Animated hospital cards */}
        <div className="relative bg-sectiondiv p-10 rounded-lg min-h-[400px]">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentCountryIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {currentHospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Actions */}
      <div className="mt-5 flex items-center justify-between">
        <a
          href="/appointment"
          className="px-4 py-2 rounded-lg text-white shadow-sm hover:shadow-md transition-all"
          style={{ backgroundColor: "rgb(0 128 128)" }} // match 'Book' button
        >
          Book Consultation
        </a>
        <a
          // href= {⁠tel:${hospital.phone?.replace(/\s/g, "")} ⁠}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition"
          title="Call hospital"
        >
          <MdLocalPhone />
          Call
        </a>
      </div>
    </section>
  );
};

export default HospitalCarousel;
