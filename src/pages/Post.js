import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async"; // SEO

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
      "trainName",
      "from",
      "to",
      "passengerName",
      "passengerGender",
      "classType",
    ];
    let newValue = upperFields.includes(name) ? value.toUpperCase() : value;

    const numberFields = [
      "trainNumber",
      "ticketNumber",
      "passengerAge",
      "contactNumber",
    ];
    if (numberFields.includes(name)) newValue = newValue.replace(/\D/g, "");

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      passengerAge: formData.passengerAge || undefined,
      passengerGender: formData.passengerGender,
      contactNumber: formData.contactNumber,
      classType: formData.classType,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ Please log in first to post a ticket!");
        navigate("/login");
        return;
      }

      await axios.post(`${API_BASE}/tickets`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Ticket posted successfully!");
      navigate("/profile");
    } catch (error) {
      alert(
        `❌ Failed to post ticket: ${
          error.response?.data?.message || "Server error"
        }`
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-2xl mt-6">

      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Post Train Ticket | MyYatraExchange</title>

        <meta
          name="description"
          content="Post your confirmed train ticket for exchange on MyYatraExchange. Safe and quick way to avoid cancellation loss and help passengers find tickets."
        />

        <meta
          name="keywords"
          content="post train ticket, sell train ticket, ticket exchange, IRCTC ticket post, MyYatraExchange"
        />

        <link rel="canonical" href="https://www.myyatraexchange.com/post" />

        {/* Open Graph */}
        <meta property="og:title" content="Post Train Ticket – MyYatraExchange" />
        <meta
          property="og:description"
          content="Post your available train tickets easily and safely. Help others get confirmed seats."
        />
        <meta property="og:url" content="https://www.myyatraexchange.com/post" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD Schema (SAFE version) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Post Train Ticket",
              "url": "https://www.myyatraexchange.com/post",
              "description": "Post your confirmed train ticket for exchange on MyYatraExchange."
            }`,
          }}
        />
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 uppercase">
        Post Your Ticket
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="trainNumber"
          placeholder="Train Number (e.g. 12345)"
          value={formData.trainNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="trainName"
          placeholder="Train Name (e.g. RAJDHANI EXPRESS)"
          value={formData.trainName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />

        <input
          type="text"
          name="from"
          placeholder="From (e.g. BHOPAL)"
          value={formData.from}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />

        <input
          type="text"
          name="to"
          placeholder="To (e.g. DELHI)"
          value={formData.to}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />

        {/* Departure Date */}
        <label className="block font-semibold">Departure Date</label>
        <DatePicker
          selected={formData.fromDate}
          onChange={(date) => setFormData({ ...formData, fromDate: date })}
          dateFormat="dd/MM/yyyy"
          className="w-full p-3 border rounded-lg"
          minDate={new Date()}
          required
        />

        {/* Departure Time */}
        <label className="block font-semibold">Departure Time</label>
        <DatePicker
          selected={formData.fromTime}
          onChange={(time) => setFormData({ ...formData, fromTime: time })}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="hh:mm aa"
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Arrival Date */}
        <label className="block font-semibold">Arrival Date</label>
        <DatePicker
          selected={formData.toDate}
          onChange={(date) => setFormData({ ...formData, toDate: date })}
          dateFormat="dd/MM/yyyy"
          className="w-full p-3 border rounded-lg"
          minDate={formData.fromDate || new Date()}
          required
        />

        {/* Arrival Time */}
        <label className="block font-semibold">Arrival Time</label>
        <DatePicker
          selected={formData.toTime}
          onChange={(time) => setFormData({ ...formData, toTime: time })}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="hh:mm aa"
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="number"
          name="ticketNumber"
          placeholder="Number of Tickets (e.g. 2)"
          value={formData.ticketNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="passengerName"
          placeholder="Passenger Name (e.g. RAJ KUMAR)"
          value={formData.passengerName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg uppercase"
          required
        />

        <input
          type="number"
          name="passengerAge"
          placeholder="Passenger Age (e.g. 25)"
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
          placeholder="Contact Number (e.g. 9876543210)"
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

