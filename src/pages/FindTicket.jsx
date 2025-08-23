import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ from: "", to: "", date: "" });
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== "")
        )
      ).toString();

      const res = await fetch(`${API_BASE}/tickets?${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Error fetching tickets", err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUnlock = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t._id === ticketId ? { ...t, contactVisible: true } : t
      )
    );
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-6">Find Ticket</h2>

        {/* 🔍 Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            name="from"
            value={filters.from}
            onChange={handleChange}
            placeholder="From Station"
            className="border p-2 rounded"
          />
          <input
            name="to"
            value={filters.to}
            onChange={handleChange}
            placeholder="To Station"
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={fetchTickets}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search Tickets
        </button>

        {/* 🎟️ Tickets List */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-red-600 font-medium">
            No tickets found
          </p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="border rounded-xl p-4 shadow-sm bg-gray-50"
              >
                <p>
                  <strong>Train:</strong> {ticket.trainNumber} -{" "}
                  {ticket.trainName}
                </p>
                <p>
                  <strong>Holder:</strong> {ticket.holderName} (
                  {ticket.gender}, {ticket.age}y)
                </p>
                <p>
                  <strong>From:</strong> {ticket.from} →{" "}
                  <strong>To:</strong> {ticket.to}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(ticket.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Seats:</strong> {ticket.ticketCount}
                </p>
                <p>
                  <strong>Class:</strong> {ticket.seatType}
                </p>

                {ticket.contactVisible ? (
                  <p className="text-green-600 font-semibold">
                    Contact: {ticket.contactNumber}
                  </p>
                ) : (
                  <button
                    onClick={() => handleUnlock(ticket._id)}
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Unlock Contact (₹20)
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTicket;
