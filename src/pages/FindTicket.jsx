import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

// Reusable TicketCard
const TicketCard = memo(({
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
  proofMessage
}) => (
  <div className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl transition duration-300">
    <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
      🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} ({ticket.trainNumber || "N/A"})
    </h2>
    <p className="uppercase"><span className="font-semibold">📍 Route:</span> {ticket.from?.toUpperCase()} → {ticket.to?.toUpperCase()}</p>
    <p className="uppercase"><span className="font-semibold">⏰ Departure:</span> {ticket.fromDateTime ? new Date(ticket.fromDateTime).toLocaleString("en-IN") : "N/A"}</p>
    <p className="uppercase"><span className="font-semibold">🛬 Arrival:</span> {ticket.toDateTime ? new Date(ticket.toDateTime).toLocaleString("en-IN") : "N/A"}</p>
    <p className="uppercase"><span className="font-semibold">🪑 Class:</span> {ticket.classType?.toUpperCase() || "GENERAL"}</p>
    <p className="uppercase"><span className="font-semibold">🎟 Tickets:</span> {ticket.ticketNumber || "N/A"}</p>
    <p className="uppercase"><span className="font-semibold">👤 Passenger:</span> {ticket.passengerName || "N/A"}</p>

    {!ticket.contactUnlocked && (
      <button
        onClick={() => onPayClick(ticket)}
        className="mt-3 w-fit bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition uppercase text-sm"
      >
        Pay ₹20 to Unlock Contact
      </button>
    )}

    {currentTicketId === ticket._id && showQR && currentUpiLink && (
      <div className="mt-4 flex flex-col items-center p-3 border rounded-lg shadow-md bg-gray-50">
        <p className="mb-2 font-medium text-center uppercase text-sm">Scan QR to pay ₹20</p>
        <QRCodeCanvas value={currentUpiLink} size={160} />
        <button onClick={closeQR} className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 uppercase text-sm">Close QR</button>

        <div className="mt-3 w-full max-w-md">
          <div className="mb-2 font-medium uppercase text-sm">Submit payment details:</div>
          <form className="flex flex-col gap-2" onSubmit={submitProof}>
            <input placeholder="Transaction ID" value={txnId} onChange={(e)=>setTxnId(e.target.value)} className="border p-2 rounded uppercase text-sm" required/>
            <input placeholder="Payer Name" value={payerName} onChange={(e)=>setPayerName(e.target.value)} className="border p-2 rounded uppercase text-sm" required/>
            <input placeholder="Payer Mobile (10 digits)" value={payerMobile} onChange={(e)=>setPayerMobile(e.target.value)} className="border p-2 rounded text-sm" required/>
            <div className="flex gap-2 mt-2">
              <button type="submit" disabled={submittingProof} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60 uppercase text-sm">{submittingProof ? "Submitting..." : "Submit"}</button>
              <button type="button" onClick={closeQR} className="px-3 py-2 border rounded uppercase text-sm">Cancel</button>
            </div>
            {proofMessage && <div className="text-sm mt-1">{proofMessage}</div>}
          </form>
        </div>
      </div>
    )}
  </div>
));

// FindTicket page using TicketCard
const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ from: "", to: "", date: "" });

  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [currentUpiLink, setCurrentUpiLink] = useState("");
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [proofMessage, setProofMessage] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async (query = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(query).toString();
      const res = await axios.get(`${API_BASE}/ticket?${params}`);
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("TicketFetchError:", err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayClick = (ticket) => {
    const upiLink = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`;
    setCurrentUpiLink(upiLink);
    setShowQR(true);
    setCurrentTicketId(ticket._id);
    setTxnId(""); setPayerName(""); setPayerMobile(""); setProofMessage("");
  };

  const closeQR = () => { setShowQR(false); setCurrentUpiLink(""); setCurrentTicketId(null); };

  const submitProof = async (e) => {
    e.preventDefault();
    if(!txnId || !payerName || !payerMobile){ setProofMessage("Fill all fields"); return; }
    if(!/^\d{10}$/.test(payerMobile)){ setProofMessage("Enter valid 10-digit mobile"); return; }

    setSubmittingProof(true); setProofMessage("");
    try{
      const res = await axios.post(`${API_BASE}/ticket/submit-payment-proof`, {
        ticketId: currentTicketId,
        txnId,
        payerName,
        payerMobile,
        amount: 20
      });
      setProofMessage(res.data.message || "Submitted for verification");
      setTxnId(""); setPayerName(""); setPayerMobile("");
      setTimeout(closeQR,1500);
      // Update ticket status locally
      setTickets(prev => prev.map(t => t._id===currentTicketId ? {...t, contactUnlocked:true} : t));
    }catch(err){
      setProofMessage(err.message || "Failed to submit proof");
    }finally{ setSubmittingProof(false); }
  };

  if(loading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <span>🎟️</span> Find Tickets
      </h2>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-2xl shadow mb-6 grid md:grid-cols-4 gap-3">
        <input type="text" name="from" placeholder="From Station" value={filters.from} onChange={e=>setFilters({...filters, from:e.target.value})} className="border rounded-lg px-3 py-2 w-full"/>
        <input type="text" name="to" placeholder="To Station" value={filters.to} onChange={e=>setFilters({...filters, to:e.target.value})} className="border rounded-lg px-3 py-2 w-full"/>
        <input type="date" name="date" value={filters.date} onChange={e=>setFilters({...filters, date:e.target.value})} className="border rounded-lg px-3 py-2 w-full"/>
        <button onClick={()=>fetchTickets(filters)} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">Search</button>
      </div>

      {tickets.length === 0 ? <p className="text-center text-gray-500">No tickets available</p> :
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map(t => (
            <TicketCard
              key={t._id} ticket={t}
              onPayClick={handlePayClick}
              currentTicketId={currentTicketId} showQR={showQR} currentUpiLink={currentUpiLink} closeQR={closeQR} submitProof={submitProof}
              txnId={txnId} setTxnId={setTxnId} payerName={payerName} setPayerName={setPayerName}
              payerMobile={payerMobile} setPayerMobile={setPayerMobile} submittingProof={submittingProof} proofMessage={proofMessage}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default FindTicket;

