// import React from "react";
// import { motion } from "framer-motion";

// export default function ServiceCard({ service }) {
//   return (
//     <motion.div
//       whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(6,95,70,0.08)" }}
//       transition={{ type: "spring", stiffness: 200 }}
//       className="bg-white p-6 rounded-xl card"
//     >
//       <div className="text-3xl">{service.icon}</div>
//       <h3 className="mt-3 font-semibold text-darktext">{service.title}</h3>
//       <p className="mt-2 text-sm text-lighttext">{service.desc}</p>
//     </motion.div>
//   );
// }

// import React from "react";
// import { motion } from "framer-motion";

// export default function ServiceCard({ service }) {
//   return (
//     <motion.div
//       whileHover={{
//         y: -8,
//         scale: 1.03,
//         boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//       }}
//       transition={{ type: "spring", stiffness: 250, damping: 20 }}
//       className="relative bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-md hover:shadow-xl"
//     >
//       {/* Animated Icon Container */}
//       <motion.div
//         whileHover={{ scale: 1.15, rotate: 5 }}
//         transition={{ type: "spring", stiffness: 300 }}
//         className="w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-green-100 to-green-200 rounded-full shadow-inner mb-4"
//       >
//         <span className="text-3xl text-green-700">{service.icon}</span>
//       </motion.div>

//       {/* Title */}
//       <motion.h3
//         initial={{ opacity: 0, y: 10 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="text-lg font-semibold text-gray-800"
//       >
//         {service.title}
//       </motion.h3>

//       {/* Description */}
//       <motion.p
//         initial={{ opacity: 0, y: 8 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1, duration: 0.4 }}
//         className="mt-2 text-sm text-gray-600 leading-relaxed"
//       >
//         {service.desc}
//       </motion.p>

//       {/* Decorative Glow */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-50 to-transparent opacity-0 hover:opacity-20 transition duration-500"></div>
//     </motion.div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 80 }}
      whileHover={{
        y: -8,
        scale: 1.03,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      }}
      className="relative p-[2px] rounded-2xl bg-gradient-to-tr from-emerald-400 to-green-600"
    >
      {/* Glassmorphic Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 transition-all duration-300">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-4xl inline-block mb-3 text-emerald-600"
        >
          {service.icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}
