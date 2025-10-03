import React from "react";
import Footer from "../components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Refund Policy
      </header>

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
        <p className="mb-2">
          Payments made for unlocking contact numbers (₹20) are non-refundable.
        </p>
        <p>
          Users are advised to verify ticket and contact details before completing the payment.
        </p>
      </main>

      <Footer />
    </div>
  );
}

