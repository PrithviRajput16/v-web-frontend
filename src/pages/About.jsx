import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, Users } from "lucide-react";
import { useEffect, useState } from "react";
import url_prefix from "../data/variable";
import { useLanguage } from "../hooks/useLanguage";


export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language] = useLanguage();

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Using the endpoint from your curl command
        const response = await fetch(url_prefix + '/api/about?page=1&limit=1');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          if (result.data.language === language) {
            console.log('heyy');
          } else {
            setError("No data available for selected language");
          }

          setAboutData(result.data);
          // console.log(filtered);
          setAboutData(result.data);
        } else {
          throw new Error(result.message || "Failed to load data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-teal-100 h-12 w-12 mb-4"></div>
              <p className="text-teal-600">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Fallback data in case API doesn't return expected structure
  const data = aboutData || {
    title: "About Us",
    subtitle: "We're committed to making healthcare accessible, transparent, and easy to navigate",
    missionTitle: "Our Mission",
    missionDescription: "This platform was created as a learning project to replicate the experience of a modern healthcare directory and booking service.",
    image: "/aboutpage.jpg",
    highlights: [
      {
        icon: "HeartPulse",
        text: "Simplifying healthcare decisions with clarity",
        _id: "1"
      },
      {
        icon: "Stethoscope",
        text: "Intuitive tools for better patient experience",
        _id: "2"
      },
      {
        icon: "Users",
        text: "Building trust through transparency",
        _id: "3"
      }
    ]
  };

  const iconMap = {
    HeartPulse: <HeartPulse className="w-5 h-5 text-teal-600" />,
    Stethoscope: <Stethoscope className="w-5 h-5 text-teal-600" />,
    Users: <Users className="w-5 h-5 text-teal-600" />,
  };

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Simple background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-50 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>

      <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-teal-800">
            {data.title.split(" ").map((word, index) => (
              <span key={index} className={index === 1 ? "text-teal-600" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-4"></div>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-6 text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed mb-12"
        >
          {data.subtitle.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                ["accessible", "transparent", "easy"].includes(word.toLowerCase())
                  ? "font-medium text-teal-600"
                  : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </motion.p>

        {/* Grid Layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-teal-50 rounded-2xl"></div>
            <img
              src={data.image || "/aboutpage.jpg"}
              alt="Healthcare team"
              className="relative rounded-xl shadow-md z-10 w-full h-auto"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-6">
              {data.missionTitle}
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {data.missionDescription.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    word.toLowerCase() === "learning"
                      ? "font-medium text-teal-600"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </p>

            {/* Mission Highlights */}
            <div className="space-y-4">
              {data.highlights.map((item, i) => (
                <motion.div
                  key={item._id || i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-3 bg-teal-50 rounded-lg"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full">
                    {iconMap[item.icon] || <HeartPulse className="w-5 h-5 text-teal-600" />}
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 bg-teal-50 rounded-xl p-8 md:p-10"
        >
          <h3 className="text-xl font-semibold text-teal-800 mb-4 text-center">
            Our Commitment to You
          </h3>
          <p className="text-gray-700 text-center max-w-3xl mx-auto">
            We believe that everyone deserves access to quality healthcare information
            and services. Our platform is designed to empower patients with the tools
            they need to make informed decisions about their health and well-being.
          </p>
        </motion.div>
      </div>
    </section>
  );
}