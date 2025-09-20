import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import trainImage from "../assets/train.webp";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

// ✅ Ticket Card Component (Home version, no payment button)
const TicketCard = memo(({ ticket }) => (
  <div className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition duration-200">
    <h3 className="font-semibold text-lg sm:text-xl text-blue-600">
      {ticket.trainName} ({ticket.trainNumber})
    </h3>
    <p className="text-sm sm:text-base">
      <strong>From → To:</strong> {ticket.from} → {ticket.to}
    </p>
    <p className="text-sm sm:text-base">
      <strong>Departure:</strong>{" "}
      {ticket.fromDateTime ? new Date(ticket.fromDateTime).toLocaleString() : "N/A"}
    </p>
    <p className="text-sm sm:text-base">
      <strong>Arrival:</strong>{" "}
      {ticket.toDateTime ? new Date(ticket.toDateTime).toLocaleString() : "N/A"}
    </p>
    <p className="text-sm sm:text-base"><strong>Tickets:</strong> {ticket.ticketCount}</p>
    <p className="text-sm sm:text-base"><strong>Class:</strong> {ticket.seatType}</p>
    <p className="text-sm sm:text-base">
      <strong>Passenger:</strong> {ticket.holderName} ({ticket.gender}, {ticket.age})
    </p>
  </div>
));

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/tickets?page=1&limit=6`);
        if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`);
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>MyYatraExchange - Exchange & Find Confirmed Train Tickets</title>
        <meta name="description" content="MyYatraExchange helps travelers connect to exchange or find confirmed train tickets and save cancellation charges. A simple and secure ticket exchange platform." />
        <meta name="keywords" content="train ticket exchange, confirmed train ticket, save cancellation charges, railway ticket, indian railways ticket exchange" />
        <meta name="author" content="MyYatraExchange" />
        <link rel="canonical" href="https://www.myyatraexchange.com/" />
        <meta property="og:title" content="MyYatraExchange - Confirmed Train Ticket Exchange" />
        <meta property="og:description" content="Save cancellation charges and connect with people who need confirmed train tickets easily." />
        <meta property="og:image" content="https://www.myyatraexchange.com/logo.png" />
        <meta property="og:url" content="https://www.myyatraexchange.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MyYatraExchange - Train Ticket Exchange" />
        <meta name="twitter:description" content="Find and exchange confirmed train tickets securely at MyYatraExchange." />
        <meta name="twitter:image" content="https://www.myyatraexchange.com/logo.png" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <img
          src={trainImage}
          alt="Train"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-orange-500">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-500">Exchange.com</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-xl">
            Share Your Unused Train Ticket — Save Cancellation Charges! Connect with people who need a ticket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/find" className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">
              Find Ticket
            </Link>
            <Link to="/post" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">
              Post Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* Ticket Listing */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">Recent Tickets</h2>

        {loading ? (
          // Skeleton Loader
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-40 rounded"></div>
            ))}
          </div>
        ) : tickets.length === 0 ? (
          <p className="text-center text-red-600 font-medium">No tickets available</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}

        {/* Link to full ticket page */}
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
};

export default Home;

