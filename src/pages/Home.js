// Updated Home Component with smaller text sizes
import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaTicketAlt, FaSearch } from "react-icons/fa";
import trainImage from "../assets/train.webp";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const TicketCard = memo(({ ticket }) => (
  <div className="rounded-xl shadow-lg p-5 bg-gradient-to-r from-white via-gray-50 to-white border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[260px]">
    <div className="flex flex-col gap-1 text-xs">
      <h2 className="text-lg font-semibold text-blue-700 mb-2 uppercase">
        🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} (
        {ticket.trainNumber || "N/A"})
      </h2>

      <p className="uppercase">
        <span className="font-semibold">📍 Route:</span> {ticket.from?.toUpperCase()} →{" "}
        {ticket.to?.toUpperCase()}
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
        <span className="font-semibold">🎟 Tickets:</span> {ticket.ticketNumber || "N/A"}
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
        <title>
          My Yatra Exchange – Find Confirmed Train Tickets | Share Unused Tickets
        </title>
        <meta
          name="description"
          content="My Yatra Exchange helps passengers share or find confirmed train tickets instantly."
        />
        <meta
          name="keywords"
          content="train tickets, confirmed train ticket, ticket exchange, my yatra exchange"
        />
        <meta name="author" content="My Yatra Exchange" />
        <link rel="canonical" href="https://www.myyatraexchange.com/" />
      </Helmet>

      {/* HERO */}
      <div className="relative h-[65vh] sm:h-[75vh] md:h-[85vh] w-full overflow-hidden group">
        <img
          src={trainImage}
          alt="Indian train running on track - My Yatra Exchange"
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
          loading="lazy"
          decoding="async"
          fetchpriority="high"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          {/* Site Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg animate-fadeIn tracking-wide">
            <span className="text-orange-400">My </span>
            <span className="text-white">Yatra </span>
            <span className="text-green-400">Exchange</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl drop-shadow-md animate-slideUp font-medium leading-relaxed">
            Share unused train tickets & help others get confirmed travel.
          </p>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-5xl mx-auto animate-bounceIn justify-center">

            {/* Post Ticket */}
            <div className="flex flex-col items-center w-full sm:w-auto">
              <Link
                to="/post"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-400 to-red-500 text-white 
                px-5 py-2.5 sm:px-8 sm:py-3.5 
                rounded-md font-semibold shadow-lg 
                hover:from-orange-500 hover:to-red-600 transition 
                transform hover:-translate-y-1 duration-300 
                text-center flex items-center justify-center gap-2 
                text-sm sm:text-base md:text-lg"
              >
                <FaTicketAlt size={20} />
                Post Ticket
              </Link>
            </div>

            {/* Find Ticket */}
            <div className="flex flex-col items-center w-full sm:w-auto">
              <Link
                to="/find"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                px-5 py-2.5 sm:px-8 sm:py-3.5 
                rounded-md font-semibold shadow-lg 
                hover:from-blue-600 hover:to-indigo-700 transition 
                transform hover:-translate-y-1 duration-300 
                text-center flex items-center justify-center gap-2 
                text-sm sm:text-base md:text-lg"
              >
                <FaSearch size={20} />
                Find Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 animate-fadeInUp">
          Recent Tickets
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500 font-medium animate-pulse text-sm">
            Loading tickets...
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}

        {tickets.length > 0 && (
          <div className="text-center mt-6">
            <Link
              to="/find"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition transform hover:-translate-y-1 duration-300 text-sm"
            >
              See All Tickets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

