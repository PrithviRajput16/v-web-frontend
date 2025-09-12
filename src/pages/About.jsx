

import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, Users } from "lucide-react"; // modern icons

export default function About() {
  return (
    <section className="relative bg-gradient-to-b from-teal-100 via-white to-teal-50 py-20 overflow-hidden">
      {/* Background blob shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-teal-800 text-center drop-shadow-sm"
        >
          About <span className="text-teal-500">Us</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-6 text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed"
        >
          We’re committed to making healthcare{" "}
          <span className="font-semibold text-teal-600">accessible</span>,
          <span className="font-semibold text-teal-600"> transparent</span>, and
          <span className="font-semibold text-teal-600">
            {" "}
            easy to navigate
          </span>{" "}
          — helping you connect with the right specialists, hospitals, and
          treatments.
        </motion.p>

        {/* Grid Layout */}
        <div className="mt-16 grid md:grid-cols-2 gap-14 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 via-transparent to-white rounded-3xl shadow-2xl"></div>
            <img
              src="/aboutpage.jpg" // ✅ Using image from public folder
              alt="Healthcare team"
              className="relative rounded-3xl shadow-2xl z-10"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-teal-800 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This platform was created as a{" "}
              <span className="font-semibold text-teal-600">
                learning project
              </span>{" "}
              to replicate the experience of a modern healthcare directory and
              booking service. In a real-world application, you could connect
              this interface to live APIs for booking appointments, browsing
              hospitals, and comparing treatments.
            </p>

            {/* Mission Highlights */}
            <div className="space-y-5">
              {[
                {
                  icon: <HeartPulse className="w-6 h-6 text-teal-600" />,
                  text: "Simplifying healthcare decisions with clarity",
                },
                {
                  icon: <Stethoscope className="w-6 h-6 text-teal-600" />,
                  text: "Intuitive tools for better patient experience",
                },
                {
                  icon: <Users className="w-6 h-6 text-teal-600" />,
                  text: "Building trust through transparency",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition"
                >
                  {item.icon}
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
