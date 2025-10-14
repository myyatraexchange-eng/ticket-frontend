import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const adminName = "Admin"; // replace with login if available

  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/payments/pending`);
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data.proofs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const verifyPayment = async (proofId) => {
    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proofId, adminName }),
      });
      if (!res.ok) throw new Error("Verify failed");
      await fetchPayments(); // refresh list
    } catch (err) {
      alert(err.message || "Error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Payments</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {payments.length === 0 && !loading && <p>No pending payments</p>}

      <div className="grid gap-4">
        {payments.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <p><strong>Ticket:</strong> {p.ticketNumber}</p>
            <p><strong>Payer:</strong> {p.payerName}</p>
            <p><strong>Mobile:</strong> {p.payerMobile}</p>
            <p><strong>Txn ID:</strong> {p.txnId}</p>
            <p><strong>Amount:</strong> ₹{p.amount}</p>
            <button
              onClick={() => verifyPayment(p._id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Verify
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

