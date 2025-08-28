import React, { useState } from "react";
import hospitals from "../data/hospitals";
import HospitalCard from "../components/HospitalCard";
import { FaSearch, FaHospital, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    specialty: "",
    accreditation: "",
  });

  const locations = [...new Set(hospitals.map((h) => h.location))];
  const specialties = [...new Set(hospitals.map((h) => h.specialty))];
  const accreditations = [...new Set(hospitals.map((h) => h.accreditation))];

  const filteredHospitals = hospitals.filter((hospital) => {
    return (
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.location ? hospital.location === filters.location : true) &&
      (filters.specialty ? hospital.specialty === filters.specialty : true) &&
      (filters.accreditation
        ? hospital.accreditation === filters.accreditation
        : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-6 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <FaFilter className="text-teal-600 text-lg" />
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          </div>

          {/* Location Filter */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaMapMarkerAlt className="text-teal-500" />
              Location
            </label>
            <select
              className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">All Locations</option>
              {locations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Filter */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <FaHospital className="text-teal-500" />
              Specialty
            </label>
            <select
              className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={filters.specialty}
              onChange={(e) =>
                setFilters({ ...filters, specialty: e.target.value })
              }
            >
              <option value="">All Specialties</option>
              {specialties.map((spec, i) => (
                <option key={i} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Accreditation Filter */}
          <div className="mb-5">
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <span className="text-teal-500">🏥</span>
              Accreditation
            </label>
            <select
              className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={filters.accreditation}
              onChange={(e) =>
                setFilters({ ...filters, accreditation: e.target.value })
              }
            >
              <option value="">All Accreditations</option>
              {accreditations.map((acc, i) => (
                <option key={i} value={acc}>
                  {acc}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={() =>
              setFilters({ location: "", specialty: "", accreditation: "" })
            }
            className="w-full bg-teal-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-teal-600 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="flex items-center bg-white shadow-md rounded-2xl px-4 py-3 mb-8 border border-gray-100">
            <FaSearch className="text-teal-500 text-xl mr-3" />
            <input
              type="text"
              placeholder="Search hospitals by name..."
              className="w-full outline-none text-gray-700 text-lg placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Hospitals Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital, index) => (
                <HospitalCard key={index} hospital={hospital} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No hospitals found. Try adjusting your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
