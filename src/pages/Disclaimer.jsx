// src/pages/Disclaimer.jsx
import React from "react";

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6 text-center">Disclaimer</h1>

      <p className="mb-4">
        MyYatraExchange.com is an independent platform to connect travelers. We do not sell, resell, modify, or cancel train tickets.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">1. Information Accuracy</h2>
      <p className="mb-4">
        All information is provided by users voluntarily. MyYatraExchange.com is not responsible for any errors or discrepancies in the information shared.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">2. No Affiliation with IRCTC</h2>
      <p className="mb-4">
        We are not affiliated, endorsed, or connected with Indian Railways or IRCTC. All train names and numbers belong to Indian Railways.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">3. Unlock Fee</h2>
      <p className="mb-4">
        ₹20 unlock fee is charged for viewing contact numbers. This fee is non-refundable and does not involve any ticket transaction.
      </p>

      <h2 className="text-2xl font-semibold mb-3 mt-6">4. Contact</h2>
      <p>Email: <strong>myyatraexchange@gmail.com</strong></p>
      <p>Location: <strong>Indore, India</strong></p>
    </div>
  );
};

export default Disclaimer;

