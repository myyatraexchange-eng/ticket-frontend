import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

const AdminPanel = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllPayments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setPayments(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to load payments.");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setStats(res.data.stats || {});
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const verifyPayment = async (id, status) => {
    try {
      await axios.post(
        `${API_BASE}/admin/verify/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAllPayments();
      fetchStats();
    } catch (err) {
      alert("Failed to update payment status");
    }
  };

  useEffect(() => {
    if (!token) return;
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      setError("⚠️ Access Denied — Admins Only");
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all([fetchStats(), fetchAllPayments()]).then(() =>
      setLoading(false)
    );

    const interval = setInterval(() => {
      fetchAllPayments();
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading Admin Dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🔐 Admin Dashboard
      </h1>

      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-800">
            {stats.totalPayments || 0}
          </h3>
          <p className="text-gray-600">Total Payments</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-green-800">
            {stats.verified || 0}
          </h3>
          <p className="text-gray-600">Verified</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-yellow-800">
            {stats.pending || 0}
          </h3>
          <p className="text-gray-600">Pending</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-red-800">
            {stats.rejected || 0}
          </h3>
          <p className="text-gray-600">Rejected</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Ticket</th>
              <th className="py-2 px-4 text-left">Payment Info</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">
                    <strong>{p.trainName}</strong>
                    <br />
                    <span className="text-sm text-gray-600">
                      {p.from} → {p.to}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-sm">
                    <div><strong>Txn ID:</strong> {p.paymentDetails?.txnId}</div>
                    <div><strong>Name:</strong> {p.paymentDetails?.payerName}</div>
                    <div><strong>Mobile:</strong> {p.paymentDetails?.payerMobile}</div>
                    <div><strong>Amount:</strong> ₹{p.paymentDetails?.amount}</div>
                  </td>
                  <td className="py-2 px-4">
                    {p.bookedBy?.name || "N/A"} <br />
                    <span className="text-sm text-gray-600">
                      {p.bookedBy?.phone}
                    </span>
                  </td>
                  <td className="py-2 px-4 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        p.paymentStatus === "verified"
                          ? "bg-green-100 text-green-700"
                          : p.paymentStatus === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {p.paymentStatus === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => verifyPayment(p._id, "verified")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >
                          ✅ Verify
                        </button>
                        <button
                          onClick={() => verifyPayment(p._id, "rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;

