import React from "react";

const HospitalCard = ({ hospital }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
      <img
        src={hospital.image}
        alt={hospital.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold text-teal-700">{hospital.name}</h2>
      <p className="text-gray-600 mt-2">{hospital.city}</p>
      <p className="text-sm text-gray-500 mt-1">{hospital.speciality}</p>
      <p className="text-sm text-gray-500">
        Accreditation: {hospital.accreditation}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-teal-600 font-semibold">
          ⭐ {hospital.rating}/5
        </span>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;
