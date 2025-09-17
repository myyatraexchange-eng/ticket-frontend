import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    from: "",
    to: "",
    date: "",
    ticketCount: 1,
    seatType: "",
    holderName: "",
    contactNumber: "",
    age: "",
    gender: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing ticket
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`${API_BASE}/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch ticket");
        const data = await res.json();

        setFormData({
          trainNumber: data.trainNumber,
          trainName: data.trainName,
          from: data.from,
          to: data.to,
          date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
          ticketCount: data.ticketCount,
          seatType: data.seatType,
          holderName: data.holderName,
          contactNumber: data.contactNumber,
          age: data.age,
          gender: data.gender,
          description: data.description || "",
        });
      } catch (err) {
        console.error(err);
        alert("❌ Could not load ticket");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token, navigate]);

  // ✅ Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit (PUT method for update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, {
        method: "PUT", // ✅ PATCH → PUT fix
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update ticket");

      alert("✅ Ticket updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading ticket...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Edit Ticket
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="trainNumber"
          value={formData.trainNumber}
          onChange={handleChange}
          placeholder="Train Number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="trainName"
          value={formData.trainName}
          onChange={handleChange}
          placeholder="Train Name"
          required
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="From"
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="To"
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="ticketCount"
          value={formData.ticketCount}
          onChange={handleChange}
          placeholder="Number of Tickets"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="seatType"
          value={formData.seatType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Seat Type</option>
          <option value="sleeper">Sleeper</option>
          <option value="3ac">3AC</option>
          <option value="2ac">2AC</option>
          <option value="1ac">1AC</option>
          <option value="general">General</option>
        </select>
        <input
          type="text"
          name="holderName"
          value={formData.holderName}
          onChange={handleChange}
          placeholder="Ticket Holder Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="w-full p-2 border rounded"
        />
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
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default EditTicket;

