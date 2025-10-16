import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [postedTickets, setPostedTickets] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token) throw new Error("Unauthorized");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [userRes, postedRes, bookedRes] = await Promise.all([
        axios.get(`${API_BASE}/auth/profile`, config),
        axios.get(`${API_BASE}/ticket/my-tickets`, config),
        axios.get(`${API_BASE}/ticket/my-bookings`, config),
      ]);

      setUser(userRes.data.user || {});
      setPostedTickets(postedRes.data.postedTickets || []);
      setBookedTickets(bookedRes.data.bookings || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${API_BASE}/ticket/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Ticket deleted");
        setPostedTickets((prev) => prev.filter((t) => t._id !== id));
      } else toast.error("Failed to delete ticket");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting ticket");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* User Info */}
      <div className="mb-8 bg-gray-50 border p-5 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">My Profile</h2>
        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>Mobile:</strong> {user?.mobile || "N/A"}</p>
        <p><strong>Unique ID:</strong> {user?._id || "N/A"}</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* My Posted Tickets */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          My Tickets
        </h3>
        {postedTickets.length === 0 ? (
          <p className="text-gray-500">No tickets posted yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {postedTickets.map((t) => (
              <div key={t._id} className="border rounded-2xl p-4 shadow-sm bg-white">
                <p className="font-semibold text-blue-700">
                  {t.trainName} ({t.trainNumber})
                </p>
                <p>{t.from} → {t.to}</p>
                <p><strong>Passenger:</strong> {t.passengerName}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {t.contactUnlocked ? (
                    <span className="text-green-700 font-semibold">Booked</span>
                  ) : (
                    <span className="text-orange-600 font-semibold">Available</span>
                  )}
                </p>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded mt-2 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Bookings */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          My Bookings
        </h3>
        {bookedTickets.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {bookedTickets.map((t) => (
              <div key={t._id} className="border rounded-2xl p-4 shadow-sm bg-white">
                <p className="font-semibold text-blue-700">
                  {t.trainName} ({t.trainNumber})
                </p>
                <p>{t.from} → {t.to}</p>
                <p><strong>Passenger:</strong> {t.passengerName}</p>
                <p><strong>Contact:</strong> {t.contactNumber}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

