import React from "react";
import { useParams, Link } from "react-router-dom";
import hospitals from "../data/hospitals";

const HospitalDetails = () => {
  const { id } = useParams();
  const hospital = hospitals.find((h) => h.id === parseInt(id));

  if (!hospital) {
    return (
      <div className="text-center text-red-500 mt-20">Hospital not found!</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <img
        src={hospital.image}
        alt={hospital.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800">{hospital.name}</h1>
      <p className="text-gray-600 mt-2">{hospital.location}</p>
      <span className="inline-block mt-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
        ⭐ {hospital.rating}
      </span>
      <p className="mt-6 text-gray-700 leading-relaxed">
        {hospital.description}
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/hospitals"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          ← Back
        </Link>
        <Link
          to={`/hospitals/${hospital.id}/book`}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default HospitalDetails;
