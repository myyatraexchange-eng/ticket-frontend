import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function PNRGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow">
      <Helmet>
        <title>PNR Status Check Kaise Kare? Smart Guide 2025 – MyYatraExchange</title>
        <meta
          name="description"
          content="PNR status ka full guide — kaise check kare, kya dekhe aur agar waiting ya RAC ho to kya karna chahiye. MyYatraExchange solutions included."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "PNR Status Check Kaise Kare? Smart Guide 2025",
            "author": "MyYatraExchange",
            "description": "PNR status check ka full guide aur actions."
          })}
        </script>
      </Helmet>

      <h1 className="text-3xl font-bold text-blue-700 mb-4">🔎 PNR Status Check Kaise Kare? (Smart Guide 2025)</h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        PNR check karna simple hai — lekin result ko sahi tarike se samajhna aur action lena important hai.
        Yaha step-by-step bataya gaya hai.
      </p>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">✅ PNR me kya dekhein?</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Current status (WL / RAC / CNF)</li>
        <li>Coach & berth details</li>
        <li>Chart prepared status</li>
        <li>Passenger details</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">📲 PNR kaise check karein?</h2>
      <ol className="list-decimal pl-6 mb-4 text-gray-700">
        <li>IRCTC website / app</li>
        <li>NTES / Indian Railways tools</li>
        <li>MyYatraExchange — integrated tools (coming soon)</li>
      </ol>

      <div className="bg-yellow-50 border rounded-lg p-4 mb-6">
        <p className="font-semibold">Agar PNR WL ya RAC hai — kya karein?</p>
        <p className="text-gray-700">Check MyYatraExchange <Link to="/find" className="text-blue-600 underline">Find</Link> page for confirmed seats, or Post your ticket on <Link to="/post" className="text-green-600 underline">Post</Link> to recover money.</p>
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <Link to="/" className="mr-4 text-blue-600 underline">Home</Link>
        <Link to="/find" className="mr-4 text-blue-600 underline">Find Ticket</Link>
        <Link to="/post" className="text-blue-600 underline">Post Ticket</Link>
      </div>
    </div>
  );
}

