import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user: ctxUser, token, logout } = useAuth();
  const [user, setUser] = useState(ctxUser || null);
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyMsg, setCopyMsg] = useState("");

  const API_BASE =
    process.env.REACT_APP_API_BASE ||
    "https://ticket-backend-g5da.onrender.com/api";

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setUser(res.data.user);
    } catch (err) {
      console.warn("Profile fetch failed, using cached user.");
      if (ctxUser) setUser(ctxUser);
    }
  };

  const fetchMyTickets = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my/posted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setMyTickets(res.data.tickets);
    } catch (err) {
      console.error("Error fetching my tickets:", err);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setMyBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);
        await fetchProfile();
        await Promise.all([fetchMyTickets(), fetchMyBookings()]);
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [token]);

  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopyMsg("Copied!");
      setTimeout(() => setCopyMsg(""), 1800);
    } catch {
      setCopyMsg("Copy failed");
      setTimeout(() => setCopyMsg(""), 1800);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-700">
        My Profile
      </h1>

      {/* Profile Details */}
      <div className="bg-white border shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          👤 Profile Details
        </h2>

        {user ? (
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-lg">{user.name || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-lg">{user.phone || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <p className="font-medium">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Unique ID</p>
              <div className="flex items-center gap-3">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm break-all">
                  {user.uniqueId || user._id}
                </code>
                <button
                  onClick={() => copyId(user.uniqueId || user._id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Copy
                </button>
                {copyMsg && (
                  <span className="text-sm text-green-600 ml-2">{copyMsg}</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No user info found.</p>
        )}

        {/* Logout */}
        <div className="mt-6">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

          {/* ✅ Admin Button */}
          {localStorage.getItem("isAdmin") === "true" && (
            <div className="mt-4">
              <a
                href="/admin"
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                🔐 Go to Admin Panel
              </a>
            </div>
          )}
        </div>
      </div>

      {/* My Posted Tickets */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🎫 My Posted Tickets
        </h2>
        {myTickets.length === 0 ? (
          <p className="text-gray-500">No tickets posted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTickets.map((t) => (
              <div
                key={t._id}
                className="border p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-blue-700">
                  {t.trainName}
                </h3>
                <p>
                  {t.from} → {t.to}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(t.fromDateTime).toLocaleDateString()}
                </p>
                <p>Status: {t.paymentStatus}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My Bookings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🧾 My Bookings
        </h2>
        {myBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((b) => (
              <div
                key={b._id}
                className="border p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-green-700">
                  {b.trainName || b.ticket?.trainName}
                </h3>
                <p>
                  {b.from || b.ticket?.from} → {b.to || b.ticket?.to}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(
                    b.fromDateTime || b.ticket?.fromDateTime
                  ).toLocaleString()}
                </p>
                <p>Status: {b.paymentStatus || b.status}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;

