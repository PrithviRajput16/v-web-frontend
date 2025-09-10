import { Route, Routes } from "react-router-dom";
import AdminDashboard from './components/admin/AdminDashboard';
import AdminDoctors from './components/admin/AdminDoctors';
import AdminDoctorTreatment from './components/admin/AdminDoctorTreatment';
import AdminFaqs from './components/admin/AdminFAQ';
import AdminHospitalDetails from './components/admin/AdminHospitalDetails';
import AdminHospitals from './components/admin/AdminHospitals';
import AdminHospitalTreatment from './components/admin/AdminHospitalTreatment';
import AdminLogin from './components/admin/AdminLogin';
import AdminPatientOpinions from './components/admin/AdminPatientOpinions';
import AdminProcedures from './components/admin/AdminProcedures';
import AdminTreatment from './components/admin/AdminTreatment';
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import BookingFlow from "./pages/BookingFlow";
import Contact from "./pages/Contact";
import DoctorDetails from "./pages/DoctorDetails";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import HospitalDetails from "./pages/HospitalDetails";
import Hospitals from "./pages/Hospitals"; // ✅ Import Hospitals page
import TreatmentDetails from "./pages/TreatmentDetails";
import Treatments from "./pages/Treatments";
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
          <Route path="/treatments/:id" element={<TreatmentDetails />} />


          {/* Public routes */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/hospitals" element={<AdminHospitals />} />
          <Route path="/admin/treatments" element={<AdminTreatment />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/doctor-treatment" element={<AdminDoctorTreatment />} />
          {/* <Route path="/admin/treatments" element={<AdminTreatments />} /> */}
          <Route path="/admin/hospital-treatment" element={<AdminHospitalTreatment />} />
          <Route path="/admin/faqs" element={<AdminFaqs />} />
          <Route path="/admin/patient-opinions" element={<AdminPatientOpinions />} />
          <Route path="/admin/procedures" element={<AdminProcedures />} />
          <Route path="/admin/hospital-details" element={<AdminHospitalDetails />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}
