import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import url_prefix from "../data/variable";

export default function BookingFlow() {
  const { hospitalId, doctorId } = useParams();

  console.log("Hospital ID:", hospitalId);
  console.log("Doctor ID:", doctorId);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    doctorId: doctorId || "",
    hospital: "",
    hospitalId: hospitalId || "",
    date: "",
    time: "",
    message: ""
  });


  // Fetch hospitals and doctors
  useEffect(() => {
    const fetchHospitalsAndDoctors = async () => {
      try {
        // Fetch hospitals
        const hospitalsResponse = await fetch(url_prefix + '/api/hospitals/all?limit=10000');
        const hospitalsResult = await hospitalsResponse.json();
        if (hospitalsResult.success) {
          setHospitals(hospitalsResult.data);
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHospitalsAndDoctors();
  }, []);

  useEffect(() => {


    if (hospitalId) {
      // Fetch doctors for the pre-filled hospital
      fetchDoctors(hospitalId);

      const selectedHospital = hospitals.find(h => h._id === hospitalId);
      setFormData(prev => ({
        ...prev,
        hospitalId,
        hospital: selectedHospital ? selectedHospital.name : prev.hospital,
      }));
    }

    if (doctorId) {
      const selectedDoctor = doctors.find(d => d._id === doctorId);
      setFormData(prev => ({
        ...prev,
        doctorId,
        doctor: selectedDoctor
          ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}`
          : prev.doctor,
      }));


    }



  }, [hospitalId, doctorId, hospitals, doctors]);


  const fetchDoctors = async (hId) => {
    try {
      const doctorsResponse = await fetch(`${url_prefix}/api/doctors/hospital/${hId}`);
      const doctorsResult = await doctorsResponse.json();
      if (doctorsResult.success) {
        setDoctors(doctorsResult.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle hospital selection
  const handleHospitalChange = (e) => {
    const hospitalId = e.target.value;
    const selectedHospital = hospitals.find(h => h._id === hospitalId);
    setLoading(true);
    fetchDoctors(hospitalId);
    setFormData({
      ...formData,
      hospitalId: hospitalId,
      hospital: selectedHospital ? selectedHospital.name : ""
    });
  };

  // Handle doctor selection
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find(d => d._id === doctorId);
    setFormData({
      ...formData,
      doctorId: doctorId,
      doctor: selectedDoctor ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}` : ""
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      // Prepare data for backend - send IDs instead of names
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        doctor: formData.doctorId, // Send doctor ID
        hospital: formData.hospitalId, // Send hospital ID
        date: formData.date,
        time: formData.time,
        message: formData.message
      };

      const response = await fetch(url_prefix + '/api/booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create booking');
      }

      // Send WhatsApp notification
      //       const whatsappMessage = `
      // *NEW APPOINTMENT BOOKING* 🏥

      // *Patient Name:* ${formData.name}
      // *Email:* ${formData.email}
      // *Phone:* ${formData.phone}
      // *Doctor:* ${formData.doctor}
      // *Hospital:* ${formData.hospital}
      // *Date:* ${formData.date}
      // *Time:* ${formData.time}
      // *Message:* ${formData.message || "None"}

      // *Booking Time:* ${new Date().toLocaleString()}
      //       `.trim();

      //       const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
      //       window.open(whatsappLink, '_blank');

      alert("Booking Confirmed ✅\nYour appointment has been scheduled successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        doctor: "",
        doctorId: "",
        hospital: "",
        hospitalId: "",
        date: "",
        time: "",
        message: ""
      });
      setStep(1);

    } catch (error) {
      console.error("Booking error:", error);
      alert("There was an issue processing your booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* Progress Steps */}
      <div className="flex justify-between mb-6">
        {["Personal Info", "Appointment Details", "Confirm"].map((label, i) => (
          <div
            key={i}
            className={`flex-1 text-center text-sm font-medium ${step === i + 1 ? "text-teal-600" : "text-gray-400"
              }`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${step === i + 1 ? "bg-teal-600 text-white" : "bg-gray-200"
                }`}
            >
              {i + 1}
            </div>
            {label}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            className="w-full border p-2 rounded mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="w-full border p-2 rounded mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            className="w-full border p-2 rounded mb-3"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button
            onClick={nextStep}
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!formData.name || !formData.email || !formData.phone}
          >
            Next →
          </button>
        </div>
      )}

      {/* Step 2: Appointment Details */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Appointment Details</h2>

          {/* Hospital Dropdown */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Hospital *
            </label>
            <select
              name="hospitalId"
              className="w-full border p-2 rounded"
              value={formData.hospitalId}
              onChange={handleHospitalChange}
              required
            >
              <option value="">Choose a hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.name} - {hospital.city}, {hospital.country}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Dropdown */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Doctor *
            </label>

            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span>Loading doctors...</span>
              </div>
            ) : (
              <select
                name="doctorId"
                className="w-full border p-2 rounded"
                value={formData.doctorId}
                onChange={handleDoctorChange}
                required
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                    {doctor.hospital && ` (${doctor.hospital.name})`}
                  </option>
                ))}
              </select>
            )}
          </div>


          <input
            type="date"
            name="date"
            className="w-full border p-2 rounded mb-3"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
          <input
            type="time"
            name="time"
            className="w-full border p-2 rounded mb-3"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Additional message (optional)"
            className="w-full border p-2 rounded mb-3 h-20 resize-none"
            value={formData.message}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              ← Back
            </button>
            <button
              onClick={nextStep}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!formData.doctorId || !formData.hospitalId || !formData.date || !formData.time}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <ul className="space-y-2 text-gray-700">
              <li><strong>Name:</strong> {formData.name}</li>
              <li><strong>Email:</strong> {formData.email}</li>
              <li><strong>Phone:</strong> {formData.phone}</li>
              <li><strong>Hospital:</strong> {formData.hospital}</li>
              <li><strong>Doctor:</strong> {formData.doctor}</li>
              <li><strong>Date:</strong> {formData.date}</li>
              <li><strong>Time:</strong> {formData.time}</li>
              {formData.message && (
                <li><strong>Message:</strong> {formData.message}</li>
              )}
            </ul>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              ← Back
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "Confirm Booking ✔"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}