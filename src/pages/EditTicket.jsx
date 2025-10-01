// src/pages/FindTicket.jsx
import React, { useEffect, useState, useCallback } from "react";
import stations from "../data/stations.json";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

// JSON safe parse
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

// ✅ debounce helper
function useDebounce(callback, delay) {
  const timeoutRef = React.useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFn;
}

function SearchableInput({ placeholder, value, onChange }) {
  const [showList, setShowList] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value);

  // ✅ Debounced onChange
  const debouncedOnChange = useDebounce((val) => {
    onChange(val);
  }, 300);

  useEffect(() => {
    debouncedOnChange(inputValue);
  }, [inputValue, debouncedOnChange]);

  const filteredStations = stations.stations.filter((s) =>
    s.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (!showList) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filteredStations.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? filteredStations.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filteredStations.length) {
        setInputValue(filteredStations[highlightIndex]);
        setShowList(false);
        setHighlightIndex(-1);
      }
    }
  };

  return (
    <div className="relative w-60">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowList(true);
          setHighlightIndex(-1);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 200)}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded w-full"
      />
      {showList && inputValue && (
        <ul className="absolute bg-white border rounded shadow max-h-48 overflow-y-auto w-full z-10">
          {filteredStations.map((s, idx) => (
            <li
              key={s}
              className={`p-2 cursor-pointer ${
                idx === highlightIndex ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
              onMouseDown={() => {
                setInputValue(s);
                setShowList(false);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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

  // Filters
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

  // Pay handler
  const handlePay = async (ticket) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: ticket._id, amount: ticket.price, buyerName: "User" }),
      });
      const data = await safeParseJsonResponse(res);
      if (data.upiLink) {
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

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <SearchableInput
          placeholder="From"
          value={fromFilter}
          onChange={setFromFilter}
        />
        <SearchableInput
          placeholder="To"
          value={toFilter}
          onChange={setToFilter}
        />
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
      <div className="grid gap-4">
        {filtered.map((t) => (
          <div key={t._id} className="border rounded p-4">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">
                  {t.trainName} ({t.trainNumber})
                </div>
                <div>
                  From {t.from} → {t.to}
                </div>
                <div>Depart: {new Date(t.fromDateTime).toLocaleString()}</div>
                <div>Price: ₹{t.price}</div>
              </div>
              <div>
                {t.contactUnlocked ? (
                  <div>Contact: {t.contactNumber}</div>
                ) : (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => handlePay(t)}
                  >
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

