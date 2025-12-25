import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import trainImage from "../assets/train.webp";
import HowItWorksModal from "./HowItWorksModal";

/* ================= API ================= */
const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

/* ================= TICKET CARD ================= */
const TicketCard = memo(({ ticket }) => (
  <div className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[280px]">
    <div className="flex flex-col gap-2 text-sm">
      <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
        🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} (
        {ticket.trainNumber || "N/A"})
      </h2>

      <p><b>📍 Route:</b> {ticket.from} → {ticket.to}</p>
      <p>
        <b>⏰ Departure:</b>{" "}
        {ticket.fromDateTime
          ? new Date(ticket.fromDateTime).toLocaleString("en-IN")
          : "N/A"}
      </p>
      <p>
        <b>🛬 Arrival:</b>{" "}
        {ticket.toDateTime
          ? new Date(ticket.toDateTime).toLocaleString("en-IN")
          : "N/A"}
      </p>
      <p><b>🪑 Class:</b> {ticket.classType || "GENERAL"}</p>
      <p><b>🎟 Tickets:</b> {ticket.ticketNumber || "N/A"}</p>
      <p><b>👤 Passenger:</b> {ticket.passengerName || "N/A"}</p>
    </div>
  </div>
));

/* ================= SKELETON ================= */
const TicketSkeleton = () => (
  <div className="rounded-xl border border-gray-200 p-5 bg-gray-100 animate-pulse min-h-[280px]" />
);

/* ================= HOME ================= */
export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await fetch(`${API_BASE}/tickets?available=true`);
        const data = await res.json();
        setTickets((data.tickets || []).slice(0, 3));
      } catch (err) {
        console.error("Fetch failed", err);
        setTickets([]);
      }
    };
    loadTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <Helmet>
        <title>My Yatra Exchange – Find & Share Train Tickets</title>
        <link rel="preload" as="image" href={trainImage} />
      </Helmet>

      {/* ================= HERO ================= */}
      <div className="relative w-full overflow-hidden aspect-[16/9] max-h-[600px]">
        <img
          src={trainImage}
          alt="Indian train"
          width="1600"
          height="900"
          fetchpriority="high"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              <span className="text-orange-400">My</span>{" "}
              <span className="text-white">Yatra</span>{" "}
              <span className="text-green-400">Exchange</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8">
              Share unused tickets & help others travel confirmed.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/find"
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Find Ticket
              </Link>

              <Link
                to="/post"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all"
              >
                Post Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RECENT TICKETS ================= */}
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-[900px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Recent Tickets
        </h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tickets.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <TicketSkeleton key={i} />
              ))
            : tickets.map(ticket => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
        </div>
      </div>

      {/* ================= FIXED RIGHT BUTTON ================= */}
      <button
        onClick={() => setShowHowItWorks(true)}
        className="fixed right-4 bottom-24 z-40 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        ℹ How it works?
      </button>

      {/* ================= MODAL ================= */}
      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
      )}
    </div>
  );
}

