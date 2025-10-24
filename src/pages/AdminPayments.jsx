import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;
const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/admin/pending-payments`, {
        headers: {
          "x-admin-token": ADMIN_TOKEN,
        },
      });
      const data = await res.json();
      if (data.success) setPayments(data.payments);
      else alert(data.message || "Failed to fetch payments");
    } catch (err) {
      console.error(err);
      alert("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Approve or Reject a payment
  const handleAction = async (id, action) => {
    const notes = prompt(`Add admin notes for ${action}:`, "");
    try {
      const res = await fetch(`${API_BASE}/admin/verify-payment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": ADMIN_TOKEN,
        },
        body: JSON.stringify({ action, adminNotes: notes }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Payment ${action}ed successfully`);
        fetchPayments(); // refresh list
      } else {
        alert(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Payments</h2>
      {payments.length === 0 ? (
        <p>No pending payments.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Ticket</th>
              <th className="border px-2 py-1">User</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td className="border px-2 py-1">{p.ticketId?.title || "N/A"}</td>
                <td className="border px-2 py-1">{p.submittedBy?.name || "N/A"}</td>
                <td className="border px-2 py-1">{p.amount}</td>
                <td className="border px-2 py-1">{p.status}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAction(p._id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAction(p._id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPayments;

