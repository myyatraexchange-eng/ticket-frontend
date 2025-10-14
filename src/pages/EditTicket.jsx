import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

export default function EditTicket() {
  const { id } = useParams();
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
    tickets: "",
    passengerName: "",
    age: "",
    gender: "",
    contactNumber: "",
    class: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const t = res.data.ticket;
        setFormData({
          trainNumber: t.trainNumber || "",
          trainName: t.trainName || "",
          from: t.from || "",
          to: t.to || "",
          fromDate: t.fromDateTime ? new Date(t.fromDateTime) : null,
          fromTime: t.fromDateTime ? new Date(t.fromDateTime) : null,
          toDate: t.toDateTime ? new Date(t.toDateTime) : null,
          toTime: t.toDateTime ? new Date(t.toDateTime) : null,
          tickets: t.ticketNumber || "",
          passengerName: t.passengerName || "",
          age: t.passengerAge || "",
          gender: t.passengerGender || "",
          contactNumber: t.contactNumber || "",
          class: t.classType || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load ticket data");
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromDateTime =
      formData.fromDate && formData.fromTime
        ? new Date(
            formData.fromDate.getFullYear(),
            formData.fromDate.getMonth(),
            formData.fromDate.getDate(),
            formData.fromTime.getHours(),
            formData.fromTime.getMinutes()
          ).toISOString()
        : null;
    const toDateTime =
      formData.toDate && formData.toTime
        ? new Date(
            formData.toDate.getFullYear(),
            formData.toDate.getMonth(),
            formData.toDate.getDate(),
            formData.toTime.getHours(),
            formData.toTime.getMinutes()
          ).toISOString()
        : null;

    const payload = { ...formData, fromDateTime, toDateTime };

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_BASE}/tickets/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Ticket updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update ticket");
    }
  };

  if (loading)
    return <p className="text-center mt-10 animate-pulse">Loading ticket...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded mt-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700 uppercase">Edit Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="trainNumber" placeholder="Train Number" value={formData.trainNumber} onChange={handleChange} className="w-full p-2 border rounded" required/>
        <input type="text" name="trainName" placeholder="Train Name" value={formData.trainName} onChange={handleChange} className="w-full p-2 border rounded uppercase" required/>
        <input type="text" name="from" placeholder="From" value={formData.from} onChange={handleChange} className="w-full p-2 border rounded uppercase" required/>
        <input type="text" name="to" placeholder="To" value={formData.to} onChange={handleChange} className="w-full p-2 border rounded uppercase" required/>

        {/* Departure */}
        <label className="block font-semibold">Departure Date</label>
        <DatePicker selected={formData.fromDate} onChange={(date)=>setFormData({...formData, fromDate: date, fromTime: null})} dateFormat="dd/MM/yyyy" placeholderText="Select Departure Date" className="w-full p-2 border rounded" required/>
        {formData.fromDate && (
          <>
            <label className="block font-semibold">Departure Time</label>
            <DatePicker selected={formData.fromTime} onChange={(time)=>setFormData({...formData, fromTime: time})} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="hh:mm aa" className="w-full p-2 border rounded" required/>
          </>
        )}

        {/* Arrival */}
        <label className="block font-semibold">Arrival Date</label>
        <DatePicker selected={formData.toDate} onChange={(date)=>setFormData({...formData, toDate: date, toTime: null})} dateFormat="dd/MM/yyyy" placeholderText="Select Arrival Date" className="w-full p-2 border rounded" minDate={formData.fromDate || new Date()} required/>
        {formData.toDate && (
          <>
            <label className="block font-semibold">Arrival Time</label>
            <DatePicker selected={formData.toTime} onChange={(time)=>setFormData({...formData, toTime: time})} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="hh:mm aa" className="w-full p-2 border rounded" required/>
          </>
        )}

        <input type="number" name="tickets" placeholder="Number of Tickets" value={formData.tickets} onChange={handleChange} className="w-full p-2 border rounded" required/>
        <input type="text" name="passengerName" placeholder="Passenger Name" value={formData.passengerName} onChange={handleChange} className="w-full p-2 border rounded uppercase" required/>
        <input type="number" name="age" placeholder="Passenger Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded"/>
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="w-full p-2 border rounded" required/>
        <select name="class" value={formData.class} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Class</option>
          <option value="general">General</option>
          <option value="sleeper">Sleeper</option>
          <option value="3ac">3AC</option>
          <option value="2ac">2AC</option>
          <option value="1ac">1AC</option>
        </select>

        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Update Ticket</button>
      </form>
    </div>
  );
}

