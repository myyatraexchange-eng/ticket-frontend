// src/pages/AdminPanel.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 5000); // auto-refresh every 5s
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/payments/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.proofs || []);
    } catch (err) {
      console.error("AdminOrdersFetchError:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (proofId, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE}/payments/verify`,
        { proofId, adminName: user.name, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("VerifyPaymentError:", err);
      alert("Failed to update payment status.");
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="text-center py-20 text-gray-600">
        Access denied: Admins only.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Admin Panel
        </h1>

        {loading && <p className="text-gray-400 text-center">Loading orders...</p>}

        {orders.length === 0 && !loading ? (
          <p className="text-gray-500 text-center">No payment proofs submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border rounded-lg p-4 bg-white flex flex-col md:flex-row justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Ticket ID: {order.ticketId}
                  </p>
                  <p className="text-gray-600">
                    {order.payerName} | {order.payerMobile} | ₹{order.amount}
                  </p>
                  <p className={`mt-1 font-semibold ${order.status === "pending" ? "text-orange-600" : order.status === "verified" ? "text-green-600" : "text-red-600"}`}>
                    Status: {order.status}
                  </p>
                </div>
                {order.status === "pending" && (
                  <div className="mt-2 md:mt-0 flex gap-2">
                    <button
                      onClick={() => handleAction(order._id, "verify")}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleAction(order._id, "reject")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
