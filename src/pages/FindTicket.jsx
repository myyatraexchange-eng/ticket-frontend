import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

export default function FindTicket() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const load = async () => {
      showLoader();

      try {
        const response = await fetch(`${API_BASE}/tickets?available=true`);
        const data = await response.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Error:", err);
        setTickets([]);
      } finally {
        hideLoader();
      }
    };

    load();
  }, []);

  const filtered = tickets.filter((t) => {
    const s = search.toLowerCase();
    return (
      t.trainName?.toLowerCase().includes(s) ||
      t.trainNumber?.toLowerCase().includes(s) ||
      t.from?.toLowerCase().includes(s) ||
      t.to?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Helmet>
        <title>Find Train Tickets – MyYatraExchange</title>
        <meta
          name="description"
          content="Find confirmed unused train tickets shared by real passengers."
        />
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Find Tickets
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by Train Name / Number / Route"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
        />
      </div>

      {/* Loading Animation */}
      {tickets.length === 0 && (
        <p className="text-center text-gray-600 text-sm mb-4 loading-dots">
          Loading tickets, please wait
        </p>
      )}

      {/* Ticket List */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filtered.length === 0 && tickets.length > 0 ? (
          <p className="text-center text-red-500 col-span-full font-medium">
            No tickets found.
          </p>
        ) : (
          filtered.map((ticket) => (
            <div
              key={ticket._id}
              className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
                🚆 {ticket.trainName?.toUpperCase()} (
                {ticket.trainNumber || "N/A"})
              </h2>

              <p className="uppercase">
                <span className="font-semibold">📍 Route:</span>{" "}
                {ticket.from?.toUpperCase()} → {ticket.to?.toUpperCase()}
              </p>

              <p className="uppercase">
                <span className="font-semibold">⏰ Departure:</span>{" "}
                {ticket.fromDateTime
                  ? new Date(ticket.fromDateTime).toLocaleString("en-IN")
                  : "N/A"}
              </p>

              <p className="uppercase">
                <span className="font-semibold">🛬 Arrival:</span>{" "}
                {ticket.toDateTime
                  ? new Date(ticket.toDateTime).toLocaleString("en-IN")
                  : "N/A"}
              </p>

              <p className="uppercase">
                <span className="font-semibold">🪑 Class:</span>{" "}
                {ticket.classType?.toUpperCase() || "GENERAL"}
              </p>

              <p className="uppercase">
                <span className="font-semibold">🎟 Tickets:</span>{" "}
                {ticket.ticketNumber}
              </p>

              <p className="uppercase">
                <span className="font-semibold">👤 Passenger:</span>{" "}
                {ticket.passengerName?.toUpperCase()} (
                {ticket.passengerGender?.toUpperCase()}, {ticket.passengerAge})
              </p>

              <Link
                to={`/ticket/${ticket._id}`}
                className="block text-center mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                View Ticket
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

