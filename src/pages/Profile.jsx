import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

export default function Profile() {
  const { user, token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    ticketId: "",
    txnId: "",
    payerName: "",
    payerMobile: "",
    amount: "",
    paymentMethod: "UPI",
  });

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my-tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setTickets(res.data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    if (token) fetchTickets();
  }, [token]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/payment-proof`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      fetchTickets();
    } catch (err) {
      console.error("Payment submit error:", err);
      setMessage("❌ Failed to submit payment details");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 text-center">
        👤 My Profile & Payments
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Submit Payment Proof</h2>
        <form
          onSubmit={handlePaymentSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <select
            required
            value={formData.ticketId}
            onChange={(e) =>
              setFormData({ ...formData, ticketId: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Select Ticket</option>
            {tickets.map((t) => (
              <option key={t._id} value={t._id}>
                {t.trainName} ({t.from} → {t.to})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Transaction ID"
            required
            onChange={(e) =>
              setFormData({ ...formData, txnId: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Payer Name"
            required
            onChange={(e) =>
              setFormData({ ...formData, payerName: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Payer Mobile Number"
            required
            onChange={(e) =>
              setFormData({ ...formData, payerMobile: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            required
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="border p-2 rounded"
          />
          <select
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="UPI">UPI</option>
            <option value="PhonePe">PhonePe</option>
            <option value="GooglePay">Google Pay</option>
            <option value="Paytm">Paytm</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Payment
          </button>
        </form>
        {message && <p className="text-green-700 mt-4">{message}</p>}
      </div>

      {/* My Tickets */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
        {tickets.length > 0 ? (
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">Train</th>
                <th className="py-2 px-4">Route</th>
                <th className="py-2 px-4">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr
                  key={t._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{t.trainName}</td>
                  <td className="py-2 px-4">
                    {t.from} → {t.to}
                  </td>
                  <td className="py-2 px-4 capitalize">
                    {t.paymentStatus || "not_paid"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No tickets found.</p>
        )}
      </div>
    </div>
  );
}

