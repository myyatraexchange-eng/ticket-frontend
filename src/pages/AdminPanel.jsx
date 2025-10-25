import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdminPaymentPanel() {
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const fetchProofs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/payments/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch proofs");
      setProofs(data.proofs || []);
    } catch (err) {
      setError(err.message || "Failed to fetch proofs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProofs();
    const interval = setInterval(fetchProofs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (proofId, action) => {
    if (!window.confirm(`Are you sure to ${action} this payment?`)) return;
    setProcessingId(proofId);
    try {
      const res = await fetch(`${API_BASE}/payments/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ proofId, action, adminName: "Admin" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Action failed");
      fetchProofs();
    } catch (err) {
      alert(err.message || "Failed to process action");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 uppercase">
        💳 Payment Proof Verification
      </h1>

      {loading && <p>Loading proofs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {proofs.length === 0 && !loading && <p>No pending proofs</p>}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {proofs.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow-md bg-white">
            <h2 className="font-semibold text-blue-700 mb-1 uppercase">
              Ticket: {p.ticketId?.trainName || "N/A"} ({p.ticketId?.trainNumber || "N/A"})
            </h2>
            <p>
              <span className="font-semibold">Txn ID:</span> {p.txnId}
            </p>
            <p>
              <span className="font-semibold">Payer Name:</span> {p.payerName}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {p.payerMobile}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> ₹{p.amount}
            </p>
            <p>
              <span className="font-semibold">Submitted By:</span> {p.submittedBy?.name || "N/A"}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={
                  p.status === "pending"
                    ? "text-orange-600"
                    : p.status === "verified"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {p.status.toUpperCase()}
              </span>
            </p>

            {p.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAction(p._id, "verify")}
                  disabled={processingId === p._id}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleAction(p._id, "reject")}
                  disabled={processingId === p._id}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
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

