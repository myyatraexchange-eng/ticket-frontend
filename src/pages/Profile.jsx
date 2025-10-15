import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FindTicket from "./FindTicket";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!token) return navigate("/login");

    try {
      setLoading(true);

      const resTickets = await fetch(`${API_BASE}/tickets/my-tickets`, { headers: { Authorization: `Bearer ${token}` } });
      const ticketsData = await resTickets.json();
      setMyTickets(ticketsData.postedTickets || []);

      const resBookings = await fetch(`${API_BASE}/tickets/my-bookings`, { headers: { Authorization: `Bearer ${token}` } });
      const bookingsData = await resBookings.json();
      setMyBookings(bookingsData.bookings || []);
    } catch (err) {
      console.error(err);
      alert("❌ Could not load tickets/bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const res = await fetch(`${API_BASE}/tickets/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Delete failed");
      setMyTickets(myTickets.filter(t => t._id !== id));
      alert("✅ Ticket deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    }
  };

  const handleNewBooking = (ticket) => {
    setMyBookings(prev => [...prev, ticket]);
  };

  if (loading) return <p className="text-center mt-20 text-lg text-gray-500 animate-pulse">Loading profile...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">My Dashboard</h1>

      {/* FindTicket component to unlock tickets */}
      <FindTicket onBookingAdded={handleNewBooking} />

      {/* Seller Tickets */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Posted Tickets</h2>
      {myTickets.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">You haven’t posted any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myTickets.map(t => (
            <div key={t._id} className="bg-white border border-gray-200 rounded-2xl shadow-md p-5">
              <h3 className="font-bold text-xl text-blue-700 mb-1 uppercase">{t.trainName}</h3>
              <p className="text-gray-600 uppercase">{t.from} → {t.to} | {t.fromDateTime ? new Date(t.fromDateTime).toLocaleString() : "N/A"}</p>
              <p className="text-gray-600 uppercase">🪑 {t.classType} | 🎟 {t.ticketNumber}</p>
              <p className={`mt-1 font-semibold ${t.contactUnlocked ? 'text-green-700' : 'text-orange-600'}`}>
                Status: {t.contactUnlocked ? "Booked" : "Available"}
              </p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buyer Bookings */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800">My Bookings (Unlocked)</h2>
      {myBookings.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No unlocked bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myBookings.map(t => (
            <div key={t._id} className="bg-white border border-gray-200 rounded-2xl shadow-md p-5">
              <h3 className="font-bold text-xl text-blue-700 mb-1 uppercase">{t.trainName}</h3>
              <p className="text-gray-600 uppercase">{t.from} → {t.to} | {t.fromDateTime ? new Date(t.fromDateTime).toLocaleString() : "N/A"}</p>
              <p className="text-gray-600 uppercase">🪑 {t.classType} | 🎟 {t.ticketNumber}</p>
              <p className="mt-1 text-green-700 font-semibold">📞 Contact: {t.contactNumber}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

