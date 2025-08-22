import React, { useState } from "react";

const TicketPost = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Ticket Data:", formData);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      const res = await fetch("https://ticket-backend-g5da.onrender.com/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // auth middleware ke liye
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Ticket Response:", data);

      if (res.ok) {
        alert("Ticket created successfully!");
        setFormData({ title: "", description: "" });
      } else {
        alert(data.message || "Failed to create ticket");
      }
    } catch (err) {
      console.error("Ticket Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Create a Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Post Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketPost;
