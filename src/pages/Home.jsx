import DoctorCard from "../components/DoctorCard";
import Hero from "../components/Hero";
import HospitalCarousel from "../components/HospitalCarousel";
import ProcedureCost from "../components/ProcedureCost";
import Services from "../components/Services";
import Stats from "../components/Stats";
import TreatmentCard from "../components/TreatmentCard";
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

      <HospitalCarousel hospitals={hospitals} />

      <ProcedureCost />

      <section className="bg-sectiondiv py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl text-center font-bold mb-12 text-gray-800">
            How Do We Work?
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Steps List */}
            <div className="flex-1 space-y-8">
              {[
                {
                  step: "Step 1",
                  title: "Send your query",
                  desc: "Share your medical query, reports, or requirements with us.",
                  icon: "📩",
                },
                {
                  step: "Step 2",
                  title: "Get treatment options",
                  desc: "We connect you with top hospitals & doctors and share treatment options.",
                  icon: "🏥",
                },
                {
                  step: "Step 3",
                  title: "Compare & choose",
                  desc: "Compare doctors, hospitals, costs, and make an informed choice.",
                  icon: "⚖️",
                },
                {
                  step: "Step 4",
                  title: "Travel & treatment",
                  desc: "We assist with visas, travel, accommodation, and medical journey.",
                  icon: "✈️",
                },
                {
                  step: "Step 5",
                  title: "Post-treatment care",
                  desc: "We stay connected for follow-ups and recovery.",
                  icon: "❤️",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-700">
                      {item.step}: {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Side Image */}
            <div className="flex-1">
              <img
                src="https://www.vaidam.com/sites/default/files/2021-09/how-we-work.jpg"
                alt="How we work illustration"
                className="rounded-2xl shadow-lg"
              />
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
