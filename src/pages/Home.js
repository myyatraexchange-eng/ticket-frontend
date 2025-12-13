/* --- FINAL CLS + LCP OPTIMIZED HOME PAGE --- */

import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import trainImage from "../assets/train.webp";

/* API BASE URL */
const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

/* ===============================
   TICKET CARD
================================*/
const TicketCard = memo(({ ticket }) => (
  <article
    className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 transition-transform hover:scale-105 min-h-[280px]"
    aria-label={`${ticket.trainName || "Train"} ticket card`}
  >
    <div className="flex flex-col gap-2 text-sm">
      <h2 className="text-xl font-semibold text-blue-700 mb-2 uppercase">
        🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} (
        {ticket.trainNumber || "N/A"})
      </h2>

      <p><b>📍 Route:</b> {ticket.from} → {ticket.to}</p>
      <p><b>⏰ Departure:</b> {ticket.fromDateTime ? new Date(ticket.fromDateTime).toLocaleString("en-IN") : "N/A"}</p>
      <p><b>🛬 Arrival:</b> {ticket.toDateTime ? new Date(ticket.toDateTime).toLocaleString("en-IN") : "N/A"}</p>
      <p><b>🪑 Class:</b> {ticket.classType || "GENERAL"}</p>
      <p><b>🎟 Tickets:</b> {ticket.ticketNumber || "N/A"}</p>
    </div>
  </article>
));

/* ===============================
          MAIN HOME PAGE
================================*/
export default function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/tickets?available=true`)
      .then((res) => res.json())
      .then((data) => setTickets((data.tickets || []).slice(0, 3)))
      .catch(() => setTickets([]));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* SEO */}
      <Helmet>
        <title>MyYatraExchange – Find & Share Train Tickets</title>
        <meta
          name="description"
          content="Find and share unused train tickets instantly. Get confirmed travel through community sharing."
        />
      </Helmet>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[480px] md:min-h-[600px] w-full overflow-hidden">

        {/* LCP IMAGE */}
        <img
          src={trainImage}
          alt="Indian train travel"
          width="1280"
          height="720"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white px-4">
          <div className="max-w-2xl min-h-[260px] text-center flex flex-col justify-center">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              <span className="text-orange-400">My</span>{" "}
              <span>Yatra</span>{" "}
              <span className="text-green-400">Exchange</span>
            </h1>

            <p className="text-lg sm:text-xl mb-6">
              Share unused tickets & help others get confirmed travel.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/find"
                className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-100"
              >
                Find Ticket
              </Link>

              <Link
                to="/post"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700"
              >
                Post Ticket
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= RECENT TICKETS ================= */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Recent Tickets
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500">Loading tickets...</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((t) => (
                <TicketCard key={t._id} ticket={t} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                to="/find"
                className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600"
              >
                Show All Tickets
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

