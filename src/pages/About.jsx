import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, Users } from "lucide-react"; // modern icons
import { useEffect, useState } from "react";
import url_prefix from "../data/variable";


export default function About() {
  // State to hold API data and loading/error states
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for highlights
  const iconMap = {
    HeartPulse: <HeartPulse className="w-6 h-6 text-teal-600" />,
    Stethoscope: <Stethoscope className="w-6 h-6 text-teal-600" />,
    Users: <Users className="w-6 h-6 text-teal-600" />,
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(url_prefix + "/api/about?page=1&limit=1000"); // Adjust the endpoint as needed
        const result = await response.json();
        if (result.success) {
          setAboutData(result.data);
        } else {
          setError("Failed to load data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-teal-600 text-lg">Loading...</p>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-teal-100 via-white to-teal-50 py-20 overflow-hidden">
      {/* Background blob shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-teal-800 text-center drop-shadow-sm"
        >
          {aboutData.title.split(" ").map((word, index) => (
            <span key={index} className={index === 1 ? "text-teal-500" : ""}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-6 text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed"
        >
          {aboutData.subtitle.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                ["accessible", "transparent", "easy"].includes(word)
                  ? "font-semibold text-teal-600"
                  : ""
              }
            >
              {word}{" "}
            </span>
          ))}
        </motion.p>

        {/* Grid Layout */}
        <div className="mt-16 grid md:grid-cols-2 gap-14 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 via-transparent to-white rounded-3xl shadow-2xl"></div>
            <img
              src={aboutData.image}
              alt="Healthcare team"
              className="relative rounded-3xl shadow-2xl z-10"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-teal-800 mb-6">
              {aboutData.missionTitle}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {aboutData.missionDescription.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    word === "learning"
                      ? "font-semibold text-teal-600"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </p>

            {/* Mission Highlights */}
            <div className="space-y-5">
              {aboutData.highlights.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition"
                >
                  {iconMap[item.icon]}
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}