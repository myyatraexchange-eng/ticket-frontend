import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const AdminPanel = () => {
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch all pending proofs
  const fetchProofs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/payments/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProofs(res.data.orders || []);
    } catch (err) {
      console.error("AdminProofFetchError:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProofs();
  }, []);

  // ✅ Verify Payment
  const handleVerify = async (ticketId, proofId) => {
    if (!window.confirm("Verify this payment?")) return;
    try {
      await axios.post(
        `${API}/api/tickets/admin/verify-payment/${ticketId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await axios.put(
        `${API}/api/payments/update-status/${proofId}`,
        { status: "verified" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Payment verified ✅");
      fetchProofs();
    } catch (err) {
      console.error("VerifyPaymentError:", err);
      alert("Error verifying payment");
    }
  };

  // ❌ Reject Payment — ticket becomes available again
  const handleReject = async (ticketId, proofId) => {
    if (!window.confirm("Reject this payment?")) return;
    try {
      // 1️⃣ Update proof status to rejected
      await axios.put(
        `${API}/api/payments/update-status/${proofId}`,
        { status: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ Mark ticket available again
      await axios.put(
        `${API}/api/payments/reopen-ticket/${ticketId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Payment rejected ❌ — Ticket made available again");
      fetchProofs();
    } catch (err) {
      console.error("RejectPaymentError:", err);
      alert("Error rejecting payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          💳 Payment Proof Verification
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading pending proofs...</p>
        ) : proofs.length === 0 ? (
          <p className="text-gray-500">No pending proofs.</p>
        ) : (
          <div className="space-y-4">
            {proofs.map((p) => (
              <div
                key={p._id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Txn ID: {p.txnId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payer: {p.payerName} ({p.payerMobile})
                  </p>
                  <p className="text-sm text-gray-600">Amount: ₹{p.amount}</p>
                  <p className="text-sm text-gray-600">Ticket ID: {p.ticketId}</p>
                </div>

                <div className="flex gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => handleVerify(p.ticketId, p._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Verify ✅
                  </button>
                  <button
                    onClick={() => handleReject(p.ticketId, p._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Reject ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

