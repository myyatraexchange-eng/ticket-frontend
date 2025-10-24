import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://ticket-backend-g5da.onrender.com/api/admin";
const ADMIN_TOKEN = "myyatraexchange_admin_786"; // same as process.env.ADMIN_TOKEN in backend

export default function AdminPanel() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all pending payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/pending-payments`, {
        headers: { "x-admin-token": ADMIN_TOKEN },
      });
      setPayments(res.data.payments || []);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch pending payments");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve or Reject
  const handleVerify = async (id, action) => {
    try {
      await axios.post(
        `${API_BASE}/verify-payment/${id}`,
        { action },
        { headers: { "x-admin-token": ADMIN_TOKEN } }
      );
      alert(`Payment ${action}ed successfully`);
      fetchPayments(); // refresh list
    } catch (err) {
      console.error("Verify error:", err);
      alert("Error verifying payment");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧾 Admin Panel - Pending Payments</h2>
      {loading ? (
        <p>Loading pending payments...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : payments.length === 0 ? (
        <p>No pending payments.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>Train</th>
              <th>From → To</th>
              <th>Txn ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{p.payerName}</td>
                <td>{p.ticketId?.trainName}</td>
                <td>
                  {p.ticketId?.from} → {p.ticketId?.to}
                </td>
                <td>{p.txnId}</td>
                <td>₹{p.amount}</td>
                <td>{p.status}</td>
                <td>
                  <button
                    onClick={() => handleVerify(p._id, "approve")}
                    style={{ backgroundColor: "green", color: "white", marginRight: "8px" }}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleVerify(p._id, "reject")}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

