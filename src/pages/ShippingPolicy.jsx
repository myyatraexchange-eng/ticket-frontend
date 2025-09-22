// src/pages/ShippingPolicy.jsx
import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

      <p className="mb-4">
        This document includes your business details and context of details we can pre-fill which you can edit and use for reference.
      </p>

      <p className="mb-4">
        MyYatraExchange.com is a ticket sharing platform. We do not sell or ship any physical products. 
        All bookings and ticket transfers are done digitally through our platform.
      </p>

      <p className="mb-4">
        Delivery of your service (ticket transfer confirmation) will be done via email to the address specified at the time of registration.
      </p>

      <p className="mb-4">
        Since no physical shipment is involved, shipping charges are not applicable. 
        For any cancellations or refunds, please refer to our <strong>Refund Policy</strong>.
      </p>
    </div>
  );
};

export default ShippingPolicy;

