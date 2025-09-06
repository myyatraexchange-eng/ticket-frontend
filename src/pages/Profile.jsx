import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";
=======

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api"; // 👈 backend URL
>>>>>>> fix: added react-helmet dependency

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const navigate = useNavigate();

  // Token localStorage me rakha hoga (login ke time set kiya hoga)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);

        // 🔹 user info
        const resUser = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resUser.ok) throw new Error("Failed to fetch user");
        const userData = await resUser.json();
        setUser(userData);

        // 🔹 user tickets
        const resTickets = await fetch(`${API_BASE}/tickets/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resTickets.ok) throw new Error("Failed to fetch tickets");
        const ticketData = await resTickets.json();
        setTickets(ticketData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const res = await fetch(`${API_BASE}/tickets/${ticketId}`, {
=======
  const [error, setError] = useState("");

  // ✅ Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setError("Not logged in");

      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Fetch my tickets
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/tickets/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tickets");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/tickets/${id}`, {
>>>>>>> fix: added react-helmet dependency
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete ticket");

<<<<<<< HEAD
      // frontend se bhi remove karo
      setTickets((prev) => prev.filter((t) => t._id !== ticketId));
    } catch (err) {
      console.error(err);
      alert("❌ Ticket delete failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        My Profile
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading profile...</p>
      ) : !user ? (
        <p className="text-center text-red-600">
          Failed to load profile. Please login again.
        </p>
      ) : (
        <>
          {/* User Info */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
=======
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchProfile();
    fetchTickets();
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* User Info */}
        {user && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Welcome, {user.name}
            </h2>
            <p className="text-gray-700">📱 Phone: {user.phone}</p>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>>>>>>> fix: added react-helmet dependency
            >
              Logout
            </button>
          </div>
<<<<<<< HEAD

          {/* Tickets */}
          <h3 className="text-xl font-semibold mb-4">My Tickets</h3>
          {tickets.length === 0 ? (
            <p className="text-gray-500">You have not posted any tickets yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white shadow-md rounded p-4 border"
                >
                  <h4 className="font-semibold text-blue-600">
                    {ticket.trainName} ({ticket.trainNumber})
                  </h4>
                  <p>
                    <strong>From → To:</strong> {ticket.from} → {ticket.to}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {ticket.date
                      ? new Date(ticket.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Seats:</strong> {ticket.ticketCount} ({ticket.seatType})
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/edit-ticket/${ticket._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
=======
        )}

        {/* Tickets */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          My Tickets
        </h3>
        {tickets.length === 0 ? (
          <p className="text-gray-600">No tickets found.</p>
        ) : (
          <ul className="space-y-4">
            {tickets.map((ticket) => (
              <li
                key={ticket._id}
                className="border p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    🚆 {ticket.trainName} ({ticket.trainNumber})
                  </p>
                  <p>
                    {ticket.from} → {ticket.to} | {new Date(ticket.date).toDateString()}
                  </p>
                  <p>👤 {ticket.holderName} | 🎟 {ticket.ticketCount} | {ticket.seatType}</p>
                </div>
                <div className="flex gap-2">
                  {/* Edit button */}
                  <button
                    onClick={() => alert("Edit feature coming soon!")}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
>>>>>>> fix: added react-helmet dependency
    </div>
  );
};

export default Profile;
<<<<<<< HEAD
=======

>>>>>>> fix: added react-helmet dependency
