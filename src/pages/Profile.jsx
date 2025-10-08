import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";

const Profile = () => {
  const { user, logout, token } = useAuth();
  const { tickets, removeTicket } = useTickets();
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Change Password
  const handleChangePassword = async () => {
    if (!newPassword.trim()) return alert("Please enter a new password");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/auth/change-password`, {
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

  // Delete Ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/tickets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete ticket");
      alert("✅ Ticket deleted successfully!");
      removeTicket(id);
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [token, navigate]);

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-500 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
        My Dashboard
      </h1>

      {/* User Info Card */}
      {user && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-2xl p-8 mb-12 border border-blue-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
            <p>
              <span className="font-semibold text-blue-600 uppercase">Name:</span>{" "}
              <span className="font-medium text-gray-800 uppercase">{user.name}</span>
            </p>
            <p>
              <span className="font-semibold text-blue-600 uppercase">Phone:</span>{" "}
              <span className="font-medium text-gray-800">{user.phone}</span>
            </p>
            <p>
              <span className="font-semibold text-blue-600 uppercase">Unique ID:</span>{" "}
              <span className="font-medium text-gray-800 uppercase">{user.uniqueId}</span>
            </p>
          </div>

          {/* Change Password */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-3 rounded-lg w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleChangePassword}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
            >
              Change Password
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="mt-6 bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      )}

      {/* Tickets Section */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">
          You haven’t unlocked any tickets yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-xl text-blue-700 mb-2 uppercase">
                  {ticket.trainName}
                </h3>
                <p className="text-gray-600 mb-1 uppercase">
                  {ticket.from} → {ticket.to} | {ticket.fromDateTime ? new Date(ticket.fromDateTime).toLocaleDateString() : "N/A"}
                </p>
                <p className="text-gray-600 uppercase">
                  Seat: {ticket.classType || "GENERAL"} | Tickets: {ticket.ticketNumber || "N/A"}
                </p>
                <p className="text-green-700 font-semibold uppercase mt-2">
                  {ticket.contactUnlocked ? `📞 Contact: ${ticket.contactNumber}` : "Payment Pending..."}
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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

