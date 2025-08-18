import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

export default function HospitalCard({ hospital }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image with specialties overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Rating badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
          <FaStar className="text-yellow-400" />
          {hospital.rating}
        </div>
        
        {/* Specialties on image */}
        <div className="absolute bottom-3 left-0 w-full px-3">
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-1 rounded-full bg-white/90 backdrop-blur text-teal-700 border border-white"
              >
                {s}
              </span>
            ))}
            {hospital.specialties.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/90 backdrop-blur text-gray-700 border border-white">
                +{hospital.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content below image */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-darktext">{hospital.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-lighttext">
          <FaMapMarkerAlt className="text-teal-600" />
          <span>{hospital.city}, {hospital.country}</span>
        </div>
      </div>
    </motion.div>
  );
}