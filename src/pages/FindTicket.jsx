import React, { useEffect, useState } from "react";

function FindTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create Order for UPI
  const handlePayment = async (ticket) => {
    setError("");
    setUnlocking(true);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: "Demo User", // TODO: Replace with logged-in user
          amount: ticket.price,
        }),
      });

      const order = await res.json();
      if (!order || !order.orderId) {
        setError("Order creation failed!");
        return;
      }

      // Show QR + link
      setSelectedOrder({ ...order, ticketId: ticket._id });
    } catch (err) {
      console.error(err);
      setError("Payment failed to start");
    } finally {
      setUnlocking(false);
    }
  };

  // ✅ Submit payment proof
  const handleSubmitProof = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/payment/submit-payment-proof", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.ok) {
        alert("Payment proof submitted! Wait for admin verification.");

        // Optional: update ticket state to show that proof is submitted
        setTickets((prev) =>
          prev.map((t) =>
            t._id === selectedOrder.ticketId
              ? { ...t, contactUnlocked: false, proofSubmitted: true }
              : t
          )
        );

        setSelectedOrder(null);
      } else {
        alert(data.error || "Failed to submit proof");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting proof");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Tickets</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border rounded p-4 flex flex-col gap-2"
          >
            <p>
              <strong>{ticket.title}</strong>
            </p>
            <p>Price: ₹{ticket.price}</p>
            {ticket.contactUnlocked ? (
              <p>Contact: {ticket.contactNumber}</p>
            ) : ticket.proofSubmitted ? (
              <p className="text-orange-600 font-medium">
                Payment proof submitted, waiting for admin verification
              </p>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handlePayment(ticket)}
                disabled={unlocking}
              >
                {unlocking ? "Processing..." : "Pay to Unlock Contact"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Show UPI QR + Proof Form */}
      {selectedOrder && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">
            Complete Payment for Order {selectedOrder.orderId}
          </h3>
          <p>Amount: ₹{selectedOrder.amount}</p>
          <p>Buyer: {selectedOrder.buyerName}</p>

          <div className="mt-3">
            <p className="mb-1">Scan QR to Pay:</p>
            <img
              src={selectedOrder.qrUrl}
              alt="UPI QR"
              className="w-48 h-48 border"
            />
            <p className="mt-2">
              Or click this link:{" "}
              <a
                href={selectedOrder.upiLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Pay via UPI App
              </a>
            </p>
          </div>

          <form
            onSubmit={handleSubmitProof}
            className="mt-4 flex flex-col gap-2"
          >
            <input type="hidden" name="orderId" value={selectedOrder.orderId} />
            <input type="hidden" name="ticketId" value={selectedOrder.ticketId} />

            <label>
              UTR Number:
              <input
                type="text"
                name="utr"
                required
                className="border p-2 w-full"
              />
            </label>

            <label>
              Sender VPA:
              <input
                type="text"
                name="senderVpa"
                placeholder="your@upi"
                className="border p-2 w-full"
              />
            </label>

            <label>
              Screenshot:
              <input type="file" name="file" accept="image/*" />
            </label>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit Payment Proof
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FindTicket;

