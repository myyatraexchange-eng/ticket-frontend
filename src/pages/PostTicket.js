import React, { useState } from 'react';
const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const PostTicket = () => {
  const [formData, setFormData] = useState({
    trainNumber: '',
    trainName: '',
    from: '',
    to: '',
    date: '',
    holderName: '',
    contactNumber: '',
    age: '',
    gender: '',
    ticketCount: '',
    seatType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    if (
      !formData.trainNumber ||
      !formData.trainName ||
      !formData.holderName ||
      !formData.from ||
      !formData.to ||
      !formData.date ||
      !formData.contactNumber ||
      !formData.age ||
      !formData.gender ||
      !formData.ticketCount ||
      !formData.seatType
    ) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/tickets`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        alert('Ticket posted successfully!');
        setFormData({
          trainNumber: '',
          trainName: '',
          from: '',
          to: '',
          date: '',
          holderName: '',
          contactNumber: '',
          age: '',
          gender: '',
          ticketCount: '',
          seatType: '',
        });
      } else {
        const errorData = await response.json();
        alert('Error posting ticket: ' + (errorData.error || response.statusText));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post Ticket</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="trainNumber" value={formData.trainNumber} onChange={handleChange} placeholder="Train Number" className="border p-2" />
        <input name="trainName" value={formData.trainName} onChange={handleChange} placeholder="Train Name" className="border p-2" />
        <input name="holderName" value={formData.holderName} onChange={handleChange} placeholder="Ticket Holder Name" className="border p-2" />
        <input name="from" value={formData.from} onChange={handleChange} placeholder="From Station" className="border p-2" />
        <input name="to" value={formData.to} onChange={handleChange} placeholder="To Station" className="border p-2" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2" />
        <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" className="border p-2" />

        {/* New Fields */}
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="border p-2" />
        
        <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input type="number" name="ticketCount" value={formData.ticketCount} onChange={handleChange} placeholder="Number of Tickets" className="border p-2" />
        
        <select name="seatType" value={formData.seatType} onChange={handleChange} className="border p-2">
          <option value="">Select Seat Type</option>
          <option value="sleeper">Sleeper</option>
          <option value="3ac">3 AC</option>
          <option value="2ac">2 AC</option>
          <option value="1ac">1 AC</option>
          <option value="general">General</option>
        </select>
      </div>
      <button onClick={handlePost} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Post Ticket
      </button>
    </div>
  );
};

export default PostTicket;
