import React, { useState } from "react";
import ticketsData from "../data/tickets"; // ✅ dummy data import

const FindTicket = () => {
  const [tickets, setTickets] = useState(ticketsData);

  const handleUnlock = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, contactVisible: true } : t
      )
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Find Ticket</h2>

        <div className="mt-6 space-y-4">
          {tickets.length === 0 && (
            <p className="text-center text-red-600 font-medium">
              No tickets found
            </p>
          )}

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <p>
                <strong>Train:</strong> {ticket.trainNumber} - {ticket.trainName}
              </p>
              <p>
                <strong>Holder:</strong> {ticket.name} ({ticket.gender}, {ticket.age}y)
              </p>
              <p>
                <strong>From:</strong> {ticket.from} → <strong>To:</strong> {ticket.to}
              </p>
              <p>
                <strong>Date:</strong> {ticket.date}
              </p>
              <p>
                <strong>Seats:</strong> {ticket.numberOfTickets}
              </p>
              <p>
                <strong>Class:</strong> {ticket.travelClass}
              </p>

              {ticket.contactVisible ? (
                <p className="text-green-600 font-semibold">
                  Contact: {ticket.contact}
                </p>
              ) : (
                <button
                  onClick={() => handleUnlock(ticket.id)}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Unlock Contact (₹20)
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindTicket;

