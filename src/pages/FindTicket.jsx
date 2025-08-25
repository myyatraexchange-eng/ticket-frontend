import React, { useEffect, useState } from 'react';

// Backend URL (Render par chalega)
const API_BASE = import.meta.env.VITE_API_BASE || "https://ticket-backend-g5da.onrender.com";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${API_BASE}/tickets`);
        const data = await res.json();
        setTickets(data || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.from.toLowerCase().includes(query.toLowerCase()) ||
    ticket.to.toLowerCase().includes(query.toLowerCase()) ||
    ticket.trainName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Find Your Ticket</h2>
      <input
        type="text"
        placeholder="Search by station or train name..."
        className="w-full border p-2 rounded mb-6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredTickets.length === 0 ? (
        <p className="text-center text-red-600 font-medium">No matching tickets found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <div key={ticket._id} className="bg-white shadow-md rounded p-4 border">
              <h3 className="font-semibold text-lg">
                {ticket.trainName} ({ticket.trainNumber})
              </h3>
              <p>{ticket.from} → {ticket.to}</p>
              <p>Date: {new Date(ticket.date).toLocaleDateString()}</p>
              <p>Tickets: {ticket.ticketCount}</p>
              <p>Class: {ticket.seatType}</p>
              <p>
                Passenger: {ticket.holderName} ({ticket.gender}, {ticket.age})
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
