import DoctorCard from "../components/DoctorCard";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Services from "../components/Services";
import Stats from "../components/Stats";
import TreatmentCard from "../components/TreatmentCard";
import doctors from "../data/doctors";
import services from "../data/services";
import treatments from "../data/treatments";

export default function Home() {
  return (
    <div>
      <Hero />

      <Stats />

      {/* <section className="bg-sectiondiv">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-semibold mb-12 text-center">Our Specialities</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
             <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section> */}

      <Services />

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

      {/* <Services /> */}

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
