import React, { useState } from 'react';

// Backend URL (Render par chalega)
const API_BASE = import.meta.env.VITE_API_BASE || "https://ticket-backend-g5da.onrender.com";

const Post = () => {
  const [form, setForm] = useState({
    trainName: "",
    trainNumber: "",
    from: "",
    to: "",
    date: "",
    ticketCount: 1,
    seatType: "",
    holderName: "",
    gender: "",
    age: "",
    contactNumber: "",
    contactVisible: true
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Posting ticket...");

    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error(`Failed with status ${res.status}`);

      setMessage("✅ Ticket posted successfully!");
      setForm({
        trainName: "",
        trainNumber: "",
        from: "",
        to: "",
        date: "",
        ticketCount: 1,
        seatType: "",
        holderName: "",
        gender: "",
        age: "",
        contactNumber: "",
        contactVisible: true
      });
    } catch (err) {
      console.error("Error posting ticket:", err);
      setMessage("❌ Error posting ticket. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Post Your Ticket</h2>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input type="text" name="trainName" placeholder="Train Name" value={form.trainName} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="trainNumber" placeholder="Train Number" value={form.trainNumber} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="from" placeholder="From" value={form.from} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="to" placeholder="To" value={form.to} onChange={handleChange} className="border p-2 rounded" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="ticketCount" placeholder="Ticket Count" value={form.ticketCount} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="seatType" placeholder="Class (e.g., Sleeper, 3AC)" value={form.seatType} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="holderName" placeholder="Passenger Name" value={form.holderName} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} className="border p-2 rounded" required />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
          Post Ticket
        </button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default PostTicket;
