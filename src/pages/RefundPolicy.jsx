// src/pages/RefundPolicy.jsx
import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>

      <p className="mb-4">
        Welcome to MyYatraExchange.com. This page explains our refund policy for the services provided on our platform.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">1. Purpose</h2>
      <p className="mb-4">
        This page informs users about the refund policy for the ₹20 unlock fee charged to view the contact number of the ticket holder or to connect travelers.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">2. Refund Process</h2>
      <p className="mb-4">
        Our platform does not handle ticket bookings or payments to Indian Railways. The ₹20 unlock fee collected on our website is solely for connecting travelers and is <strong>non-refundable</strong>.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">3. Ticket Booking Refunds</h2>
      <p className="mb-4">
        All ticket bookings and cancellations are handled by Indian Railways (IRCTC) and are subject to their rules. MyYatraExchange.com is not responsible for any refunds related to train tickets themselves.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">4. Legal Responsibility</h2>
      <p className="mb-4">
        By using our services, you acknowledge that the ₹20 unlock fee is for information sharing only and will not be refunded under any circumstances. All ticket-related financial matters are under the jurisdiction of Indian Railways rules.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">5. Contact Us</h2>
      <p className="mb-4">
        If you have any questions regarding the refund policy or our services, please contact us at:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Email: <strong>myyatraexchange@gmail.com</strong></li>
        <li>Location: <strong>Indore, India</strong></li>
      </ul>

      <p className="mt-6 text-sm text-gray-600">
        Note: This Refund Policy applies only to the unlock fee for connecting travelers. All ticket bookings, cancellations, and refunds are managed by Indian Railways and are independent of MyYatraExchange.com.
      </p>
    </div>
  );
};

export default RefundPolicy;

