// src/pages/FindTicket.jsx
import React, { useEffect, useState } from "react";
import stations from "../data/stations.json";

// Make sure this points to your backend. Set REACT_APP_API_BASE in .env for production/dev.
// Example .env: REACT_APP_API_BASE=http://localhost:5000/api
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

function safeParseJson = async (res) => {
  const text = await res.text();
  const trimmed = text.trim();
  const ct = (res.headers && res.headers.get && res.headers.get("content-type")) || "";
  // If content-type mentions json OR text begins with { or [ then parse
  if (ct.includes("application/json") || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error("Invalid JSON from server: " + e.message + " — raw: " + trimmed.slice(0,200));
    }
  }
  // otherwise throw with raw body so dev can inspect
  throw new Error("Non-JSON response from server: " + trimmed.slice(0,500));
};

function FindTicket() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [unlocking, setUnlocking] = useState(false);

  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets`);
      if (!res.ok) {
        // try to extract JSON or text for helpful error
        try {
          const body = await safeParseJson(res);
          throw new Error(body.message || JSON.stringify(body));
        } catch (e) {
          // if safeParseJson threw, use that message
          throw new Error(`Request failed: ${res.status} ${res.statusText} — ${e.message}`);
        }
      }
      const data = await safeParseJson(res);
      setTickets(data.tickets || []);
      setFilteredTickets(data.tickets || []);
    } catch (err) {
      console.error("fetchTickets error:", err);
      setError(err.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  // ... filtering logic (keep your existing code) ...
  useEffect(() => {
    let filtered = tickets;
    if (fromFilter) filtered = filtered.filter(t => t.from && t.from.toLowerCase().includes(fromFilter.toLowerCase()));
    if (toFilter) filtered = filtered.filter(t => t.to && t.to.toLowerCase().includes(toFilter.toLowerCase()));
    if (dateFilter) filtered = filtered.filter(t => {
      const d = new Date(t.fromDateTime);
      const iso = d.toISOString().slice(0,10);
      return iso === dateFilter;
    });
    setFilteredTickets(filtered);
  }, [fromFilter, toFilter, dateFilter, tickets]);

  const handlePayment = async (ticket) => {
    setUnlocking(true);
    try {
      // Create order on backend
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerName: "User", amount: ticket.price, ticketId: ticket._id }),
      });

      if (!res.ok) {
        try {
          const body = await safeParseJson(res);
          throw new Error(body.error || body.message || "Payment create failed");
        } catch (e) {
          throw new Error(`Create order failed: ${res.status} ${res.statusText} — ${e.message}`);
        }
      }

      const data = await safeParseJson(res);
      // backend should return { orderId, amount, upiLink, qrUrl } (see server)
      console.log("createOrder response:", data);

      if (data.upiLink) {
        // redirect user to UPI deep link (opens UPI app on mobile)
        window.location.href = data.upiLink;
      } else {
        alert("UPI link not returned from server. Check server logs / env.");
      }
    } catch (err) {
      console.error("handlePayment error:", err);
      setError(err.message || "Payment failed");
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Find Tickets</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input list="fromStations" placeholder="From" value={fromFilter} onChange={e=>setFromFilter(e.target.value)} className="border p-2 rounded" />
        <datalist id="fromStations">{stations.stations.map(s => <option key={s} value={s} />)}</datalist>

        <input list="toStations" placeholder="To" value={toFilter} onChange={e=>setToFilter(e.target.value)} className="border p-2 rounded" />
        <datalist id="toStations">{stations.stations.map(s => <option key={s} value={s} />)}</datalist>

        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border p-2 rounded" />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {filteredTickets.map(ticket => (
          <div key={ticket._id} className="border rounded p-4 flex flex-col gap-2">
            <p><strong>{ticket.trainName}</strong> ({ticket.trainNumber})</p>
            <p>From {ticket.from} → {ticket.to}</p>
            <p>Departure: {new Date(ticket.fromDateTime).toLocaleString()}</p>
            <p>Arrival: {new Date(ticket.toDateTime).toLocaleString()}</p>
            <p>Price: ₹{ticket.price}</p>

            {ticket.contactUnlocked ? (
              <p>Contact: {ticket.contactNumber}</p>
            ) : ticket.proofSubmitted ? (
              <p className="text-orange-600 font-medium">Payment proof submitted, waiting for admin verification</p>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handlePayment(ticket)} disabled={unlocking}>
                {unlocking ? "Processing..." : "Pay to Unlock Contact"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindTicket;

