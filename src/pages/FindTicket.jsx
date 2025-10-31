import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://ticket-backend-main.onrender.com/api";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [proofData, setProofData] = useState({
    ticketId: "",
    transactionId: "",
    amount: "",
    paymentMethod: "UPI",
    screenshotUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch all tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("❌ Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ✅ Handle input change for payment proof
  const handleProofChange = (e) => {
    setProofData({ ...proofData, [e.target.name]: e.target.value });
  };

  // ✅ Handle proof submission
  const handleSubmitProof = async (e) => {
    e.preventDefault();
    if (!proofData.transactionId || !proofData.amount) {
      alert("कृपया सभी विवरण भरें।");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_BASE}/payments/upload-proof`, // ✅ Correct endpoint
        proofData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Payment proof सफलतापूर्वक भेज दिया गया। Admin verification का इंतज़ार करें।");

      // ✅ Ticket को hide कर दो (frontend से remove)
      setTickets((prev) => prev.filter((t) => t._id !== proofData.ticketId));

      // ✅ Reset form
      setProofData({
        ticketId: "",
        transactionId: "",
        amount: "",
        paymentMethod: "UPI",
        screenshotUrl: "",
      });
    } catch (err) {
      console.error("❌ Error submitting payment proof:", err);
      alert("❌ Submission failed. कृपया दोबारा कोशिश करें।");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🎟 उपलब्ध Tickets</h2>

      {loading ? (
        <p>लोड हो रहा है...</p>
      ) : tickets.length === 0 ? (
        <p>कोई टिकट उपलब्ध नहीं है।</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket._id} className="border rounded-lg p-4 mb-4 shadow">
            <h3 className="text-xl font-semibold">
              🚆 {ticket.trainName} ({ticket.trainNumber})
            </h3>
            <p>📍 Route: {ticket.from} → {ticket.to}</p>
            <p>🗓 Date: {new Date(ticket.date).toLocaleDateString()}</p>
            <p>💺 Class: {ticket.classType}</p>
            <p>💰 Price: ₹{ticket.price}</p>

            <button
              className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
              onClick={() => setProofData({ ...proofData, ticketId: ticket._id, amount: ticket.price })}
            >
              Pay ₹{ticket.price} & Unlock Contact
            </button>
          </div>
        ))
      )}

      {/* ✅ Payment proof form */}
      {proofData.ticketId && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-bold mb-2">💳 Payment Proof सबमिट करें</h3>
          <form onSubmit={handleSubmitProof} className="space-y-3">
            <input
              type="text"
              name="transactionId"
              value={proofData.transactionId}
              onChange={handleProofChange}
              placeholder="Transaction ID"
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="number"
              name="amount"
              value={proofData.amount}
              onChange={handleProofChange}
              placeholder="Amount (₹)"
              className="border p-2 w-full rounded"
              required
            />
            <select
              name="paymentMethod"
              value={proofData.paymentMethod}
              onChange={handleProofChange}
              className="border p-2 w-full rounded"
            >
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="screenshotUrl"
              value={proofData.screenshotUrl}
              onChange={handleProofChange}
              placeholder="Screenshot Image URL (optional)"
              className="border p-2 w-full rounded"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {submitting ? "सबमिट हो रहा है..." : "सबमिट करें"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FindTicket;

