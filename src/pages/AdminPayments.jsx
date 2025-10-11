import React, { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";

const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchPayments = async () => {
      showLoader();
      try {
        const res = await fetch(`${API_BASE}/admin/payments`, {
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setPayments(data.payments || []);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setPayments([]);
      } finally {
        hideLoader();
      }
    };
    fetchPayments();
  }, [showLoader, hideLoader]);

  const approvePayment = async (paymentId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/payments/${paymentId}/approve`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to approve payment");

      setPayments(prev => prev.map(p => p._id === paymentId ? { ...p, verified: true } : p));
      alert("✅ Payment approved and contact unlocked!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 container mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Payments</h2>

      {payments.length === 0 ? <p>No payments found.</p> :
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2 border">Ticket ID</th>
                <th className="px-4 py-2 border">Payer Name</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{p.ticketId}</td>
                  <td className="px-4 py-2 border">{p.payerName}</td>
                  <td className="px-4 py-2 border">{p.payerMobile}</td>
                  <td className="px-4 py-2 border">₹{p.amount}</td>
                  <td className="px-4 py-2 border">
                    {p.verified ? "✅ Verified" :
                      <button onClick={() => approvePayment(p._id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm">
                        Approve Payment
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default AdminPayments;

