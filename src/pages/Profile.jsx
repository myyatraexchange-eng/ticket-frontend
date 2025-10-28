import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, token } = useAuth();
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://www.myyatraexchange.com/api";

  // ==========================
  // ✅ Fetch My Tickets
  // ==========================
  const fetchMyTickets = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tickets/my/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setMyTickets(response.data.tickets || []);
      } else {
        console.warn("No tickets found.");
      }
    } catch (error) {
      console.error("❌ Error fetching my tickets:", error);
    }
  };

  // ==========================
  // ✅ Fetch My Bookings
  // ==========================
  const fetchMyBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tickets/my/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setMyBookings(response.data.bookings || []);
      } else {
        console.warn("No bookings found.");
      }
    } catch (error) {
      console.error("❌ Error fetching my bookings:", error);
    }
  };

  // ==========================
  // ✅ Fetch Both on Load
  // ==========================
  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);
        await Promise.all([fetchMyTickets(), fetchMyBookings()]);
        setLoading(false);
      })();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">My Profile</h1>

      {/* ================= My Tickets ================= */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Posted Tickets</h2>
        {myTickets.length === 0 ? (
          <p className="text-gray-500">No tickets posted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {myTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold">{ticket.trainName}</h3>
                <p>
                  {ticket.from} → {ticket.to}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(ticket.fromDateTime).toLocaleDateString()}
                </p>
                <p>Status: <strong>{ticket.status}</strong></p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= My Bookings ================= */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
        {myBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {myBookings.map((booking) => (
              <div
                key={booking._id}
                className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold">{booking.ticket?.trainName}</h3>
                <p>
                  {booking.ticket?.from} → {booking.ticket?.to}
                </p>
                <p className="text-sm text-gray-600">
                  Booked On:{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
                <p>Status: <strong>{booking.status}</strong></p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;

