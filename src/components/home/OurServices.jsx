import {
    FaBed,
    FaCalendarCheck,
    FaCar,
    FaHeadset,
    FaLanguage,
    FaMoneyBillWave,
    FaPassport,
    FaPlane,
    FaUserMd,
    FaUserNurse
} from 'react-icons/fa';

const OurServices = () => {
  const services = [
    {
      icon: <FaUserMd className="text-2xl text-blue-600" />,
      title: "Medical Opinion and Cost Estimations",
      description: "Expert opinions and cost estimates from top healthcare providers."
    },
    {
      icon: <FaPlane className="text-2xl text-blue-600" />,
      title: "Pre-Travel Consultations",
      description: "Understand your procedure before traveling with detailed guidance."
    },
    {
      icon: <FaPassport className="text-2xl text-blue-600" />,
      title: "Visa Assistance",
      description: "Complete medical visa assistance and documentation support."
    },
    {
      icon: <FaMoneyBillWave className="text-2xl text-blue-600" />,
      title: "Money Exchange",
      description: "Convenient currency exchange services in your city."
    },
    {
      icon: <FaLanguage className="text-2xl text-blue-600" />,
      title: "Interpreters and Translators",
      description: "Fluent professionals to break language barriers at every step."
    },
    {
      icon: <FaCar className="text-2xl text-blue-600" />,
      title: "Transportation Assistance",
      description: "Complimentary airport transfers and local transportation."
    },
    {
      icon: <FaBed className="text-2xl text-blue-600" />,
      title: "Accommodation Options",
      description: "Near the hospital and matching your budget and needs."
    },
    {
      icon: <FaCalendarCheck className="text-2xl text-blue-600" />,
      title: "Admission, Appointment, Pharma Care",
      description: "Full coordination of medical logistics and pharmacy services."
    },
    {
      icon: <FaUserNurse className="text-2xl text-blue-600" />,
      title: "Private Duty Nursing",
      description: "Arrangements of private nursing care as needed."
    }
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darktext mb-4">
            Our Services Cover <span className="text-primary">Every Need</span>
          </h2>
          <p className="text-lg text-lighttext max-w-3xl mx-auto mb-6">
            You will be assisted by a dedicated case manager from our team. 
            List of services you can expect from us, for <span className="text-primary font-semibold">FREE!</span>
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <FaHeadset className="mr-2" />
            <span className="font-semibold">Dedicated Case Manager Included</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-smooth hover:shadow-lg transition-all duration-300 border border-blue-50"
            >
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-darktext">
                  {service.title}
                </h3>
              </div>
              <p className="text-lighttext">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Free Service Note */}
        <div className="text-center mt-12 bg-primary/5 rounded-2xl p-6 border border-primary/20">
          <h4 className="text-2xl font-semibold text-primary mb-2">
            All Services Included at No Extra Cost
          </h4>
          <p className="text-lighttext">
            These comprehensive services are provided free of charge when you choose our medical care coordination.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurServices;