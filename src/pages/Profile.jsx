import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyBookings();
      const interval = setInterval(fetchMyBookings, 5000); // 🔁 auto-refresh every 5s
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/tickets/my-bookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMyBookings(res.data.bookings || []);
    } catch (err) {
      console.error("BookingFetchError:", err);
    } finally {
      setLoading(false);
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

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mb-6"
        >
          Logout
        </button>

        <h3 className="text-lg font-semibold mb-3">My Bookings</h3>

        {loading && <p className="text-gray-400 text-sm">Refreshing...</p>}

        {myBookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <ul className="space-y-3">
            {myBookings.map((t) => (
              <li
                key={t._id}
                className="border rounded-lg p-3 bg-gray-50 flex flex-col md:flex-row justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {t.trainName} ({t.trainNumber})
                  </p>
                  <p className="text-sm text-gray-600">
                    {t.from} → {t.to}
                  </p>
                </div>

                <div className="mt-2 md:mt-0">
                  {t.paymentStatus === "not_paid" && (
                    <span className="text-red-600 font-semibold">Not Paid</span>
                  )}
                  {t.paymentStatus === "pending" && (
                    <span className="text-orange-600 font-semibold">
                      Pending — Waiting for Admin Verification
                    </span>
                  )}
                  {t.paymentStatus === "verified" && (
                    <span className="text-green-600 font-semibold">
                      Verified ✅ Contact: {t.contactNumber}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

