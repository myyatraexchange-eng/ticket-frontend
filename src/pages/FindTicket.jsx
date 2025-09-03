import React, { useEffect, useState } from "react";

// Backend URL
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

// Station list JSON
import stations from "../data/stations.json"; // { "stations": ["Mumbai", "Delhi", ...] }

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
  });

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

  // Filtering
  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const from = ticket.from?.toLowerCase() || "";
      const to = ticket.to?.toLowerCase() || "";
      const ticketDate = ticket.date
        ? new Date(ticket.date).toISOString().slice(0, 10)
        : "";

      const matchesFrom = searchParams.from
        ? from === searchParams.from.toLowerCase()
        : true;

      const matchesTo = searchParams.to
        ? to === searchParams.to.toLowerCase()
        : true;

      const matchesDate = searchParams.date
        ? ticketDate === searchParams.date
        : true;

      return matchesFrom && matchesTo && matchesDate;
    });

    setFilteredTickets(filtered);
  }, [searchParams, tickets]);

  const handleSearch = () => {
    setSearchParams({
      from: fromFilter,
      to: toFilter,
      date: dateFilter,
    });
  };

  const fromStations = stations?.stations || [];
  const toStations = stations?.stations || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Find Your Ticket
      </h2>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <input
          list="fromStationsList"
          placeholder="From"
          className="border p-2 rounded"
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
        />
        <datalist id="fromStationsList">
          {fromStations.map((station) => (
            <option key={station} value={station} />
          ))}
        </datalist>

        <input
          list="toStationsList"
          placeholder="To"
          className="border p-2 rounded"
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
        />
        <datalist id="toStationsList">
          {toStations.map((station) => (
            <option key={station} value={station} />
          ))}
        </datalist>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
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
                  <a
                    href="https://rzp.io/i/demoPaymentLink" // 👉 yaha apna real Razorpay/UPI link dalna hai
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition inline-block"
                  >
                    Pay ₹20 to Unlock Contact Number
                  </a>
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
