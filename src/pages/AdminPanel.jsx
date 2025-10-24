// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";

export default function AdminPanel() {
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // admin token

  const fetchProofs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/payments/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProofs(res.data.proofs || []);
    } catch (err) {
      console.error("FetchProofsError:", err);
      alert("Failed to fetch payment proofs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProofs();
  }, []);

  const handleAction = async (proofId, action) => {
    if (!["verify", "reject"].includes(action)) return;

    try {
      const res = await axios.post(
        `${API_BASE}/payments/verify`,
        { proofId, action, adminName: "Admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchProofs(); // refresh list
    } catch (err) {
      console.error("VerifyProofError:", err);
      alert("Failed to process action");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500 animate-pulse">Loading proofs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Panel

