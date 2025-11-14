import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import trainImage from "../assets/train.webp";
import { useLoader } from "../context/LoaderContext";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

// ✅ Ticket Card (Memoized)
const TicketCard = memo(({ ticket }) => (
  <div className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-2xl transition duration-300 min-h-[280px]">
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
          ? new Date(ticket.fromDateTime).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A"}
      </p>

      <p className="uppercase">
        <span className="font-semibold">🛬 Arrival:</span>{" "}
        {ticket.toDateTime
          ? new Date(ticket.toDateTime).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
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
  const { showLoader, hideLoader } = useLoader();

  // Fetch Tickets
  const fetchTickets = async () => {
    showLoader();
    try {
      const res = await fetch(`${API_BASE}/tickets?available=true`);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);

      const data = await res.json();
      setTickets((data.tickets || []).slice(0, 3)); // Only first 3
    } catch (err) {
      console.error("❌ Error fetching tickets:", err);
      setTickets([]);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* META TAGS FOR SEO */}
      <Helmet>
        <title>
          MyYatraExchange – Find Confirmed Train Tickets | Share Unused Tickets
        </title>
        <meta
          name="description"
          content="MyYatraExchange helps passengers share or find confirmed train tickets instantly. Avoid ticket cancellation loss & connect with real travelers."
        />
        <meta
          name="keywords"
          content="train tickets, confirmed train ticket, ticket exchange, my yatra exchange, urgent train ticket, IRCTC alternative"
        />
        <meta name="author" content="MyYatraExchange" />
        <link rel="canonical" href="https://www.myyatraexchange.com/" />

        {/* Social Share Meta */}
        <meta property="og:title" content="MyYatraExchange - Confirmed Train Tickets" />
        <meta
          property="og:description"
          content="Find & share confirmed train tickets instantly across India."
        />
        <meta
          property="og:image"
          content="https://www.myyatraexchange.com/train-banner.webp"
        />
        <meta property="og:url" content="https://www.myyatraexchange.com/" />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <img
          src={trainImage}
          alt="Train journey across India"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-orange-500">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-500">Exchange.com</span>
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-xl">
            Share unused train tickets & help others get confirmed travel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/find"
              className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              Find Ticket
            </Link>

            <Link
              to="/post"
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Post Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* RECENT TICKETS */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Recent Tickets
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-red-500 font-medium">
            No tickets are available right now.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}

        {tickets.length > 0 && (
          <div className="text-center mt-6">
            <Link
              to="/find"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              See All Tickets
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

