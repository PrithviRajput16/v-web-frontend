import React from "react";
import doctors from "../data/doctors";
import DoctorCard from "../components/DoctorCard";

export default function Doctors() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Find Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((d) => (
          <DoctorCard key={d.id} doc={d} />
        ))}
      </div>
    </div>
  );
}
