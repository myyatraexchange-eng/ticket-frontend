import React, { useEffect, useState } from "react";

// Backend URL
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [query, setQuery] = useState("");
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/tickets`);
        if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`);
        const data = await res.json();
        setTickets(data || []);
        setFilteredTickets(data || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
        setFilteredTickets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const trainName = ticket.trainName?.toLowerCase() || "";
      const from = ticket.from?.toLowerCase() || "";
      const to = ticket.to?.toLowerCase() || "";

      const matchesQuery = trainName.includes(query.toLowerCase());
      const matchesFrom = fromFilter
        ? from === fromFilter.toLowerCase()
        : true;
      const matchesTo = toFilter ? to === toFilter.toLowerCase() : true;
      const matchesDate = dateFilter ? ticket.date === dateFilter : true;

      return matchesQuery && matchesFrom && matchesTo && matchesDate;
    });
    setFilteredTickets(filtered);
  }, [query, fromFilter, toFilter, dateFilter, tickets]);

  // Get unique stations for From/To dropdown (filter null/undefined bhi hatao)
  const fromStations = [...new Set(tickets.map((t) => t.from).filter(Boolean))];
  const toStations = [...new Set(tickets.map((t) => t.to).filter(Boolean))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Find Your Ticket
      </h2>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <input
          type="text"
          placeholder="Search by train name..."
          className="border p-2 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">From</option>
          {fromStations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>
        <select
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">To</option>
          {toStations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading tickets...</p>
      ) : filteredTickets.length === 0 ? (
        <p className="text-center text-red-600 font-medium">
          No matching tickets found
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white shadow-md rounded p-4 border hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-lg text-blue-600">
                {ticket.trainName} ({ticket.trainNumber})
              </h3>
              <p>
                <strong>From → To:</strong> {ticket.from} → {ticket.to}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {ticket.date
                  ? new Date(ticket.date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Tickets:</strong> {ticket.ticketCount}
              </p>
              <p>
                <strong>Class:</strong> {ticket.seatType}
              </p>
              <p>
                <strong>Passenger:</strong> {ticket.holderName} ({ticket.gender},{" "}
                {ticket.age})
              </p>
              <p>
                {ticket.contactVisible ? (
                  <span className="text-green-600 font-semibold">
                    Contact: {ticket.contactNumber}
                  </span>
                ) : (
                  <span className="text-blue-500 cursor-pointer">
                    Unlock Contact - ₹20
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindTicket;
