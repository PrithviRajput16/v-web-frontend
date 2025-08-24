import './ProcessFlow.css';

export default function ProcessFlow(){
    return(
        <section className="bg-sectiondiv py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl text-center font-bold mb-12 text-gray-800">
            How Do We Work?
          </h2>

          <div className="py-12 px-4">
  <div className="py-12 px-4">
  <div className="max-w-4xl mx-auto">
    {/* <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Process</h2> */}
    
    <div className="relative">
      {/* Vertical timeline */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-200 md:left-1/2 md:-ml-0.5"></div>
      
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
        <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          {/* Timeline dot */}
          <div className="absolute left-4 md:left-1/2 md:-ml-3 w-6 h-6 rounded-full bg-blue-500 border-4 border-white z-10"></div>
          
          {/* Content card */}
          <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
            <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">{item.icon}</div>
                <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {item.step}
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>
        </div>
      </section>
    )
}