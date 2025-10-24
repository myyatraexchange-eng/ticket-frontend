// src/pages/AdminPayments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({}); // to track approve/reject per payment
  const [error, setError] = useState(null);

  // Fetch pending payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/admin/pending-payments`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setPayments(res.data.payments || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Approve or Reject payment
  const handleAction = async (id, action) => {
    try {
      setActionLoading((prev) => ({ ...prev, [id]: true }));
      await axios.post(
        `${API_BASE}/admin/verify-payment/${id}`,
        { action },
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      // Refresh list after action
      fetchPayments();
    } catch (err) {
      console.error(`Error ${action} payment:`, err);
      alert(`Failed to ${action} payment`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div className="p-4">Loading payments...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (payments.length === 0)
    return <div className="p-4">No pending payments found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Payments</h2>
      <div className="space-y-4">
        {payments.map((p) => (
          <div
            key={p._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Payer Name:</strong> {p.payerName}
              </p>
              <p>
                <strong>Email:</strong> {p.submittedBy?.email || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> ₹{p.amount}
              </p>
              <p>
                <strong>Ticket:</strong> {p.ticketId?.title || p.ticketId?._id}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAction(p._id, "approve")}
                disabled={actionLoading[p._id]}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(p._id, "reject")}
                disabled={actionLoading[p._id]}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPayments;

