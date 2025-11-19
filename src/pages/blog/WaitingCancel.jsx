import React from "react";

export default function WaitingCancel() {
  return (
    <div className="blog-container">
      <h1>Waiting Ticket Cancel Kaise Kare? Refund Kitna Milega?</h1>

      <h2>1. Waiting Ticket Cancel Rules</h2>
      <p>Chart se pehle cancel karne par refund milta hai.</p>

      <h2>2. Online Cancel Process</h2>
      <p>IRCTC → My Booking → Cancel Ticket.</p>

      <h2>3. Refund Kitna Milega?</h2>
      <ul>
        <li>WL → Full refund</li>
        <li>RAC → Partial refund</li>
      </ul>

      <h2>4. Alternative</h2>
      <p>
        Urgent travel hai to exchange system try karo:{" "}
        <a href="/">MyYatra Exchange – Instant Ticket</a>
      </p>
    </div>
  );
}

