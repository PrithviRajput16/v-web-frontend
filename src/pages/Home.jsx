import React from "react";
import Hero from "../components/Hero";
import services from "../data/services";
import ServiceCard from "../components/ServiceCard";
import doctors from "../data/doctors";
import DoctorCard from "../components/DoctorCard";
import treatments from "../data/treatments";
import TreatmentCard from "../components/TreatmentCard";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Our Specialities</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <Stats />

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Top Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doc={d} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Treatments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <TreatmentCard key={t.id} t={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
