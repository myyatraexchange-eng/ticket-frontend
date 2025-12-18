import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Helmet } from "react-helmet-async";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

export default function FindTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔍 FILTER STATES
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [trainNumberFilter, setTrainNumberFilter] = useState("");

  // 💳 PAYMENT STATES
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [proofMessage, setProofMessage] = useState("");

  const [showQR, setShowQR] = useState(false);
  const [currentUpiLink, setCurrentUpiLink] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const TICKETS_PER_PAGE = 15;

  /* ===========================
     🔄 FETCH TICKETS (BACKEND FILTER)
  =========================== */
  const fetchTickets = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        available: true,
        page,
      });

      if (fromFilter) params.append("from", fromFilter.trim());
      if (toFilter) params.append("to", toFilter.trim());
      if (trainNumberFilter)
        params.append("trainNumber", trainNumberFilter.trim());
      if (dateFilter) params.append("date", dateFilter);

      const res = await fetch(`${API_BASE}/tickets?${params.toString()}`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);

      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      setError(err.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
     🚀 INITIAL LOAD
  =========================== */
  useEffect(() => {
    fetchTickets(1);
  }, []);

  /* ===========================
     🔍 AUTO SEARCH (DEBOUNCE)
  =========================== */
  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1);
      fetchTickets(1);
    }, 300);

    return () => clearTimeout(delay);
  }, [fromFilter, toFilter, dateFilter, trainNumberFilter]);

  /* ===========================
     💰 PAYMENT HANDLERS
  =========================== */
  const handlePay = (ticket) => {
    const upiLink = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Platform Fees`;
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
      setProofMessage("कृपया सभी विवरण भरें");
      return;
    }

    if (!/^\d{10}$/.test(payerMobile)) {
      setProofMessage("Enter valid 10-digit mobile");
      return;
    }

    setSubmittingProof(true);
    setProofMessage("");

    try {
      const res = await fetch(`${API_BASE}/payments/create-proof`, {
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
          paymentMethod: "UPI",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setProofMessage(
        "✅ Proof submitted successfully. Waiting for admin verification."
      );

      setTimeout(() => {
        closeQR();
        fetchTickets(currentPage);
      }, 1500);
    } catch (err) {
      setProofMessage(err.message || "Failed to submit proof");
    } finally {
      setSubmittingProof(false);
    }
  };

  /* ===========================
     🕒 DATE FORMAT
  =========================== */
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
      <Helmet>
        <title>
          Find Train Tickets | Confirmed Tickets Available – MyYatraExchange
        </title>
        <meta
          name="description"
          content="Search and find confirmed train tickets instantly on MyYatraExchange."
        />
        <link rel="canonical" href="https://www.myyatraexchange.com/find" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">
        🎟 Find Tickets
      </h1>

      {/* 🔍 FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center w-full max-w-5xl">
        <input
          placeholder="From"
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
          className="border p-2 rounded w-40 uppercase text-sm"
        />
        <input
          placeholder="To"
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
          className="border p-2 rounded w-40 uppercase text-sm"
        />
        <input
          placeholder="Train No"
          value={trainNumberFilter}
          onChange={(e) => setTrainNumberFilter(e.target.value)}
          className="border p-2 rounded w-32 uppercase text-sm"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded text-sm"
        />
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* 🎫 TICKETS */}
      <div className="grid gap-6 w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((t) => (
          <div
            key={t._id}
            className="rounded-xl shadow-lg p-5 bg-white border"
          >
            <h2 className="text-xl font-semibold text-blue-700 uppercase">
              🚆 {t.trainName?.toUpperCase()} ({t.trainNumber})
            </h2>

            <p>
              <b>📍 Route:</b> {t.from?.toUpperCase()} →{" "}
              {t.to?.toUpperCase()}
            </p>
            <p>
              <b>⏰ Departure:</b> {formatDateTime(t.fromDateTime)}
            </p>
            <p>
              <b>🛬 Arrival:</b> {formatDateTime(t.toDateTime)}
            </p>
            <p>
              <b>🪑 Class:</b> {t.classType?.toUpperCase()}
            </p>
            <p>
              <b>🎟 Ticket No:</b> {t.ticketNumber}
            </p>
            <p>
              <b>👤 Passenger:</b>{" "}
              {t.passengerName?.toUpperCase()} ({t.passengerGender},{" "}
              {t.passengerAge})
            </p>

            {(t.paymentStatus === "not_paid" ||
              t.paymentStatus === "rejected") && (
              <button
                onClick={() => handlePay(t)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Pay ₹20 (Platform Fees) to Unlock Contact
              </button>
            )}

            {currentTicketId === t._id && showQR && (
              <div className="mt-3 border p-3 rounded">
                <QRCodeCanvas value={currentUpiLink} size={160} />
                <form onSubmit={submitProof} className="mt-2 flex flex-col gap-2">
                  <input
                    placeholder="Transaction ID"
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    placeholder="Payer Name"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    placeholder="Mobile"
                    value={payerMobile}
                    onChange={(e) => setPayerMobile(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <button
                    type="submit"
                    disabled={submittingProof}
                    className="bg-green-600 text-white py-2 rounded"
                  >
                    {submittingProof ? "Submitting..." : "Submit Proof"}
                  </button>
                  {proofMessage && (
                    <p className="text-sm text-center">{proofMessage}</p>
                  )}
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 📄 LOAD MORE */}
      {tickets.length === TICKETS_PER_PAGE && (
        <button
          onClick={() => {
            const next = currentPage + 1;
            setCurrentPage(next);
            fetchTickets(next);
          }}
          className="mt-6 px-4 py-2 border rounded bg-blue-600 text-white"
        >
          Load More
        </button>
      )}
    </div>
  );
}

