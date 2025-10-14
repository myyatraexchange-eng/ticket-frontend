// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const { user, logout, token } = useAuth();
  const { tickets, removeTicket } = useTickets();
  const [postedTickets, setPostedTickets] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // fetch posted & booked tickets (server should return organized data)
  const fetchUserTickets = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/tickets/my-tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      // backend expected to return { postedTickets: [...], bookedTickets: [...] }
      setPostedTickets(data.postedTickets || data.posted || []);
      setBookedTickets(data.bookedTickets || data.booked || []);
    } catch (err) {
      console.error(err);
      alert("Could not load your tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ticket?")) return;
    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Delete failed");
      alert("Deleted");
      setPostedTickets(prev => prev.filter(p => p._id !== id));
      removeTicket?.(id);
    } catch (err) {
      alert(err.message || "Failed to delete");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword.trim()) return alert("Enter new password");
    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!res.ok) throw new Error("Failed to change");
      alert("Password updated");
      setNewPassword("");
    } catch (err) {
      alert(err.message || "Error");
    }
  };

  if (loading) return <p className="text-center mt-20 animate-pulse">Loading profile...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">My Dashboard</h1>

      {user && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-8 border">
          <h2 className="text-2xl font-semibold mb-4">User Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><span className="font-semibold">Name:</span> {user.name}</div>
            <div><span className="font-semibold">Phone:</span> {user.phone}</div>
            <div><span className="font-semibold">ID:</span> {user.uniqueId}</div>
          </div>

          <div className="mt-6 flex gap-3">
            <input type="password" placeholder="New password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="border p-2 rounded flex-1" />
            <button onClick={handleChangePassword} className="bg-green-600 text-white px-4 py-2 rounded">Change Password</button>
          </div>

          <button onClick={() => { logout(); navigate("/login"); }} className="mt-6 bg-red-500 text-white px-6 py-2 rounded">Logout</button>
        </div>
      )}

      {/* Seller: My Posted Tickets */}
      <h2 className="text-3xl font-bold mb-4">My Posted Tickets</h2>
      {postedTickets.length === 0 ? (
        <p className="text-gray-600 mb-8">You haven't posted tickets.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {postedTickets.map(t => (
            <div key={t._id} className="bg-white p-5 rounded shadow">
              <h3 className="font-bold text-lg">{t.trainName} ({t.trainNumber})</h3>
              <p className="text-sm uppercase">{t.from} → {t.to} | {new Date(t.fromDateTime).toLocaleDateString()}</p>
              <p className="mt-2">Tickets: {t.ticketNumber} | Class: {t.classType}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={()=>navigate(`/edit-ticket/${t._id}`)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={()=>handleDelete(t._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buyer: My Booked Tickets (from payment proofs) */}
      <h2 className="text-3xl font-bold mb-4">My Booked Tickets</h2>
      {bookedTickets.length === 0 ? (
        <p className="text-gray-600">You haven't booked any tickets.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookedTickets.map(t => (
            <div key={t._id} className="bg-white p-5 rounded shadow">
              <h3 className="font-bold">{t.trainName} ({t.trainNumber})</h3>
              <p className="text-sm uppercase">{t.from} → {t.to} | {new Date(t.fromDateTime).toLocaleDateString()}</p>
              <p className="mt-2">Tickets: {t.ticketNumber} | Class: {t.classType}</p>
              <p className="mt-3 font-semibold">
                {t.paymentStatus === "confirmed" ? (
                  <span className="text-green-600">✅ Confirmed — 📞 {t.contactNumber}</span>
                ) : (
                  <span className="text-yellow-600">⏳ Payment pending verification</span>
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

