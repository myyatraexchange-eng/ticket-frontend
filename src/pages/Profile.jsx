import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Fetch profile + tickets
  useEffect(() => {
    const fetchData = async () => {
      try {
        // User info
        const resUser = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resUser.ok) throw new Error("Failed to fetch user");
        const userData = await resUser.json();
        setUser(userData);

        // User tickets
        const resTickets = await fetch(`${API_BASE}/tickets/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resTickets.ok) throw new Error("Failed to fetch tickets");
        const ticketData = await resTickets.json();
        setTickets(ticketData);
      } catch (err) {
        console.error(err);
        alert("❌ Could not load profile or tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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

  if (loading) return <p className="text-center mt-6">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600 text-center">
        My Profile
      </h1>

      {/* User Info */}
      {user && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Unique ID:</strong> {user.uniqueId}
          </p>
          <p>
            <strong>Password:</strong> ********
          </p>

          {/* Change Password */}
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button
              onClick={handleChangePassword}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Change Password
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* Tickets */}
      <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
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
                  {ticket.from} → {ticket.to} |{" "}
                  {ticket.date
                    ? new Date(ticket.date).toLocaleDateString()
                    : "N/A"}
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

