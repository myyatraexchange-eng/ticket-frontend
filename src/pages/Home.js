import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import trainImage from "../assets/train.webp";
import { useLoader } from "../context/LoaderContext";
import { QRCodeCanvas } from "qrcode.react";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

const TicketCard = memo(({ ticket, onPayClick, currentTicketId, showQR, currentUpiLink, closeQR, submitProof, txnId, setTxnId, payerName, setPayerName, payerMobile, setPayerMobile, submittingProof, proofMessage }) => (
  <div className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl transition duration-300" style={{ minHeight: "280px" }}>
    <div className="flex flex-col gap-2 text-sm">
      <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
        🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} ({ticket.trainNumber || "N/A"})
      </h2>

      <p className="uppercase"><span className="font-semibold">📍 Route:</span> {ticket.from?.toUpperCase() || "N/A"} → {ticket.to?.toUpperCase() || "N/A"}</p>
      <p className="uppercase"><span className="font-semibold">⏰ Departure:</span> {ticket.fromDateTime ? new Date(ticket.fromDateTime).toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit", hour12:true }) : "N/A"}</p>
      <p className="uppercase"><span className="font-semibold">🛬 Arrival:</span> {ticket.toDateTime ? new Date(ticket.toDateTime).toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit", hour12:true }) : "N/A"}</p>
      <p className="uppercase"><span className="font-semibold">🪑 Class:</span> {ticket.classType?.toUpperCase() || "GENERAL"}</p>
      <p className="uppercase"><span className="font-semibold">🎟 Tickets:</span> {ticket.ticketNumber || "N/A"}</p>
      <p className="uppercase"><span className="font-semibold">👤 Passenger:</span> {ticket.passengerName ? `${ticket.passengerName.toUpperCase()} (${ticket.passengerGender.toUpperCase()}, ${ticket.passengerAge})` : "N/A"}</p>

      {ticket.contactUnlocked ? (
        <p className="mt-2 text-green-700 font-semibold uppercase">📞 Contact: {ticket.contactNumber}</p>
      ) : (
        <button onClick={() => onPayClick(ticket)} className="mt-3 w-fit bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition uppercase text-sm">
          Pay ₹20 to Unlock Contact
        </button>
      )}
    </div>

    {!ticket.contactUnlocked && currentTicketId === ticket._id && showQR && currentUpiLink && (
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

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [currentUpiLink, setCurrentUpiLink] = useState("");
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [proofMessage, setProofMessage] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      showLoader();
      try {
        const res = await fetch(`${API_BASE}/tickets?page=1&limit=6`);
        if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`);
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
      } finally {
        hideLoader();
      }
    };
    fetchTickets();
  }, []);

  const handlePayClick = (ticket) => {
    const upiLink = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`;
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    if(isMobile) window.location.href = upiLink;
    else {
      setCurrentUpiLink(upiLink);
      setShowQR(true);
    }
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
      const res = await fetch(`${API_BASE}/submit-payment-proof`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ticketId:currentTicketId, txnId, payerName, payerMobile, amount:20})
      });
      const data = await res.json();
      setProofMessage(data.message || "Submitted for verification");
      setTxnId(""); setPayerName(""); setPayerMobile("");
      setTimeout(closeQR,1500);
    }catch(err){
      setProofMessage(err.message || "Failed to submit proof");
    }finally{ setSubmittingProof(false); }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>MyYatraExchange - Exchange & Find Confirmed Train Tickets</title>
        <meta name="description" content="MyYatraExchange helps travelers connect to exchange or find confirmed train tickets and save cancellation charges." />
        <meta name="keywords" content="train ticket exchange, confirmed train ticket, save cancellation charges" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <img src={trainImage} alt="Train" className="w-full h-full object-cover object-center" loading="lazy" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-orange-500">My</span><span className="text-white">Yatra</span><span className="text-green-500">Exchange.com</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-xl">
            Share Your Unused Train Ticket — Save Cancellation Charges! Connect with people who need a ticket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/find" className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">Find Ticket</Link>
            <Link to="/post" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Post Ticket</Link>
          </div>
        </div>
      </div>

      {/* Ticket Listing */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">Recent Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-center text-red-600 font-medium">No tickets available</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map(ticket=>(
              <TicketCard
                key={ticket._id} ticket={ticket} onPayClick={handlePayClick}
                currentTicketId={currentTicketId} showQR={showQR} currentUpiLink={currentUpiLink} closeQR={closeQR} submitProof={submitProof}
                txnId={txnId} setTxnId={setTxnId} payerName={payerName} setPayerName={setPayerName} payerMobile={payerMobile} setPayerMobile={setPayerMobile}
                submittingProof={submittingProof} proofMessage={proofMessage}
              />
            ))}
          </div>
        )}
        {tickets.length>0 && (
          <div className="text-center mt-6">
            <Link to="/find" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">See All Tickets</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

