import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

export default function FindTicket() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [currentUpiLink, setCurrentUpiLink] = useState("");
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all available tickets
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/tickets`);
        const data = await res.json();

        // Filter out tickets already booked by this user
        const availableTickets = (data.tickets || data).filter(
          (t) => !t.bookedBy || t.bookedBy !== user?._id
        );

        setTickets(availableTickets);
      } catch (err) {
        console.error(err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user]);

  const handleOpenQR = (ticket) => {
    const upi = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket%20Payment`;
    setCurrentUpiLink(upi);
    setShowQR(true);
    setCurrentTicketId(ticket._id);
    setTxnId("");
    setPayerName(user?.name || "");
    setPayerMobile("");
    setMessage("");
  };

  const closeQR = () => {
    setShowQR(false);
    setCurrentUpiLink("");
    setCurrentTicketId(null);
    setMessage("");
  };

  const submitProof = async (e) => {
    e.preventDefault();
    if (!txnId || !payerName || !/^\d{10}$/.test(payerMobile)) {
      setMessage("Please fill valid details");
      return;
    }
    if (!token) {
      setMessage("Please login first");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/tickets/submit-payment-proof`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ticketId: currentTicketId, txnId, payerName, payerMobile, amount: 20 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submit failed");

      setMessage("✅ Payment proof submitted successfully!");
      setTimeout(() => navigate("/profile"), 800);

    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to submit proof");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">🎟 Find Tickets</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((t) => (
          <div key={t._id} className="rounded-xl shadow-lg p-5 bg-white border hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-2 uppercase">
              🚆 {t.trainName} ({t.trainNumber})
            </h2>
            <p className="text-sm uppercase mb-1">📍 {t.from} → {t.to}</p>
            <p className="text-sm uppercase mb-1">
              ⏰ {t.fromDateTime ? new Date(t.fromDateTime).toLocaleString() : "N/A"}
            </p>
            <p className="text-sm uppercase mb-2">🎟 {t.ticketNumber} | {t.classType}</p>

            {t.contactUnlocked ? (
              <p className="text-green-700 font-semibold">📞 Contact: {t.contactNumber}</p>
            ) : (
              <div className="mt-3">
                <button onClick={() => handleOpenQR(t)} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Pay ₹20 to Unlock
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* QR Payment Modal */}
      {showQR && currentUpiLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="text-center">
              <p className="font-semibold mb-2">Scan QR to pay ₹20</p>
              <QRCodeCanvas value={currentUpiLink} size={160} />
            </div>

            <form onSubmit={submitProof} className="mt-4 space-y-2">
              <input
                placeholder="Transaction ID"
                value={txnId}
                onChange={(e)=>setTxnId(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <input
                placeholder="Payer Name"
                value={payerName}
                onChange={(e)=>setPayerName(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <input
                placeholder="Payer Mobile"
                value={payerMobile}
                onChange={(e)=>setPayerMobile(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <button type="button" onClick={closeQR} className="flex-1 border px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
              {message && <p className="text-sm mt-1">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

