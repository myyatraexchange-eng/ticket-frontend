import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdminPanel() {
  const [pendingTickets, setPendingTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingTickets();
  }, []);

  const fetchPendingTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/tickets`);
      // Only show tickets with pending payments
      const pending = res.data.tickets.filter(t => t.paymentStatus === "pending");
      setPendingTickets(pending);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (ticketId) => {
    try {
      await axios.post(`${API_BASE}/admin/verify-payment/${ticketId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPendingTickets(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel - Pending Payments</h1>

      {loading && <p>Loading...</p>}

      {pendingTickets.length === 0 ? (
        <p>No pending payments</p>
      ) : (
        <ul className="space-y-3">
          {pendingTickets.map(ticket => (
            <li key={ticket._id} className="border p-3 rounded flex justify-between items-center">
              <div>
                {ticket.trainName} ({ticket.trainNumber}) — {ticket.from} → {ticket.to}
              </div>
              <button
                onClick={() => verifyPayment(ticket._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Verify Payment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

