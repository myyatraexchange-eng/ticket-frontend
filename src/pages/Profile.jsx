import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user: ctxUser, token, logout } = useAuth();

  const [user, setUser] = useState(ctxUser || null);
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [copyMsg, setCopyMsg] = useState("");

  const API_BASE =
    process.env.REACT_APP_API_BASE ||
    "https://ticket-backend-g5da.onrender.com/api";

  // -------------------------
  // FAST FETCH HELPERS
  // -------------------------
  const fastGet = async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Connection: "keep-alive",
      },
    });
    return res.json();
  };

  // -------------------------
  // LOADERS
  // -------------------------
  const loadProfile = useCallback(async () => {
    try {
      const data = await fastGet(`${API_BASE}/auth/me`);
      if (data.success) setUser(data.user);
    } catch (e) {
      console.error("Profile Error:", e);
    }
    setLoadingUser(false);
  }, [token]);

  const loadTickets = useCallback(async () => {
    try {
      const data = await fastGet(`${API_BASE}/tickets/my/posted`);
      if (data.success) setMyTickets(data.tickets);
    } catch (e) {}
    setLoadingTickets(false);
  }, [token]);

  const loadBookings = useCallback(async () => {
    try {
      const data = await fastGet(`${API_BASE}/tickets/my/bookings`);
      if (data.success) setMyBookings(data.bookings);
    } catch (e) {}
    setLoadingBookings(false);
  }, [token]);

  // -------------------------
  // USE EFFECT (Stagger Loading)
  // -------------------------
  useEffect(() => {
    if (!token) return;

    loadProfile();

    setTimeout(loadTickets, 100); // smooth stagger
    setTimeout(loadBookings, 200);
  }, [token]);

  // -------------------------
  // COPY
  // -------------------------
  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopyMsg("Copied!");
    } catch {
      setCopyMsg("Copy failed");
    }
    setTimeout(() => setCopyMsg(""), 1300);
  };

  // -------------------------
  // LOADING SKELETON
  // -------------------------
  if (loadingUser)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading profile<span className="loading-dots"></span>
      </div>
    );

  // -------------------------
  // RETURN
  // -------------------------
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-700">
        My Profile
      </h1>

      {/* Profile */}
      <div className="bg-white border shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          👤 Profile Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-lg">{user?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-lg">{user?.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joined On</p>
            <p className="font-medium">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Unique ID</p>
            <div className="flex items-center gap-3">
              <code className="bg-gray-100 px-3 py-1 rounded text-sm break-all">
                {user?.uniqueId || user?._id}
              </code>
              <button
                onClick={() => copyId(user?.uniqueId || user?._id)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Copy
              </button>
              {copyMsg && (
                <span className="text-sm text-green-600 ml-1">{copyMsg}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>

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

      {/* Tickets */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🎫 My Posted Tickets
        </h2>

        {loadingTickets ? (
          <p className="text-gray-500">
            Loading tickets<span className="loading-dots"></span>
          </p>
        ) : myTickets.length === 0 ? (
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

      {/* Bookings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🧾 My Bookings
        </h2>

        {loadingBookings ? (
          <p className="text-gray-500">
            Loading bookings<span className="loading-dots"></span>
          </p>
        ) : myBookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
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

