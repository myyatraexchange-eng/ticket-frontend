import React, { useState } from 'react';

// Backend URL
const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";

const PostTicket = () => {
  const [ticketData, setTicketData] = useState({
    trainNumber: "",
    trainName: "",
    holderName: "",
    from: "",
    to: "",
    date: "",
    contactNumber: "",
    age: "",
    gender: "",
    ticketCount: "",
    seatType: "",
  });

  const handleChange = e => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // auth token if needed
      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(ticketData),
      });
      if (!res.ok) throw new Error("Failed to post ticket");
      alert("Ticket posted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error posting ticket");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(ticketData).map(key => (
          <input
            key={key}
            type={key === "date" ? "date" : "text"}
            name={key}
            placeholder={key}
            value={ticketData[key]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700">
          Post Ticket
        </button>
      </form>
    </div>
  );
};

export default PostTicket;
