import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalContact, setModalContact] = useState(null);

  useEffect(() => {
    if (user) {
      fetchData();
      const interval = setInterval(fetchData, 5000); // auto-refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch posted tickets
      const postedRes = await axios.get(`${API_BASE}/tickets/my-tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyTickets(postedRes.data.postedTickets || []);

      // Fetch booked tickets
      const bookedRes = await axios.get(`${API_BASE}/tickets/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyBookings(bookedRes.data.bookings || []);
    } catch (err) {
      console.error("ProfileDataFetchError:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyTickets(myTickets.filter((t) => t._id !== ticketId));
    } catch (err) {
      console.error("DeleteTicketError:", err);
      alert("Failed to delete the ticket. Try again.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Contact number copied!");
  };

  if (!user)
    return (
      <div className="text-center py-20 text-gray-600">
        Please login to view your profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user.name}
        </h2>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mb-6"
        >
          Logout
        </button>

        {loading && <p className="text-gray-400 text-sm mb-3">Refreshing...</p>}

        {/* My Posted Tickets */}
        <h3 className="text-lg font-semibold mb-3">My Posted Tickets</h3>
        {myTickets.length === 0 ? (
          <p className="text-gray-500 mb-6">You haven't posted any tickets.</p>
        ) : (
          <ul className="space-y-3 mb-8">
            {myTickets.map((t) => (
              <li
                key={t._id}
                className="border rounded-lg p-3 bg-gray-50 flex flex-col md:flex-row justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {t.trainName} ({t.trainNumber})
                  </p>
                  <p className="text-sm text-gray-600">
                    {t.from} → {t.to}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-3">
                  {t.paymentStatus === "pending" && (
                    <span className="text-orange-600 font-semibold">
                      Pending Verification
                    </span>
                  )}
                  {t.paymentStatus === "verified" && (
                    <span className="text-green-600 font-semibold">Sold ✅</span>
                  )}
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* My Bookings */}
        <h3 className="text-lg font-semibold mb-3">My Bookings</h3>
        {myBookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <ul className="space-y-3">
            {myBookings.map((t) => (
              <li
                key={t._id}
                className="border rounded-lg p-3 bg-gray-50 flex flex-col md:flex-row justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {t.trainName} ({t.trainNumber})
                  </p>
                  <p className="text-sm text-gray-600">
                    {t.from} → {t.to}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-3">
                  {t.paymentStatus === "not_paid" && (
                    <span className="text-red-600 font-semibold">Not Paid</span>
                  )}
                  {t.paymentStatus === "pending" && (
                    <span className="text-orange-600 font-semibold">
                      Pending — Waiting for Admin Verification
                    </span>
                  )}
                  {t.paymentStatus === "verified" && t.contactNumber && (
                    <button
                      onClick={() => setModalContact(t.contactNumber)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      View Contact
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Contact Modal */}
        {modalContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h3 className="text-lg font-semibold mb-3">Contact Number</h3>
              <p className="text-gray-800 text-xl mb-4">{modalContact}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => copyToClipboard(modalContact)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() => setModalContact(null)}
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

