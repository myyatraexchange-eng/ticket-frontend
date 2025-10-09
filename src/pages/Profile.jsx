// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";

const Profile = () => {
  const { user, logout, token } = useAuth();
  const { tickets, removeTicket } = useTickets();

  const [postedTickets, setPostedTickets] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Fetch user's tickets
  const fetchUserTickets = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/tickets/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load tickets");
      const data = await res.json();

      // Separate tickets
      setPostedTickets(data.filter(t => t.postedBy === user._id) || []);
      setBookedTickets(data.filter(t => t.postedBy !== user._id) || []);
    } catch (err) {
      console.error("Error loading tickets:", err);
    } finally {
      setLoading(false);
    }
  };

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
      fetchUserTickets();
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-ticket/${id}`);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserTickets();
  }, [token, navigate]);

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-500 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
        My Dashboard
      </h1>

      {/* User Info */}
      {user && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-2xl p-8 mb-12 border border-blue-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
            <p><span className="font-semibold text-blue-600 uppercase">Name:</span> {user.name}</p>
            <p><span className="font-semibold text-blue-600 uppercase">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold text-blue-600 uppercase">Unique ID:</span> {user.uniqueId}</p>
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

      {/* Posted Tickets (Seller) */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Posted Tickets</h2>
      {postedTickets.length === 0 ? (
        <p className="text-gray-600 text-center text-lg mb-10">You haven’t posted any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {postedTickets.map(ticket => (
            <div key={ticket._id} className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h3 className="font-bold text-xl text-blue-700 mb-2 uppercase">{ticket.trainName}</h3>
              <p className="text-gray-600 mb-1 uppercase">{ticket.from} → {ticket.to} | {new Date(ticket.fromDateTime).toLocaleDateString()}</p>
              <p className="text-gray-600 uppercase">Seat: {ticket.classType} | Tickets: {ticket.ticketNumber}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => handleEdit(ticket._id)} className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Edit</button>
                <button onClick={() => handleDelete(ticket._id)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booked Tickets (Buyer) */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Booked Tickets</h2>
      {bookedTickets.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">You haven’t booked any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookedTickets.map(ticket => (
            <div key={ticket._id} className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h3 className="font-bold text-xl text-blue-700 mb-2 uppercase">{ticket.trainName}</h3>
              <p className="text-gray-600 mb-1 uppercase">{ticket.from} → {ticket.to} | {new Date(ticket.fromDateTime).toLocaleDateString()}</p>
              <p className="text-gray-600 uppercase">Seat: {ticket.classType} | Tickets: {ticket.ticketNumber}</p>
              <p className="mt-3 font-semibold uppercase">
                {ticket.paymentStatus === "confirmed" ? (
                  <span className="text-green-600">✅ Confirmed | 📞 Contact: {ticket.contactNumber}</span>
                ) : (
                  <span className="text-yellow-600">⏳ Pending Confirmation</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

