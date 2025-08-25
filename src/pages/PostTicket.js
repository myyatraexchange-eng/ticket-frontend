import React, { useState } from "react";

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
    gender: "male",
    ticketCount: "",
    seatType: "sleeper",
  });

  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    if (["age", "ticketCount", "contactNumber"].includes(name)) {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setTicketData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setTicketData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(ticketData),
      });

      if (!res.ok) throw new Error("Failed to post ticket");

      setStatusMsg({ type: "success", text: "Ticket posted successfully!" });

      setTicketData({
        trainNumber: "",
        trainName: "",
        holderName: "",
        from: "",
        to: "",
        date: "",
        contactNumber: "",
        age: "",
        gender: "male",
        ticketCount: "",
        seatType: "sleeper",
      });
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: "error", text: "Error posting ticket. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Post a Ticket</h2>

      {statusMsg.text && (
        <div className={`mb-4 p-3 rounded ${statusMsg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="trainNumber" placeholder="Train Number" value={ticketData.trainNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="trainName" placeholder="Train Name" value={ticketData.trainName} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="holderName" placeholder="Passenger Name" value={ticketData.holderName} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="from" placeholder="From Station" value={ticketData.from} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="to" placeholder="To Station" value={ticketData.to} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="date" name="date" value={ticketData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="contactNumber" placeholder="Contact Number" value={ticketData.contactNumber} onChange={handleChange} className="w-full border p-2 rounded" maxLength={10} required />
          <input type="text" name="age" placeholder="Age" value={ticketData.age} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select name="gender" value={ticketData.gender} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select name="seatType" value={ticketData.seatType} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="sleeper">Sleeper</option>
            <option value="3ac">3AC</option>
            <option value="2ac">2AC</option>
            <option value="1ac">1AC</option>
            <option value="general">General</option>
          </select>
        </div>

        <input type="text" name="ticketCount" placeholder="Number of Tickets" value={ticketData.ticketCount} onChange={handleChange} className="w-full border p-2 rounded" required />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Posting..." : "Post Ticket"}
        </button>
      </form>
    </div>
  );
};

export default PostTicket;
