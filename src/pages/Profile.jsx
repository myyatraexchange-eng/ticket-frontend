import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMyTickets();
      fetchMyBookings();
    }
  }, [user]);

  const fetchMyTickets = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my-tickets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMyTickets(res.data.postedTickets || []);
    } catch (err) {
      console.error("TicketFetchError:", err);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my-bookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMyBookings(res.data.bookings || []);
    } catch (err) {
      console.error("TicketFetchError:", err);
    }
  };

  if (!user)
    return (
      <div className="text-center py-20 text-gray-600">
        Please login to view your profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user.name}
        </h2>
        <p className="text-gray-600 mb-4">Mobile: {user.phone || "N/A"}</p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => navigate("/book-ticket")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Ticket
          </button>
          <button
            onClick={() => navigate("/find-ticket")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            My Tickets
          </button>
          <button
            onClick={() => navigate("/my-bookings")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            My Bookings
          </button>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">My Posted Tickets</h3>
          {myTickets.length === 0 ? (
            <p className="text-gray-500">No tickets posted yet.</p>
          ) : (
            <ul className="space-y-3">
              {myTickets.map((t) => (
                <li key={t._id} className="border rounded-lg p-3 bg-gray-50">
                  {t.trainName} ({t.trainNumber}) — {t.from} → {t.to}
                </li>
              ))}
            </ul>
          )}

          <h3 className="text-lg font-semibold mt-6 mb-3">My Bookings</h3>
          {myBookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet.</p>
          ) : (
            <ul className="space-y-3">
              {myBookings.map((t) => (
                <li key={t._id} className="border rounded-lg p-3 bg-gray-50">
                  {t.trainName} ({t.trainNumber}) — {t.from} → {t.to}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

