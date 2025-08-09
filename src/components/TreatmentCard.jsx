import React from "react";

export default function TreatmentCard({ t }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img src={t.image} alt={t.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="font-semibold">{t.title}</h4>
        <p className="text-sm text-gray-600 mt-2">{t.summary}</p>
      </div>
    </div>
  );
}
