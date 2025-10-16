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
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [userRes, postedRes, bookedRes] = await Promise.all([
        axios.get(`${API_BASE}/auth/profile`, config),
        axios.get(`${API_BASE}/tickets/my-tickets`, config),
        axios.get(`${API_BASE}/tickets/my-bookings`, config),
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
      const res = await axios.delete(`${API_BASE}/tickets/${id}`, {
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE}/auth/change-password`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Password updated successfully!");
        setShowPasswordForm(false);
        setPasswordData({ oldPassword: "", newPassword: "" });
      } else {
        toast.error(res.data.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Info */}
      <div className="mb-8 bg-gray-50 border p-5 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-700">My Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <p><strong>Full Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>Mobile:</strong> {user?.mobile || "N/A"}</p>
        <p><strong>Unique ID:</strong> {user?._id || "N/A"}</p>

        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showPasswordForm ? "Cancel" : "Change Password"}
        </button>

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className="mt-4 space-y-3 max-w-sm">
            <input
              type="password"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, oldPassword: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Password
            </button>
          </form>
        )}
      </div>

      {/* My Posted Tickets */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          My Posted Tickets
        </h3>
        {postedTickets.length === 0 ? (
          <p className="text-gray-500">You haven’t posted any tickets yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {postedTickets.map((t) => (
              <div
                key={t._id}
                className="border rounded-2xl p-4 shadow-sm bg-white"
              >
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
          My Bookings (Unlocked)
        </h3>
        {bookedTickets.length === 0 ? (
          <p className="text-gray-500">You haven’t unlocked or booked any tickets yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {bookedTickets.map((t) => (
              <div
                key={t._id}
                className="border rounded-2xl p-4 shadow-sm bg-white"
              >
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

