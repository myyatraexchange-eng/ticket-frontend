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
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [userRes, postedRes, bookedRes] = await Promise.all([
        axios.get(`${API_BASE}/auth/profile`, config),
        axios.get(`${API_BASE}/ticket/my-tickets`, config),
        axios.get(`${API_BASE}/ticket/my-bookings`, config),
      ]);

      setUser(userRes.data.user);
      setPostedTickets(postedRes.data.postedTickets || []);
      setBookedTickets(bookedRes.data.bookings || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
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
      } else {
        toast.error("Failed to delete ticket");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting ticket");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Profile Info */}
      <div className="mb-6 bg-gray-50 p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">My Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Mobile:</strong> {user?.mobile}</p>
      </div>

      {/* Posted Tickets */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">My Posted Tickets</h3>
        {postedTickets.length === 0 ? (
          <p className="text-gray-500">You haven’t posted any tickets yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {postedTickets.map((t) => (
              <div key={t._id} className="border rounded-2xl p-4 shadow-sm">
                <p className="font-semibold">
                  {t.trainName} ({t.trainNumber})
                </p>
                <p>
                  {t.from} → {t.to}
                </p>
                <p>
                  <strong>Passenger:</strong> {t.passengerName}
                </p>
                <p>
                  <strong>Contact:</strong> {t.contactNumber}
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

      {/* Booked Tickets */}
      <div>
        <h3 className="text-lg font-semibold mb-2">My Bookings</h3>
        {bookedTickets.length === 0 ? (
          <p className="text-gray-500">You haven’t booked any tickets yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {bookedTickets.map((t) => (
              <div key={t._id} className="border rounded-2xl p-4 shadow-sm">
                <p className="font-semibold">
                  {t.trainName} ({t.trainNumber})
                </p>
                <p>
                  {t.from} → {t.to}
                </p>
                <p>
                  <strong>Passenger:</strong> {t.passengerName}
                </p>
                <p>
                  <strong>Contact:</strong> {t.contactNumber}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

