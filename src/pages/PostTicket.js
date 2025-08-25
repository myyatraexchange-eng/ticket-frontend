import React, { useState } from 'react';

const API_BASE = import.meta.env?.VITE_API_BASE || "https://ticket-backend-g5da.onrender.com";

const PostTicket = () => {
  const [formData, setFormData] = useState({
    trainNumber: '',
    trainName: '',
    holderName: '',
    from: '',
    to: '',
    date: '',
    contactNumber: '',
    age: '',
    gender: 'male',
    ticketCount: 1,
    seatType: 'sleeper',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agar auth use kar rahe ho, token yahan bhej sakte ho:
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `Failed: ${res.status}`);
      }

      setMessage('Ticket posted successfully!');
      setFormData({
        trainNumber: '',
        trainName: '',
        holderName: '',
        from: '',
        to: '',
        date: '',
        contactNumber: '',
        age: '',
        gender: 'male',
        ticketCount: 1,
        seatType: 'sleeper',
      });
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Post Your Ticket</h2>
      {message && <p className="text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Train Number', name: 'trainNumber', type: 'text' },
          { label: 'Train Name', name: 'trainName', type: 'text' },
          { label: 'Holder Name', name: 'holderName', type: 'text' },
          { label: 'From', name: 'from', type: 'text' },
          { label: 'To', name: 'to', type: 'text' },
          { label: 'Date', name: 'date', type: 'date' },
          { label: 'Contact Number', name: 'contactNumber', type: 'text' },
          { label: 'Age', name: 'age', type: 'number' },
        ].map(field => (
          <div key={field.name}>
            <label className="block font-semibold mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-semibold mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Ticket Count</label>
          <input
            type="number"
            name="ticketCount"
            min="1"
            value={formData.ticketCount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Seat Type</label>
          <select
            name="seatType"
            value={formData.seatType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="sleeper">Sleeper</option>
            <option value="3ac">3AC</option>
            <option value="2ac">2AC</option>
            <option value="1ac">1AC</option>
            <option value="general">General</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Ticket'}
        </button>
      </form>
    </div>
  );
};

export default PostTicket;
