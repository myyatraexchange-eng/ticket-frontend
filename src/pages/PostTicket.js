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
      !formData.contactNumber
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
        body: JSON.stringify({
          trainNumber: formData.trainNumber,
          trainName: formData.trainName,
          holderName: formData.holderName,
          from: formData.from,
          to: formData.to,
          date: formData.date,
          contactNumber: formData.contactNumber,
        }),
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
      </div>
      <button onClick={handlePost} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Post Ticket
      </button>
    </div>
  );
};

export default PostTicket;
