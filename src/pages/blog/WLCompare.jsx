import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WLCompare() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow">
      <Helmet>
        <title>GNWL vs PQWL vs RLWL – Kaunsa Confirm Hota Hai? – MyYatraExchange</title>
        <meta
          name="description"
          content="GNWL, PQWL, RLWL ka matlab aur confirmation chances. Kaunse WL ki probability high hai — simple guide + MyYatraExchange tips."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "GNWL vs PQWL vs RLWL – Kaunsa Confirm Hota Hai?",
            "author": "MyYatraExchange",
            "description": "GNWL, PQWL, RLWL ka matlab aur confirmation chances."
          })}
        </script>
      </Helmet>

      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        📊 GNWL vs PQWL vs RLWL – Kaunsa Confirm Hota Hai? (2025)
      </h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        Waiting list ke alag-alag codes hotey hain — har code ka confirmation chance alag hota hai.
        Yaha simple summary aur practical advice di gayi hai.
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-green-700">🔵 GNWL (General Waiting List)</h2>
          <p className="text-gray-700">Sabse zyada confirmation chance — 70–90% depending on route & demand. Best choice agar available ho.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-yellow-700">🟠 PQWL (Pooled Quota WL)</h2>
          <p className="text-gray-700">Short-distance & pooled quota — chance moderate. Useful for connecting passengers.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-red-700">🔴 RLWL (Remote Location WL)</h2>
          <p className="text-gray-700">Chhote stations ke liye — confirmation probability lowest.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">⚠️ TQWL (Tatkal Waiting)</h2>
          <p className="text-gray-700">Tatkal waiting — almost no chance. Try alternatives.</p>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg mt-6">
        <p className="font-semibold">Practical Tip:</p>
        <p className="text-gray-700">Agar GNWL ho to probability high — lekin best option MyYatraExchange ke <Link to="/find" className="text-blue-600 underline">Find</Link> page par check karna hai — often confirmed tickets yaha post ho jate hain.</p>
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <Link to="/" className="mr-4 text-blue-600 underline">Home</Link>
        <Link to="/find" className="mr-4 text-blue-600 underline">Find Ticket</Link>
        <Link to="/post" className="text-blue-600 underline">Post Ticket</Link>
      </div>
    </div>
  );
}

