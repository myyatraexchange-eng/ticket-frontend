import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Token localStorage me rakha hoga (login ke time set kiya hoga)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);

        // 🔹 user info
        const resUser = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resUser.ok) throw new Error("Failed to fetch user");
        const userData = await resUser.json();
        setUser(userData);

        // 🔹 user tickets
        const resTickets = await fetch(`${API_BASE}/tickets/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resTickets.ok) throw new Error("Failed to fetch tickets");
        const ticketData = await resTickets.json();
        setTickets(ticketData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete ticket");

      // frontend se bhi remove karo
      setTickets((prev) => prev.filter((t) => t._id !== ticketId));
    } catch (err) {
      console.error(err);
      alert("❌ Ticket delete failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        My Profile
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading profile...</p>
      ) : !user ? (
        <p className="text-center text-red-600">
          Failed to load profile. Please login again.
        </p>
      ) : (
        <>
          {/* User Info */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Tickets */}
          <h3 className="text-xl font-semibold mb-4">My Tickets</h3>
          {tickets.length === 0 ? (
            <p className="text-gray-500">You have not posted any tickets yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white shadow-md rounded p-4 border"
                >
                  <h4 className="font-semibold text-blue-600">
                    {ticket.trainName} ({ticket.trainNumber})
                  </h4>
                  <p>
                    <strong>From → To:</strong> {ticket.from} → {ticket.to}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {ticket.date
                      ? new Date(ticket.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Seats:</strong> {ticket.ticketCount} ({ticket.seatType})
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/edit-ticket/${ticket._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
