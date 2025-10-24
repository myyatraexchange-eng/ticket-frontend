import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdminPayments() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/profile");
      return;
    }
    fetchProofs();
  }, [user]);

  const fetchProofs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/payments/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProofs(res.data.proofs || []);
    } catch (err) {
      console.error("FetchProofsError:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (proofId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this payment?`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE}/payments/admin/verify`,
        { proofId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProofs(); // refresh list
    } catch (err) {
      console.error("ActionError:", err);
      alert("Failed to process action.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Payment Verification</h2>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mb-4"
        >
          Logout
        </button>

        {loading && <p>Loading...</p>}

        {proofs.length === 0 ? (
          <p>No pending payment proofs.</p>
        ) : (
          <ul className="space-y-3">
            {proofs.map((p) => (
              <li
                key={p._id}
                className="border rounded-lg p-3 bg-gray-50 flex flex-col md:flex-row justify-between items-center"
              >
                <div>
                  <p>
                    <strong>{p.payerName}</strong> | {p.payerMobile} | ₹{p.amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ticket ID: {p.ticketId} | Status: {p.status}
                  </p>
                </div>
                {p.status === "pending" && (
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleAction(p._id, "verify")}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleAction(p._id, "reject")}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
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

