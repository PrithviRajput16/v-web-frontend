

import { motion } from "framer-motion";

export default function DoctorCard({ doc }) {
  // console.log(doc.hospital.name);
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          src={doc.image}
          alt={doc.firstName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h4 className="font-semibold text-lg text-darktext">{doc.name}</h4>
        <p className="text-sm text-lighttext mt-1">
          {doc.specialty} • {doc.hospital.name}
        </p>

        {/* Rating & Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            ⭐ {doc.rating}
          </div>
          <a
            href="/appointment"
            className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-primary/90 transition-all"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
