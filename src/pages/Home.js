import React from 'react';
import { Link } from 'react-router-dom';
import trainImage from '../assets/train.jpg';
import tickets from '../data/tickets';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-100 mb-10">
        <img
          src={trainImage}
          alt="Train"
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to MyYatraExchange.com</h1>
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
        <h2 className="text-2xl font-bold mb-4 text-center">All Available Tickets</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white shadow-md rounded p-4 border">
              <h3 className="font-semibold text-lg">
                {ticket.trainName} ({ticket.trainNumber})
              </h3>
              <p>{ticket.from} → {ticket.to}</p>
              <p>Date: {ticket.date}</p>
              <p>Tickets: {ticket.numberOfTickets}</p>
              <p>Class: {ticket.travelClass}</p>
              <p>Passenger: {ticket.name} ({ticket.gender}, {ticket.age})</p>
              <p>
                Contact: {ticket.contactVisible ? (
                  ticket.contact
                ) : (
                  <span className="text-blue-500 cursor-pointer">Unlock Contact - ₹20</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;