// import React from "react";

// export default function About() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-semibold">About Us</h1>
//       <p className="mt-4 text-gray-600">
//         This is a learning project that mimics a healthcare directory/booking
//         interface. Replace content and wire real APIs for production.
//       </p>
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-teal-50 to-white py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-teal-700 text-center"
        >
          About Us
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto"
        >
          We’re committed to making healthcare accessible, transparent, and easy
          to navigate — helping you connect with the right specialists,
          hospitals, and treatments.
        </motion.p>

        {/* Content grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              // src="https://images.unsplash.com/photo-1580281657527-47b48f8d1d3f?auto=format&fit=crop&w=800&q=80"
              src=""
              alt="Healthcare team"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              This platform was created as a learning project to replicate the
              experience of a modern healthcare directory and booking service.
              In a real-world application, you could connect this interface to
              live APIs for booking appointments, browsing hospitals, and
              comparing treatments.
            </p>
            <p className="text-gray-600">
              Our vision is to simplify healthcare decisions through clear
              information, intuitive tools, and a user experience that feels as
              friendly as your neighborhood clinic.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
