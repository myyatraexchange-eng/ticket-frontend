import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

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

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets?available=true`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const data = await res.json();
      setTickets(data.tickets || []);
      setFiltered(data.tickets?.slice(0, 6) || []);
    } catch (err) {
      setError(err.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 8000); // 🔁 refresh every 8s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let out = tickets;
    if (fromFilter) out = out.filter(t => t.from?.toLowerCase().includes(fromFilter.toLowerCase()));
    if (toFilter) out = out.filter(t => t.to?.toLowerCase().includes(toFilter.toLowerCase()));
    if (dateFilter) out = out.filter(t => t.fromDateTime && new Date(t.fromDateTime).toISOString().slice(0, 10) === dateFilter);
    setFiltered(out.slice(0, 6));
  }, [fromFilter, toFilter, dateFilter, tickets]);

  const handlePay = (ticket) => {
    const upiLink = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`;
    setCurrentUpiLink(upiLink);
    setShowQR(true);
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
      const res = await fetch(`${API_BASE}/payments/submit-payment-proof`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ticketId: currentTicketId,
          txnId,
          payerName,
          payerMobile,
          amount: 20,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setProofMessage(data.message || "Submitted for verification");
      setTxnId("");
      setPayerName("");
      setPayerMobile("");
      setTimeout(() => {
        closeQR();
        fetchTickets(); // 🔄 refresh tickets after proof
      }, 1500);
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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">🎟 Find Tickets</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center w-full max-w-4xl">
        <input placeholder="From" value={fromFilter} onChange={(e) => setFromFilter(e.target.value)} className="border p-2 rounded w-44 uppercase text-sm"/>
        <input placeholder="To" value={toFilter} onChange={(e) => setToFilter(e.target.value)} className="border p-2 rounded w-44 uppercase text-sm"/>
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="border p-2 rounded text-sm"/>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Ticket List */}
      <div className="grid gap-6 w-full max-w-6xl grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div key={t._id} className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl transition duration-300">
            <div className="flex flex-col gap-2 text-sm">
              <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
                🚆 {t.trainName?.toUpperCase()} ({t.trainNumber || "N/A"})
              </h2>
              <p><b>📍 Route:</b> {t.from?.toUpperCase()} → {t.to?.toUpperCase()}</p>
              <p><b>⏰ Departure:</b> {formatDateTime(t.fromDateTime)}</p>
              <p><b>🛬 Arrival:</b> {formatDateTime(t.toDateTime)}</p>
              <p><b>🪑 Class:</b> {t.classType?.toUpperCase() || "GENERAL"}</p>
              <p><b>🎟 Tickets:</b> {t.ticketNumber || "N/A"}</p>
              <p><b>👤 Passenger:</b> {t.passengerName?.toUpperCase()} ({t.passengerGender?.toUpperCase()}, {t.passengerAge})</p>

              {t.paymentStatus === "not_paid" && (
                <button onClick={() => handlePay(t)} className="mt-3 w-fit bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition uppercase text-sm">
                  Pay ₹20 To Unlock Contact
                </button>
              )}
              {t.paymentStatus === "pending" && <p className="text-orange-600 font-semibold mt-2">Pending Payment</p>}
              {t.paymentStatus === "verified" && <p className="text-green-600 font-semibold mt-2">Contact: {t.contactNumber || "N/A"}</p>}
            </div>

            {currentTicketId === t._id && showQR && (
              <div className="mt-4 flex flex-col items-center p-3 border rounded-lg shadow-md bg-gray-50">
                <p className="mb-2 font-medium text-center uppercase text-sm">Scan QR to pay ₹20</p>
                <QRCodeCanvas value={currentUpiLink} size={160} />
                <button onClick={closeQR} className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 uppercase text-sm">Close QR</button>

                <form className="mt-3 w-full max-w-md flex flex-col gap-2" onSubmit={submitProof}>
                  <input placeholder="Transaction ID" value={txnId} onChange={(e) => setTxnId(e.target.value)} className="border p-2 rounded uppercase text-sm" required/>
                  <input placeholder="Payer Name" value={payerName} onChange={(e) => setPayerName(e.target.value)} className="border p-2 rounded uppercase text-sm" required/>
                  <input placeholder="Payer Mobile (10 digits)" value={payerMobile} onChange={(e) => setPayerMobile(e.target.value)} className="border p-2 rounded text-sm" required/>
                  <div className="flex gap-2 mt-2">
                    <button type="submit" disabled={submittingProof} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60 uppercase text-sm">
                      {submittingProof ? "Submitting..." : "Submit"}
                    </button>
                    <button type="button" onClick={closeQR} className="px-3 py-2 border rounded uppercase text-sm">Cancel</button>
                  </div>
                  {proofMessage && <div className="text-sm mt-1">{proofMessage}</div>}
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

