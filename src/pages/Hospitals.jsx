import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FaHospital, FaSearch } from "react-icons/fa";
import HospitalCard from "../components/HospitalCard";
import hospitals from "../data/hospitals";



export default function Hospitals() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("All");
  const [spec, setSpec] = useState("All");
  const [sort, setSort] = useState("ratingDesc");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(hospitals.map((h) => h.city)))],
    []
  );
  const specialties = useMemo(
    () => [
      "All",
      ...Array.from(new Set(hospitals.flatMap((h) => h.specialties))),
    ],
    []
  );

  const filtered = useMemo(() => {
    let data = hospitals.filter((h) => {
      const matchesQ =
        !q ||
        h.name.toLowerCase().includes(q.toLowerCase()) ||
        h.city.toLowerCase().includes(q.toLowerCase());
      const matchesCity = city === "All" || h.city === city;
      const matchesSpec = spec === "All" || h.specialties.includes(spec);
      return matchesQ && matchesCity && matchesSpec;
    });

    switch (sort) {
      case "ratingDesc":
        data = data.sort((a, b) => b.rating - a.rating);
        break;
      case "bedsDesc":
        data = data.sort((a, b) => b.beds - a.beds);
        break;
      case "nameAsc":
        data = data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return data;
  }, [q, city, spec, sort]);

  return (
    <section className="bg-gradient-to-b from-teal-50 to-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-700 flex items-center gap-3">
              <FaHospital className="text-teal-600" />
              Hospitals
            </h1>
            <p className="mt-2 text-lighttext">
              Browse top hospitals, compare specialties and ratings, and get
              contact info instantly.
            </p>
          </div>

          {/* Controls */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative sm:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search hospitals or cities"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 bg-white"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 bg-white"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="ratingDesc">Top Rated</option>
              <option value="bedsDesc">Most Beds</option>
              <option value="nameAsc">Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.05 }}
              >
                <HospitalCard hospital={h} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-lighttext">
            No hospitals match your filters.
          </div>
        )}
      </div>
    </section>
  );
}