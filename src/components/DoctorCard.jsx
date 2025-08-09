import React from "react";

export default function DoctorCard({ doc }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img
        src={doc.image}
        alt={doc.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold">{doc.name}</h4>
        <p className="text-sm text-gray-600">
          {doc.specialty} • {doc.hospital}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-700">⭐ {doc.rating}</div>
          <a href="/appointment" className="text-teal-600 font-medium">
            Book
          </a>
        </div>
      </div>
    </div>
  );
}
