

import { motion } from "framer-motion";

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.15, 
        type: "spring", 
        stiffness: 80 
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      }}
      className=" relative p-[2px] rounded-2xl bg-gradient-to-tr from-emerald-400 to-green-600"
    >
      {/* Glassmorphic Card */}
      <div className="bg-white/80 flex items-center gap-4 backdrop-blur-md rounded-2xl p-6 transition-all duration-300">
        <motion.div
          whileHover={{ 
            rotate: 10, 
            scale: 1.2 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200 
          }}
          className="text-4xl text-emerald-600"
        >
          {service.icon}
        </motion.div>
          <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {service.title}
        </h3>
        
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {service.desc}
        </p>
        </div>
        
      </div>
    </motion.div>
  );
}
/* 
made the div flex so that icon and heading/content comes in columns
*/