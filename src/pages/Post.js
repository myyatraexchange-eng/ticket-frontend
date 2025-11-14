import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";   // ✅ SEO Added

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

    const numberFields = ["trainNumber", "ticketNumber", "passengerAge", "contactNumber"];
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

      const res = await axios.post(`${API_BASE}/tickets`, payload, {
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

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Post Train Ticket",
            "url": "https://www.myyatraexchange.com/post",
            "description": "Post your confirmed train ticket for exchange on MyYatraExchange."
          }
          `}
        </script>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 uppercase">
        Post Your Ticket
      </h2>

