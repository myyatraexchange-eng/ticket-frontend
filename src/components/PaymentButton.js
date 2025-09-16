import { useState } from "react";

function PaymentButton({ token }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // ✅ Backend से order create
      const res = await fetch("https://ticket-backend-g5da.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // user ka JWT token
        },
        body: JSON.stringify({ amount: 500 }), // example ₹500
      });

      const order = await res.json();

      if (!order || !order.id) {
        alert("Order create failed!");
        return;
      }

      // ✅ Razorpay Checkout open
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // frontend .env se
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async function (response) {
          // ✅ Payment verify
          const verifyRes = await fetch("https://ticket-backend-g5da.onrender.com/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...response,
              ticketId: "TICKET_ID_YAHAN_DALO", // ✅ jis ticket ka contact unlock karna hai uska id
            }),
          });

          const result = await verifyRes.json();
          alert(result.message || "Payment verified!");
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay ₹500"}
    </button>
  );
}

export default PaymentButton;

