import React from "react";
import Footer from "../components/Footer";

export default function Policy() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        MyYatraExchange.com - Policy
      </header>

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Policy</h1>
        <p className="mb-2">
          We connect travelers with unused tickets. MyYatraExchange.com does not sell, issue, or modify tickets.
          All coordination and exchanges are user-to-user. 
        </p>
        <p>
          By using this website, you agree to follow safe practices and share accurate information.
        </p>
      </main>

      <Footer />
    </div>
  );
}

