import { useState } from "react";

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* Progress Steps */}
      <div className="flex justify-between mb-6">
        {["Personal Info", "Appointment Details", "Confirm"].map((label, i) => (
          <div
            key={i}
            className={`flex-1 text-center text-sm font-medium ${
              step === i + 1 ? "text-teal-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                step === i + 1 ? "bg-teal-600 text-white" : "bg-gray-200"
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
            placeholder="Full Name"
            className="w-full border p-2 rounded mb-3"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded mb-3"
            value={formData.phone}
            onChange={handleChange}
          />
          <button
            onClick={nextStep}
            className="w-full bg-teal-600 text-white p-2 rounded"
          >
            Next →
          </button>
        </div>
      )}

      {/* Step 2: Appointment Details */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
          <select
            name="doctor"
            className="w-full border p-2 rounded mb-3"
            value={formData.doctor}
            onChange={handleChange}
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Jane">Dr. Jane</option>
            <option value="Dr. Ali">Dr. Ali</option>
          </select>
          <input
            type="date"
            name="date"
            className="w-full border p-2 rounded mb-3"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            className="w-full border p-2 rounded mb-3"
            value={formData.time}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              ← Back
            </button>
            <button
              onClick={nextStep}
              className="bg-teal-600 text-white px-4 py-2 rounded"
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
          <ul className="mb-4 text-gray-700">
            <li>
              <strong>Name:</strong> {formData.name}
            </li>
            <li>
              <strong>Email:</strong> {formData.email}
            </li>
            <li>
              <strong>Phone:</strong> {formData.phone}
            </li>
            <li>
              <strong>Doctor:</strong> {formData.doctor}
            </li>
            <li>
              <strong>Date:</strong> {formData.date}
            </li>
            <li>
              <strong>Time:</strong> {formData.time}
            </li>
          </ul>
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              ← Back
            </button>
            <button
              onClick={() => alert("Booking Confirmed ✅")}
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Confirm ✔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
