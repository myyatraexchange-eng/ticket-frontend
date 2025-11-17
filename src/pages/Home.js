import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import trainImage from "../assets/train.webp";
import { useLoader } from "../context/LoaderContext";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

// CARD
const TicketCard = memo(({ ticket }) => (
  <div className="rounded-xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-xl transition duration-300">
    <div className="flex flex-col gap-1 text-sm">
      <h2 className="text-xl font-semibold text-blue-700 mb-1 uppercase">
        🚆 {ticket.trainName?.toUpperCase()} ({ticket.trainNumber})
      </h2>

      <p className="uppercase text-gray-700">
        <span className="font-semibold">📍 Route:</span>{" "}
        {ticket.from?.toUpperCase()} → {ticket.to?.toUpperCase()}
      </p>

      <p className="uppercase text-gray-700">
        <span className="font-semibold">⏰ Departure:</span>{" "}
        {ticket.fromDateTime
          ? new Date(ticket.fromDateTime).toLocaleString("en-IN")
          : "N/A"}
      </p>

      <p className="uppercase text-gray-700">
        <span className="font-semibold">🛬 Arrival:</span>{" "}
        {ticket.toDateTime
          ? new Date(ticket.toDateTime).toLocaleString("en-IN")
          : "N/A"}
      </p>

      <p className="uppercase text-gray-700">
        <span className="font-semibold">🪑 Class:</span>{" "}
        {ticket.classType?.toUpperCase()}
      </p>

      <p className="uppercase text-gray-700">
        <span className="font-semibold">🎟 Tickets:</span>{" "}
        {ticket.ticketNumber}
      </p>

      <p className="uppercase text-gray-700">
        <span className="font-semibold">👤 Passenger:</span>{" "}
        {ticket.passengerName
          ? `${ticket.passengerName.toUpperCase()} (${
              ticket.passengerGender?.toUpperCase()
            }, ${ticket.passengerAge})`
          : "N/A"}
      </p>
    </div>
  </div>
));

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const load = async () => {
      showLoader();
      try {
        const res = await fetch(`${API_BASE}/tickets?available=true`);
        const data = await res.json();
        setTickets((data.tickets || []).slice(0, 3));
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        hideLoader();
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>MyYatraExchange – Find Confirmed Train Tickets</title>
      </Helmet>

      {/* HERO SECTION */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={trainImage}
          alt="Train running - MyYatraExchange"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-orange-500">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-500">Exchange.com</span>
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-xl">
            Share unused train tickets & help others get confirmed seats.
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

      {/* RECENT */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Recent Tickets
        </h2>

        {tickets.length === 0 ? (
          <p className="text-center text-red-500 font-medium">
            No tickets available right now.
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

