import React from "react";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Privacy Policy
      </header>

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-2">
          We respect your privacy. Contact information is shared only after payment verification.
        </p>
        <p>
          We do not store unnecessary personal data. All submitted data is used solely for ticket sharing coordination.
        </p>
      </main>

      <Footer />
    </div>
  );
}

