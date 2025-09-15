import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch ticket
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`${API_BASE}/tickets/${id}`);
        if (!res.ok) throw new Error("Failed to fetch ticket");
        const data = await res.json();
        setTicket(data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  // update ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      });
      if (!res.ok) throw new Error("Failed to update ticket");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Edit Ticket
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Train Name"
          value={ticket.trainName || ""}
          onChange={(e) => setTicket({ ...ticket, trainName: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="From"
          value={ticket.from || ""}
          onChange={(e) => setTicket({ ...ticket, from: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="To"
          value={ticket.to || ""}
          onChange={(e) => setTicket({ ...ticket, to: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={
            ticket.date ? new Date(ticket.date).toISOString().slice(0, 10) : ""
          }
          onChange={(e) => setTicket({ ...ticket, date: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Ticket Count"
          value={ticket.ticketCount || ""}
          onChange={(e) =>
            setTicket({ ...ticket, ticketCount: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default EditTicket;
