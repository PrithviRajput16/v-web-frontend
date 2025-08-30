// const HospitalCard = ({ hospital }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
//       <img
//         src={hospital.image}
//         alt={hospital.name}
//         className="w-full h-40 object-cover rounded-lg mb-4"
//       />
//       <h2 className="text-xl font-bold text-teal-700">{hospital.name}</h2>
//       <p className="text-gray-600 mt-2">{hospital.city}</p>
//       <p className="text-sm text-gray-500 mt-1">{hospital.speciality}</p>
//       <p className="text-sm text-gray-500">
//         Accreditation: {hospital.accreditation}
//       </p>

//       <div className="flex justify-between items-center mt-4">
//         <span className="text-teal-600 font-semibold">
//           ⭐ {hospital.rating}/5
//         </span>
//         <button className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HospitalCard;

import React from "react";
import { Link } from "react-router-dom";

const HospitalCard = ({ hospital }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition">
      <img
        src={hospital.image}
        alt={hospital.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{hospital.name}</h3>
        <p className="text-gray-600 text-sm">{hospital.location}</p>
        <p className="text-sm mt-2 line-clamp-2">{hospital.description}</p>
        <div className="flex justify-between items-center mt-4">
          {/* ✅ View Details Button */}
          <Link
            to={`/hospitals/${hospital.id}`}
            className="px-3 py-2 text-sm bg-green-400 text-gray-800 rounded-lg hover:bg-gray-200"
          >
            View Details
          </Link>

          {/* ✅ Book Now Button */}
          <Link
            to={`/hospitals/${hospital.id}/book`}
            className="px-3 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
