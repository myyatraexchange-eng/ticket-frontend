import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TatkalGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow">
      <Helmet>
        <title>Tatkal Ticket Book Kaise Kare? Fast Method + MyYatraExchange Help</title>
        <meta
          name="description"
          content="Tatkal booking fast kaise karein (2025 tips), aur agar tatkal fail ho jaye to MyYatraExchange se confirm ticket kaise milega."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Tatkal Ticket Book Kaise Kare? Fast Method + MyYatraExchange Help",
            "author": "MyYatraExchange",
            "description": "Tatkal booking fast method aur alternatives."
          })}
        </script>
      </Helmet>

      <h1 className="text-3xl font-bold text-blue-700 mb-4">⚡ Tatkal Ticket Book Kaise Kare? (2025 Fast Method)</h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        Tatkal booking stressful hoti hai. Yaha fastest, legal aur practical steps diye gaye hain — aur agar tatkal fail ho jaye to MyYatraExchange ka alternative use karein.
      </p>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">Fast Tips for Tatkal</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Passenger details pehle se saved rakhein</li>
        <li>Auto-fill tool use karein (legal)</li>
        <li>Payment method fast rakhein (UPI recommended)</li>
        <li>9:58–9:59 AM se ready rahein</li>
      </ul>

      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg mb-6">
        <p className="font-semibold">Agar Tatkal fail ho jaye:</p>
        <p className="text-gray-700">Check MyYatraExchange <Link to="/find" className="text-blue-600 underline">Find</Link> page — often confirmed tickets posted by users are available.</p>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">Agar aapke paas extra Tatkal seat hai to <Link to="/post" className="text-green-700 underline">Post</Link> kar dein — buyer immediately mil sakta hai aur cancellation loss avoid hota hai.</p>
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <Link to="/" className="mr-4 text-blue-600 underline">Home</Link>
        <Link to="/find" className="mr-4 text-blue-600 underline">Find Ticket</Link>
        <Link to="/post" className="text-blue-600 underline">Post Ticket</Link>
      </div>
    </div>
  );
}

