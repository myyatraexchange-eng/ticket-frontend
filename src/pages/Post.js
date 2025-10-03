import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Post = () => {
  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    from: "",
    to: "",
    fromDateTime: null,
    toDateTime: null,
    ticketCount: "",
    holderName: "",
    contactNumber: "",
    age: "",
    gender: "",
    seatType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateTimeChange = (field, value) => {
    setFormData({ ...formData, [field]: value.toDate() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      trainName: formData.trainName,
      trainNumber: formData.trainNumber,
      from: formData.from,
      to: formData.to,
      fromDateTime: formData.fromDateTime,
      toDateTime: formData.toDateTime,
      tickets: Number(formData.ticketCount),      // renamed
      class: formData.seatType,                   // renamed
      passengerName: formData.holderName,        // renamed
      gender: formData.gender,
      age: Number(formData.age),
      contactNumber: formData.contactNumber,
      price: 20,                                  // fixed 20₹ for contact unlock
    };

    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Error: " + (error.message || "Failed to post ticket"));
        return;
      }

      alert("✅ Ticket posted successfully!");
      setFormData({
        trainNumber: "",
        trainName: "",
        from: "",
        to: "",
        fromDateTime: null,
        toDateTime: null,
        ticketCount: "",
        holderName: "",
        contactNumber: "",
        age: "",
        gender: "",
        seatType: "",
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
        {/* Train Number */}
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

        {/* Train Name */}
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

        {/* From - To */}
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

        {/* From DateTime */}
        <div>
          <label className="block">From Date & Time</label>
          <Datetime
            value={formData.fromDateTime}
            onChange={(val) => handleDateTimeChange("fromDateTime", val)}
            dateFormat="DD-MM-YYYY"
            timeFormat="hh:mm A"
            inputProps={{ className: "w-full p-2 border rounded" }}
          />
        </div>

        {/* To DateTime */}
        <div>
          <label className="block">To Date & Time</label>
          <Datetime
            value={formData.toDateTime}
            onChange={(val) => handleDateTimeChange("toDateTime", val)}
            dateFormat="DD-MM-YYYY"
            timeFormat="hh:mm A"
            inputProps={{ className: "w-full p-2 border rounded" }}
          />
        </div>

        {/* Tickets */}
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

        {/* Holder Name */}
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

        {/* Contact */}
        <div>
          <label className="block">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Age */}
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

        {/* Gender */}
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

        {/* Class */}
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

