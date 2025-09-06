<<<<<<< HEAD
// Get single ticket (Private)
router.get("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user._id });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ticket" });
  }
});

// Update ticket (Private)
router.patch("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Failed to update ticket" });
  }
});
=======
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

const EditTicket = () => {
  const { id } = useParams(); // URL se ticket id
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch ticket");
        const data = await res.json();
        setTicket(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticket),
      });

      if (!res.ok) throw new Error("Failed to update ticket");

      alert("✅ Ticket updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update ticket");
    }
  };

  if (loading) return <p className="text-center">Loading ticket...</p>;
  if (!ticket) return <p className="text-center text-red-500">Ticket not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Edit Ticket
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 border grid gap-4"
      >
        <input
          type="text"
          name="trainName"
          value={ticket.trainName}
          onChange={handleChange}
          placeholder="Train Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="trainNumber"
          value={ticket.trainNumber}
          onChange={handleChange}
          placeholder="Train Number"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="from"
          value={ticket.from}
          onChange={handleChange}
          placeholder="From"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="to"
          value={ticket.to}
          onChange={handleChange}
          placeholder="To"
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={ticket.date ? ticket.date.slice(0, 10) : ""}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="ticketCount"
          value={ticket.ticketCount}
          onChange={handleChange}
          placeholder="Number of Tickets"
          className="border p-2 rounded"
          required
        />

        <select
          name="seatType"
          value={ticket.seatType}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="sleeper">Sleeper</option>
          <option value="3ac">3AC</option>
          <option value="2ac">2AC</option>
          <option value="1ac">1AC</option>
          <option value="general">General</option>
        </select>

        <input
          type="text"
          name="holderName"
          value={ticket.holderName}
          onChange={handleChange}
          placeholder="Passenger Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="age"
          value={ticket.age}
          onChange={handleChange}
          placeholder="Age"
          className="border p-2 rounded"
          required
        />

        <select
          name="gender"
          value={ticket.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTicket;

>>>>>>> fix: added react-helmet dependency
