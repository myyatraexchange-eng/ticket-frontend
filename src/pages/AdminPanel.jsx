import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Login required");
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/payments/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          setError("Invalid or expired token");
          setOrders([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setOrders(data.proofs || []);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleAction = async (proofId, action) => {
    if (!window.confirm(`Are you sure to ${action} this payment?`)) return;

    try {
      const res = await fetch(`${API_BASE}/payments/admin/verify/${proofId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action, adminName: "Admin" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      alert(data.message);
      setOrders((prev) =>
        prev.map((o) => (o._id === proofId ? { ...o, status: data.proof.status } : o))
      );
    } catch (err) {
      alert(err.message || "Action failed");
    }
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-700 uppercase mb-6">
        💳 Payment Proof Verification
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      {!loading && orders.length === 0 && !error && (
        <p className="text-center">No pending proofs</p>
      )}

      <div className="grid gap-4">
        {orders.map((proof) => (
          <div
            key={proof._id}
            className="border rounded p-4 shadow bg-white flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Ticket:</strong> {proof.ticketId?.trainName || "N/A"} (
                {proof.ticketId?.trainNumber || "N/A"})
              </p>
              <p>
                <strong>Payer:</strong> {proof.payerName} ({proof.payerMobile})
              </p>
              <p>
                <strong>Amount:</strong> ₹{proof.amount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
              </p>
            </div>
            {proof.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(proof._id, "verify")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleAction(proof._id, "reject")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

