import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4" // Place video in public/videos folder
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay to make text more readable */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold leading-tight"
        >
          Find Trusted Hospitals & Doctors
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg max-w-xl mx-auto"
        >
          Compare hospitals, connect with specialists, and book appointments
          effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <button className="px-6 py-3 bg-teal-600 rounded-md font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            Find Doctors
          </button>
          <button className="px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition-all duration-300">
            Explore Treatments
          </button>
        </motion.div>
      </div>
    </section>
  );
}
