/* --- FINAL HOME PAGE WITH SHOW ALL TICKETS BUTTON RESTORED --- */

import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import trainImage from "../assets/train.webp";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

// --- Ticket Card ---
const TicketCard = memo(({ ticket }) => (
  <div className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[280px]">
    <div className="flex flex-col gap-2 text-sm">
      <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
        🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} (
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
        {ticket.ticketNumber || "N/A"}
      </p>

      <p className="uppercase">
        <span className="font-semibold">👤 Passenger:</span>{" "}
        {ticket.passengerName
          ? `${ticket.passengerName.toUpperCase()} (${
              ticket.passengerGender?.toUpperCase() || ""
            }, ${ticket.passengerAge || ""})`
          : "N/A"}
      </p>
    </div>
  </div>
));

export default function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const response = await fetch(`${API_BASE}/tickets?available=true`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setTickets((data.tickets || []).slice(0, 3));
      } catch (err) {
        console.error("❌ Fetch Failed:", err);
        setTickets([]);
      }
    };
    loadTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Helmet>
        <title>MyYatraExchange – Find & Share Train Tickets</title>
      </Helmet>

      {/* HERO SECTION */}
      <div className="relative h-[65vh] sm:h-[75vh] md:h-[85vh] w-full overflow-hidden group">
        <img
          src={trainImage}
          alt="Indian train"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            <span className="text-orange-400">My</span>
            <span className="text-white"> Yatra</span>
            <span className="text-green-400"> Exchange</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-2 max-w-xl">
            Share unused tickets & help others get confirmed travel.
          </p>

          <p className="text-sm sm:text-base italic opacity-90 mb-6">
            "Connecting travelers, saving journeys."
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6">

            {/* Find Ticket */}
            <div className="flex flex-col items-center max-w-[220px]">
              <Link
                to="/find"
                className="bg-white text-black 
                px-5 py-3 sm:px-10 sm:py-5 
                rounded-2xl font-bold text-lg
                shadow-[0_5px_0_#bbb]
                active:translate-y-1 active:shadow-[0_1px_0_#bbb]
                hover:bg-gray-100 transition-all"
              >
                Find Ticket
              </Link>
              <p className="text-xs sm:text-sm mt-2 leading-5">
                Waiting list se chutkaara paaye!  
                Yahan shared confirmed tickets milte hain—  
                turant confirmed travel ka mauka.
              </p>
            </div>

            {/* Post Ticket */}
            <div className="flex flex-col items-center max-w-[220px]">
              <Link
                to="/post"
                className="bg-blue-600 text-white 
                px-5 py-3 sm:px-10 sm:py-5 
                rounded-2xl font-bold text-lg
                shadow-[0_5px_0_#1e40af]
                active:translate-y-1 active:shadow-[0_1px_0_#1e40af]
                hover:bg-blue-700 transition-all"
              >
                Post Ticket
              </Link>
              <p className="text-xs sm:text-sm mt-2 leading-5">
                Apna extra ticket post karein aur  
                cancel karne se hone wale loss se bachein—  
                kisi aur ki journey ban jayegi.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* RECENT TICKETS */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Recent Tickets
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">Loading tickets...</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>

            {/* ⭐ SHOW ALL TICKETS BUTTON (RESTORED + 3D EFFECT) */}
            <div className="flex justify-center mt-8">
              <Link
                to="/find"
                className="bg-green-500 text-white 
                px-6 py-3 sm:px-10 sm:py-4 
                rounded-2xl font-bold text-lg
                shadow-[0_5px_0_#166534]
                active:translate-y-1 active:shadow-[0_1px_0_#166534]
                hover:bg-green-600 transition-all"
              >
                Show All Tickets
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

