import React, { useState } from "react";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Post = () => {
  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    from: "",
    to: "",
    date: "",
    ticketCount: "",      // ✅ backend field
    holderName: "",
    contactNumber: "",    // ✅ backend field
    age: "",
    gender: "",
    seatType: "",         // ✅ backend field
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Error: " + (error.message || "Failed to post ticket"));
        return;
      }

      await res.json();
      alert("✅ Ticket posted successfully!");

      // Reset form
      setFormData({
        trainNumber: "",
        trainName: "",
        from: "",
        to: "",
        date: "",
        ticketCount: "",
        holderName: "",
        contactNumber: "",
        age: "",
        gender: "",
        seatType: "",
        description: "",
      });
    } catch (err) {
      console.error("Post Ticket Error:", err);
      alert("❌ Network error, try again later");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Post Your Train Ticket
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Train Number</label>
          <input
            type="text"
            name="trainNumber"
            value={formData.trainNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Train Name</label>
          <input
            type="text"
            name="trainName"
            value={formData.trainName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block">To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">No. of Tickets</label>
          <input
            type="number"
            name="ticketCount"
            value={formData.ticketCount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Ticket Holder Name</label>
          <input
            type="text"
            name="holderName"
            value={formData.holderName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Contact Number (hidden until unlock)</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block">Class</label>
          <select
            name="seatType"
            value={formData.seatType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Class</option>
            <option value="sleeper">Sleeper</option>
            <option value="3ac">3AC</option>
            <option value="2ac">2AC</option>
            <option value="1ac">1AC</option>
            <option value="general">General</option>
          </select>
        </div>

        <div>
          <label className="block">Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Post Ticket
        </button>
      </form>
    </div>
  );
};

export default Post;
