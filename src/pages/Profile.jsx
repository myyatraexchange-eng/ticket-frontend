import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [postedTickets, setPostedTickets] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });

  const getToken = () => auth?.token || localStorage.getItem("token");

  useEffect(() => {
    fetchProfileAndTickets();
  }, []);

  const fetchProfileAndTickets = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [userRes, postedRes, bookingsRes] = await Promise.all([
        axios.get(`${API_BASE}/auth/profile`, config).catch(() => ({ data: null })),
        axios.get(`${API_BASE}/ticket/my-tickets`, config).catch(() => ({ data: { postedTickets: [] } })),
        axios.get(`${API_BASE}/ticket/my-bookings`, config).catch(() => ({ data: { bookings: [] } })),
      ]);

      setUserInfo(auth?.user || userRes?.data?.user || null);
      setPostedTickets(postedRes?.data?.postedTickets || []);
      setBookedTickets(bookingsRes?.data?.bookings || []);
    } catch (err) {
      console.error("Profile load error:", err);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const token = getToken();
      const res = await axios.delete(`${API_BASE}/ticket/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) {
        toast.success("Ticket deleted");
        setPostedTickets((prev) => prev.filter((t) => t._id !== id));
      } else toast.error(res.data?.message || "Delete failed");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting ticket");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const res = await axios.post(`${API_BASE}/auth/change-password`, passwordData, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data?.success) {
        toast.success("Password updated successfully!");
        setShowPasswordForm(false);
        setPasswordData({ oldPassword: "", newPassword: "" });
      } else toast.error(res.data?.message || "Failed to update password");
    } catch (err) {
      console.error("Password change error:", err);
      toast.error("Error updating password");
    }
  };

  const handleLogout = () => {
    if (auth?.logout) auth.logout();
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500 animate-pulse">Loading profile...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Info */}
      <div className="mb-8 bg-gray-50 border p-5 rounded-2xl shadow flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">My Profile</h2>
          <p><strong>Full Name:</strong> {userInfo?.name || "N/A"}</p>
          <p><strong>Email:</strong> {userInfo?.email || "N/A"}</p>
          <p><strong>Mobile:</strong> {userInfo?.mobile || userInfo?.phone || "N/A"}</p>
          <p><strong>Unique ID:</strong> {userInfo?._id || "N/A"}</p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          <button onClick={() => setShowPasswordForm((s) => !s)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {showPasswordForm ? "Cancel" : "Change Password"}
          </button>
        </div>
      </div>

      {showPasswordForm && (
        <form onSubmit={handlePasswordChange} className="mb-6 max-w-sm bg-white p-4 rounded shadow">
          <input type="password" placeholder="Old Password" value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            className="w-full border p-2 rounded mb-2" />
          <input type="password" placeholder="New Password" value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full border p-2 rounded mb-2" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Password</button>
        </form>
      )}

      {/* My Posted Tickets */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">My Posted Tickets</h3>
        {postedTickets.length === 0 ? (
          <p className="text-gray-500">You haven’t posted any tickets yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {postedTickets.map((t) => (
              <div key={t._id} className="border rounded-2xl p-4 shadow-sm bg-white">
                <p className="font-semibold text-blue-700">{t.trainName} ({t.trainNumber})</p>
                <p>{t.from} → {t.to}</p>
                <p><strong>Passenger:</strong> {t.passengerName}</p>
                <p><strong>Date / Time:</strong> {t.fromDateTime ? new Date(t.fromDateTime).toLocaleString() : "N/A"}</p>
                <p><strong>Contact:</strong> {t.contactUnlocked ? t.contactNumber : "Locked"}</p>
                <p><strong>Status:</strong> {t.isAvailable ? (t.contactUnlocked ? "Booked" : "Available") : "Booked/Hidden"}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => navigate(`/edit-ticket/${t._id}`)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(t._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Bookings */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">My Bookings (Unlocked)</h3>
        {bookedTickets.length === 0 ? (
          <p className="text-gray-500">You haven’t unlocked or booked any tickets yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {bookedTickets.map((t) => (
              <div key={t._id} className="border rounded-2xl p-4 shadow-sm bg-white">
                <p className="font-semibold text-blue-700">{t.trainName} ({t.trainNumber})</p>
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

