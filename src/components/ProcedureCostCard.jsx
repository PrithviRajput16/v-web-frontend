

import { motion } from "framer-motion";

export default function ProcedureCostCard({ service, index }) {
  return (
    <div className = "col" >
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
      className=" relative p-[2px] rounded-2xl bg-gradient-to-tr  from-white to-[#006080]"
      // className=" relative p-[2px] rounded-2xl bg-gradient-to-tr to-[#004080] from-[#808080]"
      // to-green-600 Removed this from classname from-emrald-400 from-[#008080]
    >
      {/* Glassmorphic Card */}
      <div className="bg-white/80 flex justify-evenly gap-2 backdrop-blur-md rounded-2xl p-6 transition-all duration-300">
        <motion.div
          whileHover={{ 
            rotate: 10, 
            scale: 1.2 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200 
          }}
          className="text-4xl text-emerald-600  flex items-center justify-center"
        >
          {service.icon}
          
        </motion.div>

        <div>
          <h3 className="text-md font-semibold text-gray-900">
            {service.title}
          </h3>
          
          <p className="text-md text-gray-600 mt-1 leading-relaxed">
            Starting: ${service.price}
          </p>

          <button className="text-sm bg-[#008080] mt-2 py-2 px-3 text-white rounded">Get Quote</button>
        </div>
        
      </div>
    </motion.div>
    </div>
  );
}
/* 
made the div flex so that icon and heading/content comes in columns
*/