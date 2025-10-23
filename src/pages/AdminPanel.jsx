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
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter tickets with pending payment
      const pending = res.data.tickets.filter((t) => t.paymentStatus === "pending");
      setPendingTickets(pending);
    } catch (err) {
      console.error("FetchPendingTicketsError:", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (ticketId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE}/tickets/admin/verify-payment/${ticketId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPendingTickets(); // refresh list after verify
      alert("Payment verified successfully!");
    } catch (err) {
      console.error("VerifyPaymentError:", err);
      alert("Failed to verify payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel - Pending Payments</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {pendingTickets.length === 0 ? (
        <p className="text-center text-gray-500">No pending payments.</p>
      ) : (
        <ul className="space-y-3 max-w-4xl mx-auto">
          {pendingTickets.map((ticket) => (
            <li
              key={ticket._id}
              className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-center bg-white shadow"
            >
              <div>
                <p className="font-semibold">
                  {ticket.trainName} ({ticket.trainNumber})
                </p>
                <p className="text-gray-600">
                  {ticket.from} → {ticket.to}
                </p>
                <p className="text-sm text-gray-500">
                  Posted by: {ticket.postedBy?.name || "Unknown"}
                </p>
              </div>
              <button
                onClick={() => verifyPayment(ticket._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-3 md:mt-0"
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

