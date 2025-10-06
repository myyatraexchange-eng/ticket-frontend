// src/pages/AdminPayments.jsx
import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";
const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN || "change-me-secret";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch pending payments
  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/payments/pending`, {
        headers: {
          "x-admin-token": ADMIN_TOKEN
        }
      });
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data.proofs || []);
    } catch (err) {
      setError(err.message || "Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Verify or reject payment
  const verifyPayment = async (proofId, action) => {
    if (!["approve", "reject"].includes(action)) return;
    try {
      const res = await fetch(`${API_BASE}/admin/payments/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": ADMIN_TOKEN
        },
        body: JSON.stringify({ proofId, action })
      });
      if (!res.ok) throw new Error("Verification failed");
      await fetchPayments();
    } catch (err) {
      alert(err.message || "Error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin: Pending Payments</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {payments.length === 0 && !loading && <p>No pending payments</p>}

      <div className="grid gap-4">
        {payments.map(payment => (
          <div key={payment._id} className="border rounded p-4 shadow-md flex flex-col gap-2">
            <p><span className="font-semibold">Ticket ID:</span> {payment.ticketId}</p>
            <p><span className="font-semibold">Transaction ID:</span> {payment.txnId}</p>
            <p><span className="font-semibold">Payer Name:</span> {payment.payerName}</p>
            <p><span className="font-semibold">Mobile:</span> {payment.payerMobile}</p>
            <p><span className="font-semibold">Amount:</span> ₹{payment.amount}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => verifyPayment(payment._id, "approve")} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Approve</button>
              <button onClick={() => verifyPayment(payment._id, "reject")} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

