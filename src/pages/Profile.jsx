import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import useAuth

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const { user, token, logout } = useAuth(); // ✅ from AuthContext
  const navigate = useNavigate();

  // ✅ Fetch tickets only (user data already in context)
  useEffect(() => {
    const fetchTickets = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/tickets/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch tickets");
        const ticketData = await res.json();
        setTickets(ticketData);
      } catch (err) {
        console.error(err);
        alert("❌ Could not load tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token, navigate]);

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

  // ✅ Change Password
  const handleChangePassword = async () => {
    if (!newPassword.trim()) return alert("Please enter a new password");
    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!res.ok) throw new Error("Failed to change password");
      alert("✅ Password changed successfully!");
      setNewPassword("");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        My Profile
      </h1>

      {/* User Info Card */}
      {user && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            User Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-700">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-medium text-gray-700">Unique ID:</span>{" "}
              {user.uniqueId}
            </p>
          </div>

          {/* Change Password */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleChangePassword}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
            >
              Change Password
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout(); // ✅ direct useAuth logout
              navigate("/login");
            }}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      )}

      {/* Tickets Section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven’t created any tickets yet.
        </p>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
            >
              <div className="mb-4 md:mb-0">
                <p className="font-semibold text-lg text-blue-700">
                  {ticket.trainName} ({ticket.trainNumber})
                </p>
                <p className="text-gray-600 text-sm">
                  {ticket.from} → {ticket.to} |{" "}
                  {ticket.date
                    ? new Date(ticket.date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-600 text-sm">
                  Seat: {ticket.seatType} | Tickets: {ticket.ticketCount}
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => navigate(`/edit-ticket/${ticket._id}`)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition w-full md:w-auto"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full md:w-auto"
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

