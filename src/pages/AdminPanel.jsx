import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_BASE;

const AdminPanel = () => {
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // ✅ ensure only admin can see

  // 🧭 Redirect if not admin
  if (userRole !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">
          ⚠️ Access Denied — Admins Only
        </p>
      </div>
    );
  }

  // ✅ Fetch all orders
  const fetchProofs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/payments/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProofs(res.data.orders || []);
    } catch (err) {
      console.error("❌ AdminProofFetchError:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProofs();
  }, []);

  // ✅ Verify Payment (auto unlock contact)
  const handleVerify = async (ticketId, proofId) => {
    if (!window.confirm("Verify this payment?")) return;
    try {
      // 1️⃣ Unlock & verify ticket
      await axios.post(
        `${API}/tickets/admin/verify-payment/${ticketId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ Update payment status in proof collection
      await axios.put(
        `${API}/payments/update-status/${proofId}`,
        { status: "verified" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Payment verified & contact unlocked successfully!");
      fetchProofs(); // 🔄 auto refresh list
    } catch (err) {
      console.error("❌ VerifyPaymentError:", err);
      alert("Error verifying payment");
    }
  };

  // ❌ Reject Payment
  const handleReject = async (ticketId, proofId) => {
    if (!window.confirm("Reject this payment?")) return;
    try {
      await axios.put(
        `${API}/payments/update-status/${proofId}`,
        { status: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.put(
        `${API}/payments/reopen-ticket/${ticketId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("❌ Payment rejected — Ticket made available again");
      fetchProofs();
    } catch (err) {
      console.error("RejectPaymentError:", err);
      alert("Error rejecting payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            💳 Payment Proof Verification
          </h1>
          <button
            onClick={fetchProofs}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading pending proofs...</p>
        ) : proofs.length === 0 ? (
          <p className="text-gray-500">No pending proofs found.</p>
        ) : (
          <div className="space-y-4">
            {proofs.map((p) => (
              <div
                key={p._id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">
                    🎟️ Train: {p.trainName || "N/A"} ({p.trainNumber})
                  </p>
                  <p className="text-gray-700">
                    From: <b>{p.from}</b> → To: <b>{p.to}</b>
                  </p>
                  <p className="text-gray-600">
                    Txn ID: <b>{p.paymentDetails?.txnId || "N/A"}</b>
                  </p>
                  <p className="text-gray-600">
                    Payer: {p.paymentDetails?.payerName} (
                    {p.paymentDetails?.payerMobile})
                  </p>
                  <p className="text-gray-600">
                    Amount: ₹{p.paymentDetails?.amount}
                  </p>
                  <p className="text-gray-600">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        p.paymentStatus === "pending"
                          ? "text-yellow-600"
                          : p.paymentStatus === "verified"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {p.paymentStatus}
                    </span>
                  </p>
                  {p.paymentDetails?.screenshotUrl && (
                    <a
                      href={p.paymentDetails.screenshotUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline mt-1 inline-block"
                    >
                      🖼️ View Screenshot
                    </a>
                  )}
                </div>

                <div className="flex gap-3 mt-3 md:mt-0">
                  <button
                    onClick={() => handleVerify(p._id, p._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    ✅ Verify
                  </button>
                  <button
                    onClick={() => handleReject(p._id, p._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    ❌ Reject
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

