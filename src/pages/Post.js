import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Post = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    from: "",
    to: "",
    fromDate: null,
    fromTime: null,
    toDate: null,
    toTime: null,
    ticketNumber: "",
    passengerName: "",
    passengerAge: "",
    passengerGender: "",
    contactNumber: "",
    classType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const upperFields = [
      "trainNumber",
      "trainName",
      "from",
      "to",
      "passengerName",
      "passengerGender",
      "classType",
    ];
    const newValue = upperFields.includes(name) ? value.toUpperCase() : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required validation
    const requiredFields = [
      "trainNumber",
      "trainName",
      "from",
      "to",
      "fromDate",
      "fromTime",
      "toDate",
      "toTime",
      "ticketNumber",
      "passengerName",
      "contactNumber",
      "classType",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`❌ Please fill the ${field}`);
        return;
      }
    }

    const fromDateTime = new Date(
      formData.fromDate.getFullYear(),
      formData.fromDate.getMonth(),
      formData.fromDate.getDate(),
      formData.fromTime.getHours(),
      formData.fromTime.getMinutes()
    ).toISOString();

    const toDateTime = new Date(
      formData.toDate.getFullYear(),
      formData.toDate.getMonth(),
      formData.toDate.getDate(),
      formData.toTime.getHours(),
      formData.toTime.getMinutes()
    ).toISOString();

    const payload = {
      trainNumber: formData.trainNumber,
      trainName: formData.trainName,
      from: formData.from,
      to: formData.to,
      fromDateTime,
      toDateTime,
      ticketNumber: formData.ticketNumber,
      passengerName: formData.passengerName,
      passengerAge: formData.passengerAge,
      passengerGender: formData.passengerGender,
      contactNumber: formData.contactNumber,
      classType: formData.classType,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE}/tickets`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Ticket posted successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Ticket Post Error:", error.response?.data || error.message);
      alert(
        `❌ Failed to post ticket: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-2xl mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 uppercase">
        Post Your Ticket
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="trainNumber"
          placeholder="Train Number"
          value={formData.trainNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />
        <input
          type="text"
          name="trainName"
          placeholder="Train Name"
          value={formData.trainName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />
        <input
          type="text"
          name="from"
          placeholder="From"
          value={formData.from}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />

        <label className="block font-semibold">Departure Date</label>
        <DatePicker
          selected={formData.fromDate}
          onChange={(date) => setFormData({ ...formData, fromDate: date, fromTime: null })}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Departure Date"
          className="w-full p-3 border rounded-lg"
          minDate={new Date()}
          required
        />
        {formData.fromDate && (
          <>
            <label className="block font-semibold">Departure Time</label>
            <DatePicker
              selected={formData.fromTime}
              onChange={(time) => setFormData({ ...formData, fromTime: time })}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="hh:mm aa"
              placeholderText="Select Departure Time"
              className="w-full p-3 border rounded-lg"
              required
            />
          </>
        )}

        <label className="block font-semibold">Arrival Date</label>
        <DatePicker
          selected={formData.toDate}
          onChange={(date) => setFormData({ ...formData, toDate: date, toTime: null })}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Arrival Date"
          className="w-full p-3 border rounded-lg"
          minDate={formData.fromDate || new Date()}
          required
        />
        {formData.toDate && (
          <>
            <label className="block font-semibold">Arrival Time</label>
            <DatePicker
              selected={formData.toTime}
              onChange={(time) => setFormData({ ...formData, toTime: time })}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="hh:mm aa"
              placeholderText="Select Arrival Time"
              className="w-full p-3 border rounded-lg"
              required
            />
          </>
        )}

        <input
          type="number"
          name="ticketNumber"
          placeholder="Number of Tickets"
          value={formData.ticketNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="passengerName"
          placeholder="Passenger Name"
          value={formData.passengerName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />
        <input
          type="number"
          name="passengerAge"
          placeholder="Passenger Age"
          value={formData.passengerAge}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <select
          name="passengerGender"
          value={formData.passengerGender}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <select
          name="classType"
          value={formData.classType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        >
          <option value="">Select Class</option>
          <option value="GENERAL">General</option>
          <option value="SLEEPER">Sleeper</option>
          <option value="3AC">3AC</option>
          <option value="2AC">2AC</option>
          <option value="1AC">1AC</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 uppercase font-semibold w-full"
        >
          Post Ticket
        </button>
      </form>
    </div>
  );
};

export default Post;

