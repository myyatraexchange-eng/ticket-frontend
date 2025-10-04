// src/pages/Home.jsx
import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { QRCodeCanvas } from "qrcode.react";
import trainImage from "../assets/train.webp";
import { useLoader } from "../context/LoaderContext";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

const TicketCard = memo(({ ticket }) => (
  <div className="rounded-xl shadow-lg p-4 bg-white border border-gray-200 hover:shadow-2xl transition duration-300 text-sm">
    <h2 className="font-bold text-blue-700 mb-1 uppercase text-base">
      🚆 {ticket.trainName?.toUpperCase() || "UNKNOWN TRAIN"} ({ticket.trainNumber || "N/A"})
    </h2>
    <p className="text-gray-700 uppercase">
      <span className="font-semibold">📍 Route:</span> {ticket.from?.toUpperCase() || "N/A"} → {ticket.to?.toUpperCase() || "N/A"}
    </p>
    <p className="text-gray-700 uppercase">
      <span className="font-semibold">⏰ Departure:</span> {ticket.fromDateTime ? new Date(ticket.fromDateTime).toLocaleString("en-IN") : "N/A"}
    </p>
    <p className="text-gray-700 uppercase">
      <span className="font-semibold">🛬 Arrival:</span> {ticket.toDateTime ? new Date(ticket.toDateTime).toLocaleString("en-IN") : "N/A"}
    </p>
    <p className="text-gray-700 uppercase">
      <span className="font-semibold">🪑 Class:</span> {ticket.seatType?.toUpperCase() || "GENERAL"}
    </p>
    <p className="text-gray-700 uppercase">
      <span className="font-semibold">🎟 Tickets:</span> {ticket.ticketCount || "N/A"}
    </p>
    <p className="text-gray-700 uppercase">
      <span className="font-semibold">👤 Passenger:</span> {ticket.holderName ? `${ticket.holderName.toUpperCase()} (${ticket.gender.toUpperCase()}, ${ticket.age})` : "N/A"}
    </p>
  </div>
));

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchTickets = async () => {
      showLoader();
      try {
        const res = await fetch(`${API_BASE}/tickets?page=1&limit=6`);
        if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`);
        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (err) {
        console.error(err);
        setTickets([]);
      } finally {
        hideLoader();
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>MyYatraExchange - Exchange & Find Confirmed Train Tickets</title>
        <meta name="description" content="MyYatraExchange helps travelers connect to exchange or find confirmed train tickets and save cancellation charges." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <img src={trainImage} alt="Train" className="w-full h-full object-cover object-center" loading="lazy" />
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
            <Link to="/find" className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">Find Ticket</Link>
            <Link to="/post" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Post Ticket</Link>
          </div>
        </div>
      </div>

      {/* Ticket Listing */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">Recent Tickets</h2>

        {tickets.length === 0 ? (
          <p className="text-center text-red-600 font-medium">No tickets available</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}

        {tickets.length > 0 && (
          <div className="text-center mt-6">
            <Link to="/find" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">See All Tickets</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

