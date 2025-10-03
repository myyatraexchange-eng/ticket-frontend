import React from "react";
import Footer from "../components/Footer";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Disclaimer
      </header>

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
        <p className="mb-2">
          MyYatraExchange.com is an independent platform connecting travelers. 
          We are not affiliated with IRCTC or Indian Railways.
        </p>
        <p>
          All tickets, train names, and numbers belong to Indian Railways and are used for identification only.
        </p>
        <p>
          Users are responsible for verifying all ticket details before traveling.
        </p>
      </main>

      <Footer />
    </div>
  );
}

