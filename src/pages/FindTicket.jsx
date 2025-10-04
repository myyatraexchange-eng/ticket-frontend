// src/pages/FindTicket.jsx
import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function FindTicket() {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [proofMessage, setProofMessage] = useState("");

  const [showQR, setShowQR] = useState(false);
  const [currentUpiLink, setCurrentUpiLink] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const data = await res.json();
      setTickets(data.tickets || []);
      setFiltered(data.tickets || []);
    } catch (err) {
      setError(err.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let out = tickets;
    if (fromFilter)
      out = out.filter((t) =>
        t.from?.toLowerCase().includes(fromFilter.toLowerCase())
      );
    if (toFilter)
      out = out.filter((t) =>
        t.to?.toLowerCase().includes(toFilter.toLowerCase())
      );
    if (dateFilter)
      out = out.filter(
        (t) =>
          t.fromDateTime &&
          new Date(t.fromDateTime).toISOString().slice(0, 10) === dateFilter
      );
    setFiltered(out);
  }, [fromFilter, toFilter, dateFilter, tickets]);

  const handlePay = (ticket) => {
    const upiLink = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`;
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );

    if (isMobile) window.location.href = upiLink;
    else {
      setCurrentUpiLink(upiLink);
      setShowQR(true);
    }

    setCurrentTicketId(ticket._id);
    setTxnId("");
    setPayerName("");
    setPayerMobile("");
    setProofMessage("");
  };

  const closeQR = () => {
    setShowQR(false);
    setCurrentUpiLink("");
    setCurrentTicketId(null);
  };

  const submitProof = async (e) => {
    e.preventDefault();
    if (!txnId || !payerName || !payerMobile) {
      setProofMessage("Fill all fields");
      return;
    }
    if (!/^\d{10}$/.test(payerMobile)) {
      setProofMessage("Enter valid 10-digit mobile");
      return;
    }

    setSubmittingProof(true);
    setProofMessage("");
    try {
      const res = await fetch(`${API_BASE}/submit-payment-proof`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: currentTicketId,
          txnId,
          payerName,
          payerMobile,
          amount: 20,
        }),
      });
      const data = await res.json();
      setProofMessage(data.message || "Submitted for verification");
      setTxnId("");
      setPayerName("");
      setPayerMobile("");
      setTimeout(closeQR, 1500);
    } catch (err) {
      setProofMessage(err.message || "Failed to submit proof");
    } finally {
      setSubmittingProof(false);
    }
  };

  const formatDateTime = (dt) => {
    if (!dt) return "N/A";
    return new Date(dt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-6 container mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">
        🎟 Find Tickets
      </h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center w-full max-w-4xl">
        <input
          placeholder="From"
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
          className="border p-2 rounded w-44 uppercase text-sm"
        />
        <input
          placeholder="To"
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
          className="border p-2 rounded w-44 uppercase text-sm"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded text-sm"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Ticket List */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {filtered.map((t) => (
          <div
            key={t._id}
            className="rounded-xl shadow-lg p-4 bg-white border border-gray-200 hover:shadow-2xl transition duration-300 text-sm"
          >
            <h2 className="font-bold text-blue-700 mb-1 uppercase text-base">
              🚆 {t.trainName?.toUpperCase() || "UNKNOWN TRAIN"} ({t.trainNumber || "N/A"})
            </h2>
            <p className="text-gray-700 uppercase">
              <span className="font-semibold">📍 Route:</span> {t.from?.toUpperCase() || "N/A"} → {t.to?.toUpperCase() || "N/A"}
            </p>
            <p className="text-gray-700 uppercase">
              <span className="font-semibold">⏰ Departure:</span> {formatDateTime(t.fromDateTime)}
            </p>
            <p className="text-gray-700 uppercase">
              <span className="font-semibold">🛬 Arrival:</span> {formatDateTime(t.toDateTime)}
            </p>
            <p className="text-gray-700 uppercase">
              <span className="font-semibold">🪑 Class:</span> {t.classType?.toUpperCase() || "GENERAL"}
            </p>
            <p className="text-gray-700 uppercase">
              <span className="font-semibold">🎟 Tickets:</span> {t.ticketNumber || "N/A"}
            </p>
            <p className="text-gray-700 uppercase">
              <span className="font-semibold">👤 Passenger:</span> {t.passengerName ? `${t.passengerName.toUpperCase()} (${t.passengerGender.toUpperCase()}, ${t.passengerAge})` : "N/A"}
            </p>

            {t.contactUnlocked ? (
              <p className="mt-1 text-green-700 font-semibold uppercase">📞 Contact: {t.contactNumber}</p>
            ) : (
              <button
                onClick={() => handlePay(t)}
                className="mt-2 w-fit bg-blue-600 text-white px-4 py-1 rounded-lg shadow-md hover:bg-blue-700 transition uppercase text-sm"
              >
                Pay ₹20 to Unlock Contact
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

