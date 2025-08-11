// // import React from "react";
// // import { motion } from "framer-motion";

// // export default function TreatmentCard({ t }) {
// //   return (
// //     <motion.div
// //       whileHover={{ y: -6 }}
// //       className="bg-white rounded-xl overflow-hidden card"
// //     >
// //       <div className="h-40 overflow-hidden">
// //         <img
// //           className="w-full h-full object-cover card-img-zoom"
// //           src={t.image}
// //           alt={t.title}
// //         />
// //       </div>
// //       <div className="p-4">
// //         <h4 className="font-semibold text-darktext">{t.title}</h4>
// //         <p className="mt-2 text-sm text-lighttext">{t.summary}</p>
// //       </div>
// //     </motion.div>
// //   );
// // }

// import React from "react";
// import { motion } from "framer-motion";

// export default function TreatmentCard({ t }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 200 }}
//       className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
//     >
//       {/* Image Section */}
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={t.image}
//           alt={t.title}
//           className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         <h4 className="absolute bottom-3 left-4 text-lg font-semibold text-white drop-shadow-lg">
//           {t.title}
//         </h4>
//       </div>

//       {/* Text Section */}
//       <div className="p-5">
//         <p className="text-sm text-gray-600 line-clamp-3">{t.summary}</p>
//         <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
//           Learn More
//         </button>
//       </div>
//     </motion.div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";

export default function TreatmentCard({ t }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={t.image}
          alt={t.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Title */}
        <h4 className="absolute bottom-3 left-4 text-lg font-semibold text-white drop-shadow-md">
          {t.title}
        </h4>
      </div>

      {/* Text Section */}
      <div className="p-5">
        <p className="text-sm text-lighttext line-clamp-3">{t.summary}</p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-300">
          Learn More
        </button>
      </div>
    </motion.div>
  );
}
