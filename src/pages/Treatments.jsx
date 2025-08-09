import React from "react";
import treatments from "../data/treatments";
import TreatmentCard from "../components/TreatmentCard";

export default function Treatments() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Treatments & Procedures</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {treatments.map((t) => (
          <TreatmentCard key={t.id} t={t} />
        ))}
      </div>
    </div>
  );
}
