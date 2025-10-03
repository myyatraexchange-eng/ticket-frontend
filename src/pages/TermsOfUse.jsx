import React from "react";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Terms & Conditions
      </header>

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-2">
          All users must provide accurate ticket information and personal details.
        </p>
        <p className="mb-2">
          Contact sharing occurs only after payment verification. MyYatraExchange.com is not responsible for user disputes.
        </p>
        <p>
          Use of this platform constitutes agreement to these terms.
        </p>
      </main>

      <Footer />
    </div>
  );
}

