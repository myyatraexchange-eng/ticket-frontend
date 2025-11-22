import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function RACGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 text-gray-800 bg-white rounded-xl shadow">
      <Helmet>
        <title>RAC Ticket Kya Hota Hai? Confirm Hoga Ya Nahi? – MyYatraExchange</title>
        <meta
          name="description"
          content="RAC ticket ka matlab, confirmation chances aur MyYatraExchange par RAC users ke liye best solutions. Find & Post ke through loss bachayein."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "RAC Ticket Kya Hota Hai? Confirm Hoga Ya Nahi?",
            "author": "MyYatraExchange",
            "description":
              "RAC ticket ka matlab, confirmation chances aur MyYatraExchange par RAC users ke liye best solutions."
          })}
        </script>
      </Helmet>

      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        🚆 RAC Ticket Kya Hota Hai? Confirm Hoga Ya Nahi? (Full Guide)
      </h1>

      <p className="mb-4 leading-relaxed">
        Jab booking me **RAC (Reservation Against Cancellation)** aata hai to travellers tension me aa jate hain.
        Simple bhasha me: <strong>RAC = Seat guaranteed but full berth nahi</strong>. Do passengers ek berth share karte hain.
      </p>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">✅ RAC ka matlab aur features</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Seat allotment hoti hai (sitting), full berth nahi milta</li>
        <li>Chart prepare hone par RAC convert ho sakta hai</li>
        <li>RAC me travel allowed hota hai — aap journey kar sakte hain</li>
      </ul>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">🔁 RAC Confirm Kab Hota Hai?</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Waiting list cancellations badhne par</li>
        <li>Quota release hone par</li>
        <li>Chart prepare hone ke time par berths allocate hote hain</li>
      </ul>

      <div className="p-4 bg-yellow-50 border rounded-lg mb-6">
        <p className="font-semibold mb-2">👉 Practical Tip</p>
        <p className="text-gray-700">
          Agar aapko **RAC** mila hai aur aapko full berth chahiye to <strong>MyYatraExchange</strong> pe check karein —
          real users kabhi-kabhi confirm ticket post kar dete hain.
        </p>

        <div className="mt-3 flex gap-3">
          <Link to="/find" className="bg-blue-600 text-white px-4 py-2 rounded">🔍 Find Ticket</Link>
          <Link to="/post" className="bg-green-600 text-white px-4 py-2 rounded">📤 Post Ticket</Link>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-green-700 mt-4 mb-2">🔚 Conclusion</h2>
      <p className="text-gray-700 mb-4">
        RAC safe hai lekin guaranteed full berth nahi. Agar solution chahiye to <Link to="/find" className="text-blue-600 underline">Find</Link> karein
        ya agar ticket waste ho raha ho to <Link to="/post" className="text-green-600 underline">Post</Link> karke loss avoid karein.
      </p>

      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        <Link to="/" className="mr-4 text-blue-600 underline">Home</Link>
        <Link to="/find" className="mr-4 text-blue-600 underline">Find Ticket</Link>
        <Link to="/post" className="text-blue-600 underline">Post Ticket</Link>
      </div>
    </div>
  );
}

