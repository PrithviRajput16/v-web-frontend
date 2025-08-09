import React, { useState } from "react";

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
  });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For demo: just show success. Replace with real API call.
    console.log("appointment", form);
    setSuccess(true);
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      {success ? (
        <div className="text-center text-green-700">
          Appointment requested — we'll reach out to confirm.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />
          <input
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            placeholder="Preferred doctor"
            className="w-full border p-2 rounded"
          />
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded"
          >
            Request Appointment
          </button>
        </form>
      )}
    </div>
  );
}
