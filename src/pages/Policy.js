// src/pages/Policy.jsx
import React from "react";

const Policy = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6 text-center">Policy</h1>

      <p className="mb-4">
        Welcome to MyYatraExchange.com. This page outlines the rules and policies governing the use of our platform.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">1. Purpose</h2>
      <p className="mb-4">
        Our platform is designed to connect travelers for unused train tickets. We do not sell, resell, or modify train tickets in any way.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">2. User Responsibilities</h2>
      <p className="mb-4">
        Users are responsible for verifying the information shared on our platform. MyYatraExchange.com is not liable for any transaction or misuse.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">3. Unlock Fee</h2>
      <p className="mb-4">
        A nominal ₹20 unlock fee is charged to view contact details of ticket holders. This fee is non-refundable.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">4. Legal Compliance</h2>
      <p className="mb-4">
        All ticket bookings and refunds are governed by Indian Railways rules. MyYatraExchange.com only facilitates connections between travelers.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">5. Contact</h2>
      <p>Email: <strong>myyatraexchange@gmail.com</strong></p>
      <p>Location: <strong>Indore, India</strong></p>
    </div>
  );
};

export default Policy;

