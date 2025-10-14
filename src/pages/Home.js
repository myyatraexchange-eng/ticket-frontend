// src/pages/FindTicket.jsx
import React, { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

export default function FindTicket() {
  const { tickets, setTickets, removeTicket, addTicket } = useTickets();
  const { token, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // filters
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // payment / QR state
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [currentUpiLink, setCurrentUpiLink] = useState("");
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // fetch all tickets once (TicketContext may already have)
  useEffect(() => {
    if (tickets && tickets.length > 0) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/tickets`);
        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        const all = data.tickets || data;
        setTickets?.(all);
      } catch (err) {
        console.error(err);
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filtered list (applies to ALL tickets)
  const filtered = useMemo(() => {
    if (!tickets) return [];
    let out = tickets.filter(t => t.isAvailable !== false); // only available
    if (fromFilter) out = out.filter(t => t.from?.toLowerCase().includes(fromFilter.toLowerCase()));
    if (toFilter) out = out.filter(t => t.to?.toLowerCase().includes(toFilter.toLowerCase()));
    if (dateFilter) out = out.filter(t => t.fromDateTime && new Date(t.fromDateTime).toISOString().slice(0,10) === dateFilter);
    return out;
  }, [tickets, fromFilter, toFilter, dateFilter]);

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
      setMessage("Please login to submit payment proof");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/tickets/submit-payment-proof`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ticketId: currentTicketId,
          txnId,
          payerName,
          payerMobile,
          amount: 20,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submit failed");

      // remove ticket from public list and add a buyer-side entry locally
      const ticket = tickets.find(t => t._id === currentTicketId);
      if (ticket) {
        // hide from find page
        removeTicket?.(currentTicketId);
        // add to context as a booked ticket for buyer with pending status
        addTicket?.({ ...ticket, isAvailable: false, paymentStatus: "pending", bookedBy: (user && user._id) || null });
      }

      setMessage("Payment proof submitted — check Profile (Pending).");
      setTxnId("");
      setPayerMobile("");
      setTimeout(closeQR, 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to submit proof");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">🎟 Find Tickets</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center w-full max-w-4xl">
        <input placeholder="From" value={fromFilter} onChange={(e)=>setFromFilter(e.target.value)} className="border p-2 rounded w-44 uppercase text-sm" />
        <input placeholder="To" value={toFilter} onChange={(e)=>setToFilter(e.target.value)} className="border p-2 rounded w-44 uppercase text-sm" />
        <input type="date" value={dateFilter} onChange={(e)=>setDateFilter(e.target.value)} className="border p-2 rounded text-sm" />
      </div>

      {loading && <p>Loading tickets...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Tickets grid */}
      <div className="grid gap-6 w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(t => (
          <div key={t._id} className="rounded-xl shadow-lg p-5 bg-white border hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-2 uppercase">🚆 {t.trainName} ({t.trainNumber})</h2>
            <p className="uppercase text-sm mb-1">📍 {t.from} → {t.to}</p>
            <p className="uppercase text-sm mb-1">⏰ {t.fromDateTime ? new Date(t.fromDateTime).toLocaleString() : "N/A"}</p>
            <p className="uppercase text-sm mb-2">🎟 {t.ticketNumber} | {t.classType}</p>

            {t.contactUnlocked ? (
              <p className="text-green-700 font-semibold">📞 Contact: {t.contactNumber}</p>
            ) : (
              <div className="mt-3">
                <button onClick={()=>handleOpenQR(t)} className="bg-blue-600 text-white px-4 py-2 rounded">Pay ₹20 to Unlock</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* QR & submit modal-like box */}
      {showQR && currentUpiLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="text-center">
              <p className="font-semibold mb-2">Scan QR to pay ₹20</p>
              <QRCodeCanvas value={currentUpiLink} size={160} />
            </div>

            <form onSubmit={submitProof} className="mt-4 space-y-2">
              <input placeholder="Transaction ID" value={txnId} onChange={(e)=>setTxnId(e.target.value)} className="w-full border p-2 rounded" required />
              <input placeholder="Payer Name" value={payerName} onChange={(e)=>setPayerName(e.target.value)} className="w-full border p-2 rounded" required />
              <input placeholder="Payer Mobile" value={payerMobile} onChange={(e)=>setPayerMobile(e.target.value)} className="w-full border p-2 rounded" required />
              <div className="flex gap-2">
                <button type="submit" disabled={submitting} className="flex-1 bg-green-600 text-white px-4 py-2 rounded">{submitting ? "Submitting..." : "Submit"}</button>
                <button type="button" onClick={closeQR} className="flex-1 border px-4 py-2 rounded">Cancel</button>
              </div>
              {message && <p className="text-sm mt-1">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

