// src/pages/FindTicket.jsx
import React, { useEffect, useState } from "react";
import stations from "../data/stations.json";

const API_BASE = process.env.REACT_APP_API_BASE;

const safeParseJsonResponse = async (res) => {
  const text = await res.text();
  const trimmed = text.trim();
  const ct = (res.headers && res.headers.get && res.headers.get("content-type")) || "";
  if (ct.includes("application/json") || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error("Invalid JSON: " + e.message + " — raw: " + trimmed.slice(0, 300));
    }
  }
  throw new Error("Server returned non-JSON: " + trimmed.slice(0, 500));
};

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
      if (!res.ok) throw new Error(`Request failed ${res.status} ${res.statusText}`);
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
    if (fromFilter) out = out.filter((t) => t.from?.toLowerCase().includes(fromFilter.toLowerCase()));
    if (toFilter) out = out.filter((t) => t.to?.toLowerCase().includes(toFilter.toLowerCase()));
    if (dateFilter) {
      out = out.filter((t) => {
        if (!t.fromDateTime) return false;
        const iso = new Date(t.fromDateTime).toISOString().slice(0, 10);
        return iso === dateFilter;
      });
    }
    setFiltered(out);
  }, [fromFilter, toFilter, dateFilter, tickets]);

  const handlePay = async (ticket) => {
    setError("");
    try {
      // Direct UPI link
      const upiLink = `upi://pay?pa=myyatraexchange@ybl&pn=MyYatraExchange&am=20&cu=INR&tn=Ticket Payment`;

      // Redirect to UPI app
      window.location.href = upiLink;
    } catch (err) {
      console.error("handlePay error:", err);
      setError(err.message || "Payment failed");
    }
  };

  return (
    <div className="p-4 container mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Find Tickets</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center w-full max-w-4xl">
        <input
          list="fromStations"
          placeholder="From"
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <datalist id="fromStations">
          {stations.stations.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>

        <input
          list="toStations"
          placeholder="To"
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <datalist id="toStations">
          {stations.stations.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Tickets list */}
      <div className="grid gap-6 w-full max-w-4xl">
        {filtered.map((t) => (
          <div
            key={t._id}
            className="border rounded p-4 flex flex-col items-center shadow-md"
          >
            <div className="text-center mb-4">
              <div className="font-semibold text-lg">{t.trainName} ({t.trainNumber})</div>
              <div>From {t.from} → {t.to}</div>
              <div>Depart: {new Date(t.fromDateTime).toLocaleString()}</div>
              <div>Price: ₹{t.price}</div>
              {t.contactUnlocked && <div className="mt-2">Contact: {t.contactNumber}</div>}
            </div>

            {!t.contactUnlocked && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handlePay(t)}
              >
                Pay 20 ₹ to Unlock Contact
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

