import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [proofMessage, setProofMessage] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [showQR, setShowQR] = useState(false);

  // ================================
  // 🔹 Fetch All Tickets
  // ================================
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch tickets");
      setTickets(data.tickets || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ================================
  // 🔹 Open & Close Payment QR Modal
  // ================================
  const openQR = (ticketId) => {
    setCurrentTicketId(ticketId);
    setShowQR(true);
  };
  const closeQR = () => {
    setShowQR(false);
    setTxnId("");
    setPayerName("");
    setPayerMobile("");
    setProofMessage("");
  };

  // ================================
  // 💰 Submit Payment Proof
  // ================================
  const submitProof = async (e) => {
    e.preventDefault();
    if (!txnId || !payerName || !payerMobile) {
      setProofMessage("कृपया सभी फ़ील्ड भरें");
      return;
    }
    if (!/^\d{10}$/.test(payerMobile)) {
      setProofMessage("कृपया वैध 10 अंकों का मोबाइल नंबर डालें");
      return;
    }

    setSubmittingProof(true);
    setProofMessage("");
    try {
      const res = await fetch(`${API_BASE}/payments/upload-proof`, {
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

      setProofMessage(data.message || "Payment proof uploaded successfully");
      setTxnId("");
      setPayerName("");
      setPayerMobile("");

      // Refresh tickets after 1.5 sec
      setTimeout(() => {
        closeQR();
        fetchTickets();
      }, 1500);
    } catch (err) {
      setProofMessage(err.message || "Failed to submit proof");
    } finally {
      setSubmittingProof(false);
    }
  };

  // ================================
  // 🧾 Ticket Card
  // ================================
  const TicketCard = ({ ticket }) => (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-1">
        {ticket.trainName} ({ticket.trainNumber})
      </h3>
      <p>
        {ticket.from} ➜ {ticket.to}
      </p>
      <p>Status: <b>{ticket.paymentStatus || "not_paid"}</b></p>
      {ticket.paymentStatus === "not_paid" && (
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => openQR(ticket._id)}
        >
          Pay ₹20 to Unlock
        </button>
      )}
      {ticket.paymentStatus === "pending" && (
        <p className="text-yellow-600 mt-2">⏳ Waiting for admin verification</p>
      )}
      {ticket.paymentStatus === "verified" && (
        <p className="text-green-600 mt-2">✅ Contact unlocked</p>
      )}
      {ticket.paymentStatus === "rejected" && (
        <p className="text-red-600 mt-2">❌ Payment rejected</p>
      )}
    </div>
  );

  // ================================
  // 🧾 QR Modal (Payment Proof Form)
  // ================================
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-bold mb-3 text-center">
          Upload Payment Proof
        </h2>
        <img
          src="/upi-qr.jpg"
          alt="QR Code"
          className="mx-auto w-48 mb-3 rounded-lg border"
        />
        <form onSubmit={submitProof}>
          <input
            type="text"
            placeholder="Txn ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Payer Name"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Payer Mobile"
            value={payerMobile}
            onChange={(e) => setPayerMobile(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />

          {proofMessage && (
            <p className="text-center text-sm text-blue-600 mb-2">
              {proofMessage}
            </p>
          )}

          <div className="flex justify-between mt-3">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded"
              onClick={closeQR}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submittingProof}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              {submittingProof ? "Submitting..." : "Submit Proof"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // ================================
  // 🧩 Render Section
  // ================================
  if (loading) return <p className="text-center mt-10">Loading tickets...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🎫 My Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tickets.map((t) => (
            <TicketCard key={t._id} ticket={t} />
          ))}
        </div>
      )}

      {showQR && <PaymentModal />}
    </div>
  );
};

export default FindTicket;

