import React, { useEffect, useState, memo } from "react";
import { useAuth } from "../context/AuthContext";
import { QRCodeCanvas } from "qrcode.react";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

// TicketCard component (memoized for performance)
const TicketCard = memo(
  ({
    ticket,
    onPayClick,
    currentTicketId,
    showQR,
    currentUpiLink,
    closeQR,
    submitProof,
    txnId,
    setTxnId,
    payerName,
    setPayerName,
    payerMobile,
    setPayerMobile,
    submittingProof,
    proofMessage,
  }) => (
    <div className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl transition duration-300">
      <div className="flex flex-col gap-2 text-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
          🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} ({ticket.trainNumber || "N/A"})
        </h2>

        <p className="uppercase">
          <span className="font-semibold">📍 Route:</span> {ticket.from?.toUpperCase() || "N/A"} → {ticket.to?.toUpperCase() || "N/A"}
        </p>
        <p className="uppercase">
          <span className="font-semibold">⏰ Departure:</span>{" "}
          {ticket.fromDateTime
            ? new Date(ticket.fromDateTime).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })
            : "N/A"}
        </p>
        <p className="uppercase">
          <span className="font-semibold">🛬 Arrival:</span>{" "}
          {ticket.toDateTime
            ? new Date(ticket.toDateTime).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })
            : "N/A"}
        </p>
        <p className="uppercase">
          <span className="font-semibold">🪑 Class:</span> {ticket.classType?.toUpperCase() || "GENERAL"}
        </p>
        <p className="uppercase">
          <span className="font-semibold">🎟 Tickets:</span> {ticket.ticketNumber || "N/A"}
        </p>
        <p className="uppercase">
          <span className="font-semibold">👤 Passenger:</span>{" "}
          {ticket.passengerName ? `${ticket.passengerName.toUpperCase()} (${ticket.passengerGender.toUpperCase()}, ${ticket.passengerAge})` : "N/A"}
        </p>

        {ticket.contactUnlocked ? (
          <p className="mt-2 text-green-700 font-semibold uppercase">📞 Contact: {ticket.contactNumber}</p>
        ) : (
          <button
            onClick={() => onPayClick(ticket)}
            className="mt-3 w-fit bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition uppercase text-sm"
          >
            Pay ₹20 to Unlock Contact
          </button>
        )}
      </div>

      {!ticket.contactUnlocked && currentTicketId === ticket._id && showQR && currentUpiLink && (
        <div className="mt-4 flex flex-col items-center p-3 border rounded-lg shadow-md bg-gray-50 w-full">
          <p className="mb-2 font-medium text-center uppercase text-sm">Scan QR to pay ₹20</p>
          <QRCodeCanvas value={currentUpiLink} size={160} />
          <button onClick={closeQR} className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 uppercase text-sm">
            Close QR
          </button>

          <div className="mt-3 w-full max-w-md">
            <div className="mb-2 font-medium uppercase text-sm">Submit payment details:</div>
            <form className="flex flex-col gap-2" onSubmit={submitProof}>
              <input
                placeholder="Transaction ID"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="border p-2 rounded uppercase text-sm"
                required
              />
              <input
                placeholder="Payer Name"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                className="border p-2 rounded uppercase text-sm"
                required
              />
              <input
                placeholder="Payer Mobile (10 digits)"
                value={payerMobile}
                onChange={(e) => setPayerMobile(e.target.value)}
                className="border p-2 rounded text-sm"
                required
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  disabled={submittingProof}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60 uppercase text-sm"
                >
                  {submittingProof ? "Submitting..." : "Submit"}
                </button>
                <button type="button" onClick={closeQR} className="px-3 py-2 border rounded uppercase text-sm">
                  Cancel
                </button>
              </div>
              {proofMessage && <div className="text-sm mt-1">{proofMessage}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
);

export default function FindTicket() {
  const { token, user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Payment / QR state
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [currentUpiLink, setCurrentUpiLink] = useState("");
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [proofMessage, setProofMessage] = useState("");

  // Filters
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/tickets`);
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("FetchTicketsError:", err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user]);

  // Open QR modal
  const handlePayClick = (ticket) => {
    const upiLink = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`;
    setCurrentUpiLink(upiLink);
    setShowQR(true);
    setCurrentTicketId(ticket._id);
    setTxnId("");
    setPayerName(user?.name || "");
    setPayerMobile("");
    setProofMessage("");
  };

  const closeQR = () => {
    setShowQR(false);
    setCurrentUpiLink("");
    setCurrentTicketId(null);
    setProofMessage("");
  };

  // Submit payment proof
  const submitProof = async (e) => {
    e.preventDefault();
    if (!txnId || !payerName || !/^\d{10}$/.test(payerMobile)) {
      setProofMessage("Please enter valid details");
      return;
    }
    if (!token) {
      setProofMessage("Please login first");
      return;
    }

    setSubmittingProof(true);
    setProofMessage("");
    try {
      const res = await fetch(`${API_BASE}/tickets/submit-payment-proof`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ticketId: currentTicketId, txnId, payerName, payerMobile, amount: 20 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submit failed");

      setProofMessage("✅ Payment proof submitted successfully!");
      setTimeout(closeQR, 1000);
    } catch (err) {
      console.error(err);
      setProofMessage(err.message || "Submit failed");
    } finally {
      setSubmittingProof(false);
    }
  };

  // Apply filters
  const filteredTickets = tickets.filter((t) => {
    const matchFrom = filterFrom ? t.from.toLowerCase().includes(filterFrom.toLowerCase()) : true;
    const matchTo = filterTo ? t.to.toLowerCase().includes(filterTo.toLowerCase()) : true;
    const matchDate = filterDate ? new Date(t.fromDateTime).toISOString().split("T")[0] === filterDate : true;
    return matchFrom && matchTo && matchDate;
  });

  if (loading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">🎟 Find Tickets</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="From"
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="To"
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => {}}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
        >
          Search
        </button>
      </div>

      {/* Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <p className="text-center text-red-600 font-medium">No tickets found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((t) => (
            <TicketCard
              key={t._id}
              ticket={t}
              onPayClick={handlePayClick}
              currentTicketId={currentTicketId}
              showQR={showQR}
              currentUpiLink={currentUpiLink}
              closeQR={closeQR}
              submitProof={submitProof}
              txnId={txnId}
              setTxnId={setTxnId}
              payerName={payerName}
              setPayerName={setPayerName}
              payerMobile={payerMobile}
              setPayerMobile={setPayerMobile}
              submittingProof={submittingProof}
              proofMessage={proofMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

