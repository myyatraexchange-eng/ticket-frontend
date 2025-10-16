import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [myTickets, setMyTickets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editingData, setEditingData] = useState({});

  useEffect(() => {
    if (user) {
      fetchMyTickets();
      fetchMyBookings();
    }
  }, [user]);

  const fetchMyTickets = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my-tickets`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMyTickets(res.data.postedTickets || []);
    } catch (err) {
      console.error("TicketFetchError:", err);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/my-bookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMyBookings(res.data.bookings || []);
    } catch (err) {
      console.error("BookingFetchError:", err);
    }
  };

  const deleteTicket = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await axios.delete(`${API_BASE}/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMyTickets(myTickets.filter(t => t._id !== ticketId));
    } catch (err) {
      console.error("DeleteError:", err);
      alert("Failed to delete ticket.");
    }
  };

  const startEdit = (ticket) => {
    setEditingTicketId(ticket._id);
    setEditingData({
      trainName: ticket.trainName || "",
      trainNumber: ticket.trainNumber || "",
      from: ticket.from || "",
      to: ticket.to || "",
      classType: ticket.classType || "",
      ticketNumber: ticket.ticketNumber || "",
    });
  };

  const cancelEdit = () => {
    setEditingTicketId(null);
    setEditingData({});
  };

  const saveEdit = async (ticketId) => {
    try {
      const res = await axios.put(`${API_BASE}/tickets/${ticketId}`, editingData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMyTickets(
        myTickets.map(t => (t._id === ticketId ? res.data.updatedTicket : t))
      );
      cancelEdit();
    } catch (err) {
      console.error("EditError:", err);
      alert("Failed to update ticket.");
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
      <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name}
          </h2>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600 mb-6">Mobile: {user.phone || "N/A"}</p>

        {/* My Posted Tickets */}
        <div>
          <h3 className="text-lg font-semibold mb-3">My Posted Tickets</h3>
          {myTickets.length === 0 ? (
            <p className="text-gray-500">No tickets posted yet.</p>
          ) : (
            <div className="grid gap-4">
              {myTickets.map((t) => (
                <div
                  key={t._id}
                  className="border rounded-lg p-4 flex justify-between items-center bg-gray-50"
                >
                  {editingTicketId === t._id ? (
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        type="text"
                        value={editingData.trainName}
                        onChange={(e) => setEditingData({...editingData, trainName: e.target.value})}
                        placeholder="Train Name"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editingData.trainNumber}
                        onChange={(e) => setEditingData({...editingData, trainNumber: e.target.value})}
                        placeholder="Train Number"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editingData.from}
                        onChange={(e) => setEditingData({...editingData, from: e.target.value})}
                        placeholder="From"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editingData.to}
                        onChange={(e) => setEditingData({...editingData, to: e.target.value})}
                        placeholder="To"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editingData.classType}
                        onChange={(e) => setEditingData({...editingData, classType: e.target.value})}
                        placeholder="Class Type"
                        className="border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editingData.ticketNumber}
                        onChange={(e) => setEditingData({...editingData, ticketNumber: e.target.value})}
                        placeholder="Number of Tickets"
                        className="border p-2 rounded"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveEdit(t._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="font-semibold">
                          {t.trainName} ({t.trainNumber})
                        </p>
                        <p>
                          {t.from} → {t.to} | {t.classType?.toUpperCase() || "GENERAL"}
                        </p>
                        <p>Seats: {t.ticketNumber}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(t)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTicket(t._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Bookings */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">My Bookings</h3>
          {myBookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet.</p>
          ) : (
            <div className="grid gap-4">
              {myBookings.map((t) => (
                <div key={t._id} className="border rounded-lg p-4 bg-gray-50">
                  <p className="font-semibold">
                    {t.trainName} ({t.trainNumber})
                  </p>
                  <p>
                    {t.from} → {t.to} | {t.classType?.toUpperCase() || "GENERAL"}
                  </p>
                  <p>Seats: {t.ticketNumber}</p>

                  {t.paymentStatus === "pending" ? (
                    <p className="mt-2 text-orange-600 font-semibold">
                      Payment Pending / Waiting for Admin Confirmation
                    </p>
                  ) : (
                    <p className="mt-2 text-green-700 font-semibold">
                      Contact: {t.contactNumber || "N/A"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

