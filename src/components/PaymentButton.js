// src/components/PaymentButton.js
import { useState } from "react";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

function PaymentButton({ token, amount = 500 }) {
  const [loading, setLoading] = useState(false);

  const safeParseJson = async (res) => {
    const text = await res.text();
    const trimmed = text.trim();
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error("Non-JSON response: " + trimmed.slice(0,200));
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : undefined },
        body: JSON.stringify({ buyerName: "User", amount }),
      });
      if (!res.ok) {
        const body = await safeParseJson(res).catch(() => ({ error: "Unknown response" }));
        throw new Error(body.error || "Failed to create order");
      }
      const data = await safeParseJson(res);
      if (data.upiLink) window.location.href = data.upiLink;
      else alert("UPI link missing from server.");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
}

export default PaymentButton;

