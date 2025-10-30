import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  // useAuth से token और possibly cached user मिलेगा
  const { user: ctxUser, token, logout } = useAuth();
  const [user, setUser] = useState(ctxUser || null); // local copy (server-fresh)
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copyMsg, setCopyMsg] = useState("");

  const API_BASE =
    process.env.REACT_APP_API_BASE_URL ||
    "https://ticket-backend-g5da.onrender.com/api";

  // ----- fetch fresh profile from server (fallback if context not fresh) -----
  const fetchProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data && res.data.success && res.data.user) {
        setUser(res.data.user);
      } else if (ctxUser) {
        setUser(ctxUser);
      }
    } catch (err) {
      // agar /auth/me na ho tab context user hi use kar lo
      if (ctxUser) setUser(ctxUser);
      console.warn("Could not fetch fresh profile, using context user.", err);
    }
  };

  // ✅ Fetch My Posted Tickets
  const fetchMyTickets = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setMyTickets(res.data.tickets || []);
    } catch (err) {
      console.error("❌ Error fetching my tickets:", err);
    }
  };

  // ✅ Fetch My Bookings
  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setMyBookings(res.data.bookings || []);
    } catch (err) {
      console.error("❌ Error fetching my bookings:", err);
    }
  };

  // on mount or when token changes, load profile + tickets
  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);
        await fetchProfile(); // ensure latest name/email/id
        await Promise.all([fetchMyTickets(), fetchMyBookings()]);
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ctxUser]); // if context user changes, re-sync

  // copy unique id
  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopyMsg("Copied!");
      setTimeout(() => setCopyMsg(""), 1800);
    } catch (err) {
      setCopyMsg("Copy failed");
      setTimeout(() => setCopyMsg(""), 1800);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading your profile...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-700">
        My Profile
      </h1>

      {/* ------------ Profile Details (auto-updated from server/context) ------------ */}
      <div className="bg-white border shadow rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 Profile Details</h2>

        {user ? (
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-lg">{user.name || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-lg">{user.email || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <p className="font-medium">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {/* UNIQUE ID */}
            <div>
              <p className="text-sm text-gray-500">Unique ID</p>
              <div className="flex items-center gap-3">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm break-all">
                  {user.uniqueId || user._id || "N/A"}
                </code>
                <button
                  onClick={() => copyId(user.uniqueId || user._id || "")}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Copy
                </button>
                {copyMsg && <span className="text-sm text-green-600 ml-2">{copyMsg}</span>}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No user details found.</p>
        )}

        {/* Logout */}
        <div className="mt-6">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ------------ My Tickets ------------ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎫 My Posted Tickets</h2>
        {myTickets.length === 0 ? (
          <p className="text-gray-500">No tickets posted yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="border p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-blue-700">{ticket.trainName}</h3>
                <p>{ticket.from} → {ticket.to}</p>
                <p className="text-sm text-gray-600">{new Date(ticket.fromDateTime).toLocaleDateString()}</p>
                <p>Status: <strong>{ticket.paymentStatus}</strong></p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ------------ My Bookings ------------ */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧾 My Bookings</h2>
        {myBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((b) => (
              <div key={b._id} className="border p-4 rounded-xl shadow hover:shadow-lg transition">
                {/* booking object may be either ticket doc or payment doc; handle both */}
                <h3 className="text-lg font-bold text-green-700">
                  {b.trainName || b.ticket?.trainName}
                </h3>
                <p>{b.from || b.ticket?.from} → {b.to || b.ticket?.to}</p>
                <p className="text-sm text-gray-600">
                  Departure: {new Date(b.fromDateTime || b.ticket?.fromDateTime).toLocaleString()}
                </p>
                <p>Status: <strong>{b.paymentStatus || b.status}</strong></p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;

