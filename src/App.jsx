import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import BookingFlow from "./pages/BookingFlow";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import HospitalDetails from "./pages/HospitalDetails";
import Hospitals from "./pages/Hospitals"; // ✅ Import Hospitals page
import Treatments from "./pages/Treatments";
import DoctorDetails from "./pages/DoctorDetails";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <Header />
      <main className="flex-grow  mt-2 pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/hospitals" element={<Hospitals />} />{" "}
          <Route path="/hospitals/:id" element={<HospitalDetails />} />
          {/* ✅ New route */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/hospitals/:id" element={<HospitalDetails />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/hospitals/:id/book" element={<BookingFlow />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
