import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

export default function Profile() {
  const { user, token } = useAuth();
  const { tickets, setTickets } = useTickets();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user's booked tickets (only booked by this user)
  const [bookedTickets, setBookedTickets] = useState([]);

  useEffect(() => {
    if (!token || !user) return;

    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        const allTickets = data.tickets || data;
        setTickets?.(allTickets);

        // Filter tickets booked by this user
        const userTickets = allTickets.filter(
          (t) => t.bookedBy === user._id
        );
        setBookedTickets(userTickets);
      } catch (err) {
        console.error(err);
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  const pendingTickets = bookedTickets.filter(
    (t) => t.paymentStatus === "pending"
  );
  const confirmedTickets = bookedTickets.filter(
    (t) => t.paymentStatus === "confirmed"
  );

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">
        👤 Profile
      </h1>

      {loading && <p>Loading tickets...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {user && (
        <div className="mb-6">
          <p className="font-semibold">Name: {user.name}</p>
          <p className="font-semibold">Email: {user.email}</p>
        </div>
      )}

      {/* Pending Tickets */}
      {pendingTickets.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-yellow-600 uppercase">
            ⏳ Pending Tickets
          </h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pendingTickets.map((t) => (
              <div key={t._id} className="p-4 border rounded bg-yellow-50">
                <p className="font-semibold">Train: {t.trainName}</p>
                <p>From: {t.from} → {t.to}</p>
                <p>Date: {t.fromDateTime ? new Date(t.fromDateTime).toLocaleString() : "N/A"}</p>
                <p>Ticket #: {t.ticketNumber}</p>
                <p>Payment: {t.paymentStatus}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmed Tickets */}
      {confirmedTickets.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-green-600 uppercase">
            ✅ Confirmed Tickets
          </h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {confirmedTickets.map((t) => (
              <div key={t._id} className="p-4 border rounded bg-green-50">
                <p className="font-semibold">Train: {t.trainName}</p>
                <p>From: {t.from} → {t.to}</p>
                <p>Date: {t.fromDateTime ? new Date(t.fromDateTime).toLocaleString() : "N/A"}</p>
                <p>Ticket #: {t.ticketNumber}</p>
                <p>Payment: {t.paymentStatus}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookedTickets.length === 0 && !loading && <p>No tickets booked yet.</p>}
    </div>
  );
}

