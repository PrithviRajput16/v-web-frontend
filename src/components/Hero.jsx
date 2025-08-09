import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero-bg text-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold leading-tight"
        >
          Find trusted hospitals & doctors — Book appointments online
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg"
        >
          Search specialists, compare hospitals and book appointments in a few
          clicks.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <Link
            to="/doctors"
            className="bg-white text-teal-700 px-6 py-3 rounded-md font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transform transition"
          >
            Find Doctors
          </Link>
          <Link
            to="/treatments"
            className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-teal-700 transition font-semibold"
          >
            Explore Treatments
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
