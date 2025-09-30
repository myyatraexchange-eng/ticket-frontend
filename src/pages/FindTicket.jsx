// src/pages/FindTicket.jsx
import React, { useEffect, useState } from "react";
import stations from "../data/stations.json";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

async function safeParseJsonResponse(res) {
  const text = await res.text();
  const trimmed = text.trim();
  const ct = (res.headers && res.headers.get && res.headers.get("content-type")) || "";
  if (ct.includes("application/json") || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error("Invalid JSON from server: " + e.message + " — raw: " + trimmed.slice(0,300));
    }
  }
  throw new Error("Server returned non-JSON response: " + trimmed.slice(0,500));
}

export default function FindTicket() {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        try {
          const body = await safeParseJsonResponse(res);
          throw new Error(body.error || body.message || `Request failed ${res.status}`);
        } catch (e) {
          throw new Error(`Request failed ${res.status} ${res.statusText} — ${e.message}`);
        }
      }
      const data = await safeParseJsonResponse(res);
      setTickets(data.tickets || []);
      setFiltered(data.tickets || []);
    } catch (err) {
      console.error("fetchTickets error:", err);
      setError(err.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let out = tickets;
    if (fromFilter) out = out.filter(t => t.from && t.from.toLowerCase().includes(fromFilter.toLowerCase()));
    if (toFilter) out = out.filter(t => t.to && t.to.toLowerCase().includes(toFilter.toLowerCase()));
    if (dateFilter) out = out.filter(t => {
      if (!t.fromDateTime) return false;
      const iso = new Date(t.fromDateTime).toISOString().slice(0,10);
      return iso === dateFilter;
    });
    setFiltered(out);
  }, [fromFilter, toFilter, dateFilter, tickets]);

  const handlePay = async (ticket) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: ticket._id, amount: ticket.price, buyerName: "User" }),
      });
      if (!res.ok) {
        try {
          const body = await safeParseJsonResponse(res);
          throw new Error(body.error || body.message || `Payment create failed ${res.status}`);
        } catch (e) {
          throw new Error(`Payment create failed ${res.status} ${res.statusText} — ${e.message}`);
        }
      }
      const data = await safeParseJsonResponse(res);
      if (data.upiLink) {
        // redirect to UPI (mobile) or ask user to scan QR
        window.location.href = data.upiLink;
      } else {
        alert("UPI link not returned. Contact admin.");
      }
    } catch (err) {
      console.error("handlePay error:", err);
      setError(err.message || "Payment failed");
    }
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find Tickets</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input list="fromStations" placeholder="From" value={fromFilter} onChange={e=>setFromFilter(e.target.value)} className="border p-2 rounded" />
        <datalist id="fromStations">{stations.stations && stations.stations.map(s => <option key={s} value={s} />)}</datalist>

        <input list="toStations" placeholder="To" value={toFilter} onChange={e=>setToFilter(e.target.value)} className="border p-2 rounded" />
        <datalist id="toStations">{stations.stations && stations.stations.map(s => <option key={s} value={s} />)}</datalist>

        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border p-2 rounded" />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-4">
        {filtered.map(t => (
          <div key={t._id} className="border rounded p-4">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{t.trainName} ({t.trainNumber})</div>
                <div>From {t.from} → {t.to}</div>
                <div>Depart: {new Date(t.fromDateTime).toLocaleString()}</div>
                <div>Price: ₹{t.price}</div>
              </div>
              <div>
                {t.contactUnlocked ? (
                  <div>Contact: {t.contactNumber}</div>
                ) : (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handlePay(t)}>
                    Pay to Unlock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

