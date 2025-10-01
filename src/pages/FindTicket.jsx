// src/pages/FindTicket.jsx
import React, { useEffect, useState } from "react";
import stations from "../data/stations.json";
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

  const [currentQrTicketId, setCurrentQrTicketId] = useState(null);
  const [currentUpiLink, setCurrentUpiLink] = useState("");
  const [txnId, setTxnId] = useState("");
  const [payerName, setPayerName] = useState("");
  const [payerMobile, setPayerMobile] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [proofMessage, setProofMessage] = useState("");

  useEffect(() => { fetchTickets(); }, []);

  const fetchTickets = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const data = await res.json();
      setTickets(data.tickets || []);
      setFiltered(data.tickets || []);
    } catch (err) { setError(err.message || "Failed to load tickets"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    let out = tickets;
    if (fromFilter) out = out.filter(t => t.from?.toLowerCase().includes(fromFilter.toLowerCase()));
    if (toFilter) out = out.filter(t => t.to?.toLowerCase().includes(toFilter.toLowerCase()));
    if (dateFilter) out = out.filter(t => t.fromDateTime && new Date(t.fromDateTime).toISOString().slice(0,10) === dateFilter);
    setFiltered(out);
  }, [fromFilter, toFilter, dateFilter, tickets]);

  const handlePay = (ticket) => {
    const upiLink = `upi://pay?pa=9753060916@okbizaxis&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`;
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    if (isMobile) { window.location.href = upiLink; }
    else { setCurrentUpiLink(upiLink); setCurrentQrTicketId(ticket._id); }

    // Reset proof form
    setTxnId(""); setPayerName(""); setPayerMobile(""); setProofMessage("");
  };

  const submitProof = async (e) => {
    e.preventDefault();
    if (!txnId || !payerName || !payerMobile) { setProofMessage("Fill all fields"); return; }
    if (!/^\d{10}$/.test(payerMobile)) { setProofMessage("Enter valid 10-digit mobile"); return; }

    setSubmittingProof(true); setProofMessage("");
    try {
      const res = await fetch(`${API_BASE}/submit-payment-proof`, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ ticketId: currentQrTicketId, txnId, payerName, payerMobile, amount:20 })
      });
      const data = await res.json();
      setProofMessage(data.message || "Submitted for verification");
      setTxnId(""); setPayerName(""); setPayerMobile("");
      setTimeout(() => setCurrentQrTicketId(null), 1200);
    } catch(err){ setProofMessage(err.message || "Failed to submit proof"); }
    finally{ setSubmittingProof(false); }
  };

  return (
    <div className="p-6 container mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Tickets</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center w-full max-w-4xl">
        <input list="fromStations" placeholder="From" value={fromFilter} onChange={e=>setFromFilter(e.target.value)} className="border p-2 rounded w-44"/>
        <datalist id="fromStations">{stations.stations.map(s=><option key={s} value={s}/>)} </datalist>

        <input list="toStations" placeholder="To" value={toFilter} onChange={e=>setToFilter(e.target.value)} className="border p-2 rounded w-44"/>
        <datalist id="toStations">{stations.stations.map(s=><option key={s} value={s}/>)} </datalist>

        <input type="date" value={dateFilter} onChange={e=>setDateFilter(e.target.value)} className="border p-2 rounded"/>
      </div>

      {loading && <p>Loading...</p>} {error && <p className="text-red-600">{error}</p>}

      {/* Tickets list */}
      <div className="grid gap-6 w-full max-w-4xl">
        {filtered.map(t=>(
          <div key={t._id} className="border rounded-lg p-5 shadow-lg w-full bg-white">
            <div className="mb-4">
              <div className="font-semibold text-xl">{t.trainName} ({t.trainNumber})</div>
              <div>From → To: {t.from} → {t.to}</div>
              <div>Departure: {new Date(t.fromDateTime).toLocaleString()}</div>
              <div>Arrival: {new Date(t.toDateTime).toLocaleString()}</div>
              <div>Tickets: {t.tickets}</div>
              <div>Class: {t.class}</div>
              <div>Passenger: {t.passengerName} ({t.gender}, {t.age})</div>
              {t.contactUnlocked && <div className="mt-2 font-medium">Contact: {t.contactNumber}</div>}
            </div>

            {!t.contactUnlocked && (
              <>
                <button onClick={()=>handlePay(t)} className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 mb-2">
                  Pay 20 ₹ to Unlock Contact
                </button>

                {/* QR code & proof form only for this ticket */}
                {currentQrTicketId === t._id && currentUpiLink && (
                  <div className="mt-3 flex flex-col items-center p-4 border rounded-lg shadow-md bg-gray-50 w-full max-w-md">
                    <p className="mb-2 font-medium text-center">Scan this QR with UPI app to pay ₹20:</p>
                    <QRCodeCanvas value={currentUpiLink} size={180}/>
                    <button onClick={()=>setCurrentQrTicketId(null)} className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Close QR</button>

                    <div className="mt-4 p-4 border rounded bg-gray-50 w-full">
                      <div className="mb-2 font-medium">Already paid? Submit payment details:</div>
                      <form onSubmit={submitProof} className="flex flex-col gap-2">
                        <input placeholder="Transaction ID" value={txnId} onChange={e=>setTxnId(e.target.value)} className="border p-2 rounded" required/>
                        <input placeholder="Payer Name" value={payerName} onChange={e=>setPayerName(e.target.value)} className="border p-2 rounded" required/>
                        <input placeholder="Payer Mobile (10 digits)" value={payerMobile} onChange={e=>setPayerMobile(e.target.value)} className="border p-2 rounded" required/>
                        <div className="flex gap-2 mt-2">
                          <button type="submit" disabled={submittingProof} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60">
                            {submittingProof?"Submitting...":"Submit Payment Proof"}
                          </button>
                          <button type="button" onClick={()=>setCurrentQrTicketId(null)} className="px-3 py-2 border rounded">Cancel</button>
                        </div>
                        {proofMessage && <div className="text-sm mt-2">{proofMessage}</div>}
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

