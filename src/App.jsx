import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Treatments from "./pages/Treatments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
