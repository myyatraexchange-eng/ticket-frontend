import React, { useEffect, useState, useCallback, useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Helmet } from "react-helmet-async";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

export default function FindTicket() {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);

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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const TICKETS_PER_PAGE = 9;

  // ---------------------------
  // FETCH TICKETS (Optimized)
  // ---------------------------
  const fetchTickets = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/tickets?available=true`);
      if (!res.ok) throw new Error("Failed to fetch tickets");

      const data = await res.json();
      const list = Array.isArray(data) ? data : data.tickets || [];

      setTickets(list);
      setFiltered(list);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchTickets();

    // Auto-refresh every 10 sec (background effects only)
    const i = setInterval(fetchTickets, 10000);
    return () => clearInterval(i);
  }, [fetchTickets]);

  // ---------------------------
  // FILTERING (Optimized)
  // ---------------------------
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
    setCurrentPage(1);
  }, [fromFilter, toFilter, dateFilter, tickets]);

  // ---------------------------
  // PAGINATION
  // ---------------------------
  const indexOfLast = currentPage * TICKETS_PER_PAGE;
  const indexOfFirst = indexOfLast - TICKETS_PER_PAGE;

  const isFiltered = fromFilter || toFilter || dateFilter;

  const currentTickets = useMemo(
    () => (isFiltered ? filtered : filtered.slice(indexOfFirst, indexOfLast)),
    [filtered, indexOfFirst, indexOfLast, isFiltered]
  );

  const totalPages = Math.ceil(filtered.length / TICKETS_PER_PAGE);

  // ---------------------------
  // HANDLE PAYMENT
  // ---------------------------
  const handlePay = (ticket) => {
    setCurrentTicketId(ticket._id);
    setCurrentUpiLink(
      `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`
    );
    setTxnId("");
    setPayerName("");
    setPayerMobile("");
    setProofMessage("");
    setShowQR(true);
  };

  const closeQR = () => {
    setShowQR(false);
    setCurrentTicketId(null);
    setCurrentUpiLink("");
  };

  // ---------------------------
  // SUBMIT PROOF
  // ---------------------------
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

      setProofMessage("✅ Proof submitted. Waiting for admin...");

      // Refresh silently
      setTimeout(() => {
        closeQR();
        fetchTickets();
      }, 1200);
    } catch (err) {
      setProofMessage(err.message);
    } finally {
      setSubmittingProof(false);
    }
  };

  // ---------------------------
  // DATE FORMAT
  // ---------------------------
  const formatDateTime = (dt) =>
    dt
      ? new Date(dt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "N/A";

  // ---------------------------
  // UI (NO COLOR CHANGE)
  // ---------------------------
  return (
    <div className="p-6 container mx-auto flex flex-col items-center">
      <Helmet>
        <title>Find Train Tickets | MyYatraExchange</title>
        <meta
          name="description"
          content="Search and find confirmed train tickets instantly on MyYatraExchange."
        />
        <link rel="canonical" href="https://www.myyatraexchange.com/find" />
      </Helmet>

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

      {error && <p className="text-red-600">{error}</p>}

      {/* Ticket Cards */}
      <div className="grid gap-6 w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentTickets.map((t) => (
          <div
            key={t._id}
            className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl transition duration-300"
          >
            <div className="flex flex-col gap-2 text-sm">
              <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
                🚆 {t.trainName?.toUpperCase()} ({t.trainNumber || "N/A"})
              </h2>

              <p><b>📍 Route:</b> {t.from?.toUpperCase()} → {t.to?.toUpperCase()}</p>
              <p><b>⏰ Departure:</b> {formatDateTime(t.fromDateTime)}</p>
              <p><b>🛬 Arrival:</b> {formatDateTime(t.toDateTime)}</p>
              <p><b>🪑 Class:</b> {t.classType?.toUpperCase() || "GENERAL"}</p>
              <p><b>🎟 Ticket No:</b> {t.ticketNumber || "N/A"}</p>
              <p>
                <b>👤 Passenger:</b> {t.passengerName?.toUpperCase()} (
                {t.passengerGender}, {t.passengerAge})
              </p>

              {/* Payment Status */}
              {t.paymentStatus === "verified" && (
                <p className="text-green-600 font-semibold mt-2">
                  📞 Contact: {t.contactNumber || "N/A"} ✅ Verified
                </p>
              )}

              {t.paymentStatus === "pending" && (
                <p className="text-orange-600 font-semibold mt-2">
                  ⏳ Pending verification
                </p>
              )}

              {(t.paymentStatus === "not_paid" ||
                t.paymentStatus === "rejected") && (
                <button
                  onClick={() => handlePay(t)}
                  className="mt-3 w-fit bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition uppercase text-sm"
                >
                  Pay ₹20 To Unlock Contact
                </button>
              )}
            </div>

            {/* QR VIEW */}
            {currentTicketId === t._id && showQR && (
              <div className="mt-4 flex flex-col items-center p-3 border rounded-lg shadow-md bg-gray-50">
                <p className="mb-2 font-medium text-center uppercase text-sm">
                  Scan QR to pay ₹20
                </p>

                <QRCodeCanvas value={currentUpiLink} size={160} />

                <button
                  onClick={closeQR}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 uppercase text-sm"
                >
                  Close QR
                </button>

                <form
                  className="mt-3 w-full max-w-md flex flex-col gap-2"
                  onSubmit={submitProof}
                >
                  <input
                    placeholder="Transaction ID"
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    className="border p-2 rounded uppercase text-sm"
                  />
                  <input
                    placeholder="Payer Name"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    className="border p-2 rounded uppercase text-sm"
                  />
                  <input
                    placeholder="Payer Mobile (10 digits)"
                    value={payerMobile}
                    onChange={(e) => setPayerMobile(e.target.value)}
                    className="border p-2 rounded uppercase text-sm"
                  />

                  <button
                    type="submit"
                    disabled={submittingProof}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60 uppercase text-sm"
                  >
                    {submittingProof ? "Submitting..." : "Submit Proof"}
                  </button>

                  {proofMessage && (
                    <p className="text-sm text-center mt-1">{proofMessage}</p>
                  )}
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!isFiltered && totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

