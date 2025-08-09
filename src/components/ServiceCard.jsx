import React from "react";
import { motion } from "framer-motion";

export default function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(6,95,70,0.3)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-6 bg-white rounded-lg cursor-pointer"
    >
      <div className="text-4xl">{service.icon}</div>
      <h3 className="mt-3 font-semibold text-lg">{service.title}</h3>
      <p className="mt-2 text-gray-600">{service.desc}</p>
    </motion.div>
  );
}
