import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // ✅ SEO ke liye import

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

  // 🔹 Tickets fetch karna
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

  // 🔹 Filters apply karna
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

  // 🔹 Search button
  const handleSearch = () => {
    setSearchParams({
      from: fromFilter,
      to: toFilter,
      date: dateFilter,
    });
  };

  // 🔹 Unlock API call
  const handleUnlock = async (ticketId) => {
    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}/unlock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // agar login required hai
      });
      if (!res.ok) throw new Error("Failed to unlock contact");

      const updatedTicket = await res.json();

      // frontend state update
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? updatedTicket : t))
      );
      setFilteredTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? updatedTicket : t))
      );
    } catch (err) {
      console.error("Unlock Error:", err);
    }
  };

  const fromStations = stations?.stations || [];
  const toStations = stations?.stations || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* 🔹 SEO Helmet */}
      <Helmet>
        <title>Find Train Tickets | MyYatraExchange</title>
        <meta
          name="description"
          content="Search and find confirmed train tickets easily on MyYatraExchange. Avoid cancellation charges and connect with ticket sellers directly."
        />
        <meta
          name="keywords"
          content="train tickets, find train ticket, confirmed train tickets, Indian Railways, MyYatraExchange"
        />
        <meta property="og:title" content="Find Train Tickets | MyYatraExchange" />
        <meta
          property="og:description"
          content="Find and exchange confirmed train tickets securely with MyYatraExchange. Save money and travel stress-free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.myyatraexchange.com/find-ticket" />
        <meta property="og:image" content="https://www.myyatraexchange.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Find Train Tickets | MyYatraExchange" />
        <meta
          name="twitter:description"
          content="Search and find confirmed train tickets easily on MyYatraExchange."
        />
        <meta name="twitter:image" content="https://www.myyatraexchange.com/logo.png" />
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Find Your Ticket
      </h2>

      {/* 🔹 Filters */}
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

      {/* 🔹 Tickets List */}
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

              {/* 🔹 Contact unlock logic */}
              <p>
                {ticket.contactVisible ? (
                  <span className="text-green-600 font-semibold">
                    Contact: {ticket.contactNumber}
                  </span>
                ) : (
                  <a
                    href="https://rzp.io/i/demoPaymentLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleUnlock(ticket._id)}
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
