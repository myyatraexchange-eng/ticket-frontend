import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import trainImage from '../assets/train.jpg';

// Backend URL
const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";

const Home = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${API_BASE}/tickets`);
        if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`);
        const data = await res.json();
        setTickets(data || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-100 mb-10">
        <img src={trainImage} alt="Train" className="w-full h-full object-cover rounded" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-orange-500">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-500">Exchange.com</span>
          </h1>
          <p className="text-xl mb-6 max-w-2xl">
            Share Your Unused Train Ticket — Save Cancellation Charges! Connect with people who need a ticket.
          </p>
          <div className="space-x-4">
            <Link to="/find" className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200">
              Find Ticket
            </Link>
            <Link to="/post" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700">
              Post Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* Ticket Listing */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">All Available Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-center text-red-600 font-medium">No tickets available</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map(ticket => (
              <div key={ticket._id} className="bg-white shadow-md rounded p-4 border hover:shadow-lg transition duration-200">
                <h3 className="font-semibold text-lg text-blue-600">{ticket.trainName} ({ticket.trainNumber})</h3>
                <p><strong>From → To:</strong> {ticket.from} → {ticket.to}</p>
                <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
                <p><strong>Tickets:</strong> {ticket.ticketCount}</p>
                <p><strong>Class:</strong> {ticket.seatType}</p>
                <p><strong>Passenger:</strong> {ticket.holderName} ({ticket.gender}, {ticket.age})</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
