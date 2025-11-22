import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ChartTime() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow">
      <Helmet>
        <title>Chart Preparation Time – Train Ka Chart Kab Banta Hai? – MyYatraExchange</title>
        <meta
          name="description"
          content="Chart kab banta hai, chart banne ke baad kya hota hai aur last-minute opportunities — MyYatraExchange guide."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Chart Preparation Time – Train Ka Chart Kab Banta Hai?",
            "author": "MyYatraExchange",
            "description": "Chart kab banta hai aur uske baad kya actions lene chahiye."
          })}
        </script>
      </Helmet>

      <h1 className="text-3xl font-bold text-blue-700 mb-4">🕒 Chart Preparation Time – Train Ka Chart Kab Banta Hai?</h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        Chart banne ke baad waiting tickets confirm nahi hote — isliye chart time jana zaroori hai.
        Yaha common patterns aur tips diye gaye hain.
      </p>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">Common Chart Times</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Most trains: Journey se ~4 hours before</li>
        <li>Early morning trains: previous night (8–11 PM)</li>
        <li>Some premium trains: dynamic multiple chart updates</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">Chart ke baad kya hota hai?</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>WL conversion stop ho sakta hai</li>
        <li>Confirmed tickets ka re-allocation hota hai</li>
        <li>Last-minute posted tickets milne ki probability badh jati hai</li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-6">
        <p className="font-semibold">Tip:</p>
        <p className="text-gray-700">Chart ke baad agar aapko confirm ticket chahiye to <Link to="/find" className="text-blue-600 underline">Find</Link> page par check karein — users last minute tickets post kar dete hain.</p>
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <Link to="/" className="mr-4 text-blue-600 underline">Home</Link>
        <Link to="/find" className="mr-4 text-blue-600 underline">Find Ticket</Link>
        <Link to="/post" className="text-blue-600 underline">Post Ticket</Link>
      </div>
    </div>
  );
}

