import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ backgroundColor: "rgba(255,255,255,0)" }}
      animate={{
        backgroundColor: scrolled ? "rgba(6,95,70,0.9)" : "rgba(255,255,255,0)",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl font-bold ${
            scrolled ? "text-white" : "text-teal-600"
          }`}
        >
          Vaidam
          <span className={`${scrolled ? "text-gray-300" : "text-gray-600"}`}>
            Clone
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {["/", "/treatments", "/doctors", "/about", "/contact"].map(
            (path, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `font-semibold ${
                    isActive
                      ? scrolled
                        ? "text-white"
                        : "text-teal-600"
                      : scrolled
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`
                }
              >
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").charAt(0).toUpperCase() +
                    path.slice(2)}
              </NavLink>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/appointment"
            className={`px-4 py-2 rounded-md font-semibold ${
              scrolled
                ? "bg-white text-teal-700 hover:bg-teal-100"
                : "bg-teal-600 text-white hover:bg-teal-700"
            } transition-colors duration-200`}
          >
            Book Appointment
          </Link>
          <a
            href="tel:+911234567890"
            className={`flex items-center gap-2 ${
              scrolled ? "text-white" : "text-gray-700"
            }`}
          >
            <FiPhone />
            +91 12345 67890
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 rounded-md focus:outline-none ${
            scrolled ? "text-white" : "text-teal-600"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-teal-600 text-white"
          >
            <ul className="flex flex-col gap-4 px-6 py-4">
              {[
                { to: "/", label: "Home" },
                { to: "/treatments", label: "Treatments" },
                { to: "/doctors", label: "Doctors" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
