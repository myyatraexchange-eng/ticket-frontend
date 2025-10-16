import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api/tickets";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (from) params.append("from", from);
      if (to) params.append("to", to);
      if (date) params.append("date", date);

      const res = await axios.get(`${API_BASE}?${params.toString()}`);
      if (res.data && Array.isArray(res.data.tickets)) {
        setTickets(res.data.tickets);
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error("TicketFetchError:", err);
      setError("Failed to fetch tickets. Please try again later.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Tickets</h1>

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <button
            onClick={fetchTickets}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading tickets...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-600">No tickets available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {tickets.map((t) => (
              <div
                key={t._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="font-semibold text-lg text-blue-700">
                  {t.trainName} ({t.trainNumber})
                </h2>
                <p className="text-gray-600">
                  {t.from} → {t.to}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(t.fromDateTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Class: {t.classType}, Seats: {t.ticketNumber}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  Passenger: {t.passengerName}, {t.passengerGender},{" "}
                  {t.passengerAge || "N/A"} yrs
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTicket;

