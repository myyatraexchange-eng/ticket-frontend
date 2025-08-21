import React, { useState } from 'react';

const Post = () => {
  const [formData, setFormData] = useState({
    trainNumber: '',
    trainName: '',
    from: '',
    to: '',
    date: '',
    tickets: '',
    holderName: '',
    contact: '',
    age: '',
    gender: '',
    travelClass: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aage backend connect hoga yahan
    console.log('Ticket Posted:', formData);
    alert('Ticket posted successfully!');
    setFormData({
      trainNumber: '',
      trainName: '',
      from: '',
      to: '',
      date: '',
      tickets: '',
      holderName: '',
      contact: '',
      age: '',
      gender: '',
      travelClass: ''
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Post Your Train Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Train Number</label>
          <input type="text" name="trainNumber" value={formData.trainNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">Train Name</label>
          <input type="text" name="trainName" value={formData.trainName} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block">From</label>
            <input type="text" name="from" value={formData.from} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div className="w-1/2">
            <label className="block">To</label>
            <input type="text" name="to" value={formData.to} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">No. of Tickets</label>
          <input type="number" name="tickets" value={formData.tickets} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">Ticket Holder Name</label>
          <input type="text" name="holderName" value={formData.holderName} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">Contact Number (will be hidden)</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block">Class</label>
          <select name="travelClass" value={formData.travelClass} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Class</option>
            <option value="Sleeper">Sleeper</option>
            <option value="3AC">3AC</option>
            <option value="2AC">2AC</option>
            <option value="1AC">1AC</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
          Post Ticket
        </button>
      </form>
    </div>
  );
};

export default Post;