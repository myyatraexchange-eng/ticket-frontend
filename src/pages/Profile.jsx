import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Fetch my tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${API_BASE}/tickets/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
        alert("❌ Could not load your tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  // ✅ Delete Ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete ticket");

      alert("✅ Ticket deleted successfully!");
      setTickets(tickets.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading your tickets...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">My Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-gray-600">You haven’t created any tickets yet.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {ticket.trainName} ({ticket.trainNumber})
                </p>
                <p className="text-sm text-gray-600">
                  {ticket.from} → {ticket.to} | {new Date(ticket.date).toDateString()}
                </p>
                <p className="text-sm">
                  Seat: {ticket.seatType} | Tickets: {ticket.ticketCount}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit-ticket/${ticket._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

