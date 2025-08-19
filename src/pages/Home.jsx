import DoctorCard from "../components/DoctorCard";
import Hero from "../components/Hero";
import HospitalCarousel from "../components/HospitalCarousel";
import ProcedureCost from "../components/ProcedureCost";
import Services from "../components/Services";
import Stats from "../components/Stats";
import TreatmentCard from "../components/TreatmentCard";
import WhatsAppButton from "../components/WhatsAppButton";
import doctors from "../data/doctors";
import hospitals from "../data/hospitals";
import treatments from "../data/treatments";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Services */}
      
      <Stats />
      
      <Services />

      <HospitalCarousel hospitals={hospitals}/>


      <ProcedureCost />

      <WhatsAppButton />


    <section className="bg-sectiondiv py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl text-center font-semibold mb-6">How Do We Work?</h2>
          <div className="row flex justify-around">
            <div className="col-md-8">
              <div className="row flex justify-evenly">
                <div className="col position-relative">dsafdsafads</div>
                <div className="col position-relative">dsafdsafads</div>
                <div className="col position-relative">dsafdsafads</div>
                <div className="col position-relative">dsafdsafads</div>
              </div>
            </div>
            <div className="bg-white col-md-4">
              dfdf
              
            </div>
          </div>
        </div>
      </section>

      {/* Doctors */}
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

      {/* Treatments */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Treatments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <TreatmentCard key={t.id} t={t} />
          ))}
        </div>
      </section>

      {/* Hospitals */}
      {/* <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Our Partner Hospitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hospitals.map((h) => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>
        </div>
      </section> */}

      

     
    </div>
  );
}