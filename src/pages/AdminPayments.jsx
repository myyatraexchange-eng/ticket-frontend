import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const adminName = "Admin"; // replace with login if available

  const fetchPayments = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/payments/pending`);
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data.proofs || []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPayments(); }, []);

  const verifyPayment = async (proofId) => {
    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method:"POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ proofId, adminName })
      });
      if (!res.ok) throw new Error("Verify failed");
      await fetchPayments();
    } catch(err){ alert(err.message || "Error"); }
  };

  return (
    <div className="container mx-auto p-

