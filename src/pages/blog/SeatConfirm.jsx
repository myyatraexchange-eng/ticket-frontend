import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function SeatConfirm() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">

      {/* ⭐ SEO TITLES + META TAGS */}
      <Helmet>
        <title>IRCTC Ticket Confirm Kaise Kare? – MyYatraExchange Special Tricks</title>
        <meta
          name="description"
          content="Train ticket confirm nahi ho raha? MyYatraExchange ka smart ticket exchange system use karke confirm seat paana 3x easy ho jata hai. Find, Post & smart tips yaha padhe."
        />

        {/* ⭐ SCHEMA BOOSTER */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "IRCTC Ticket Confirm Kaise Kare? – MyYatraExchange Special Tricks",
            "author": "MyYatraExchange",
            "publisher": {
              "@type": "Organization",
              "name": "MyYatraExchange"
            },
            "description":
              "MyYatraExchange ka smart ticket exchange system use karke confirm seat paana 3x easy ho jata hai.",
            "url": "https://myyatraexchange.com/blog/seat-confirm"
          })}
        </script>
      </Helmet>

      {/* ⭐ TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-5 text-blue-700">
        IRCTC Ticket Confirm Kaise Kare? (MyYatraExchange Special Tricks)
      </h1>

      {/* ⭐ INTRO */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Train journey plan hoti hai par <strong>ticket confirm nahi hota</strong> — sabse badi problem!
        <br /><br />
        Lekin agar aap <strong className="text-green-700">MyYatraExchange.com</strong> ka smart use karein,
        to confirm ticket milna <strong>3x easy</strong> ho jata hai.
      </p>

      {/* ⭐ SECTION 1 */}
      <h2 className="text-2xl font-semibold text-green-700 mb-3">
        🔥 1. MyYatraExchange पर Confirm सीट कैसे मिले?
      </h2>

      <p className="text-gray-800 mb-4">
        <strong>✔ Step 1 — “Find Ticket” Page Use Karein</strong><br />
        Aapke route par kisi traveller ne apna ticket post kiya ho to aap directly
        <strong> confirm ticket</strong> book kar sakte hain.
      </p>

      {/* CTA Box */}
      <div className="p-4 bg-blue-50 border rounded-xl mb-6">
        <p className="font-semibold text-gray-800 mb-2">👉 Confirm Ticket Chahiye?</p>
        <Link
          to="/find"
          className="text-blue-600 font-bold underline"
        >
          https://myyatraexchange.com/find
        </Link>
      </div>

      {/* ⭐ SECTION 2 */}
      <h2 className="text-2xl font-semibold text-green-700 mb-3">
        🔥 2. Tatkal Book नहीं हुआ?
      </h2>

      <p className="text-gray-800 mb-3">
        Koi baat nahi — MyYatraExchange me log <strong>unused / cancel hone wale tickets</strong> post karte hain.
      </p>

      <p className="text-gray-800 mb-4">
        ✔ <strong>“Post & Find System”</strong> आपकी मदद करता है:
      </p>

      <ul className="list-disc ml-6 text-gray-800 mb-6">
        <li>Kisi ne ticket cancel kiya → Aapko confirm ticket ka chance milta hai</li>
        <li>Kisi ka plan change hua → Aap uska confirm ticket le sakte ho</li>
      </ul>

      {/* ⭐ SECTION 3 */}
      <h2 className="text-2xl font-semibold text-green-700 mb-3">
        🔥 3. Why MyYatraExchange helps in confirmation?
      </h2>

      <ul className="list-disc ml-6 text-gray-800 mb-6">
        <li>24×7 ticket exchange platform</li>
        <li>Real users – real tickets</li>
        <li>Passenger-to-passenger ticket availability</li>
      </ul>

      {/* ⭐ Conclusion */}
      <h2 className="text-2xl font-semibold text-green-700 mb-3">
        ⭐ Conclusion
      </h2>

      <p className="text-gray-800 leading-relaxed mb-6">
        Agar aap <strong>confirm seat</strong> chahte ho →  
        <strong className="text-blue-700"> Find page par apna route search karein</strong>.
        <br /><br />
        Agar aapka <strong>ticket waste ja raha hai</strong> →  
        <strong className="text-green-700"> Post page par ticket post karein aur paise bachayein</strong>.
        <br /><br />
        Agar aap <strong>travel plan explore</strong> karna chahte ho →  
        <strong className="text-orange-700"> Home page visit karein</strong>.
      </p>

      {/* ⭐ IMPORTANT LINKS */}
      <div className="p-5 bg-yellow-50 border rounded-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">🔗 Highlighted Links</h3>

        <p className="mb-2">
          ✔ Home:{" "}
          <Link to="/" className="text-blue-600 underline">
            https://myyatraexchange.com/
          </Link>
        </p>

        <p className="mb-2">
          ✔ Find Ticket:{" "}
          <Link to="/find" className="text-blue-600 underline">
            https://myyatraexchange.com/find
          </Link>
        </p>

        <p className="mb-2">
          ✔ Post Ticket:{" "}
          <Link to="/post" className="text-blue-600 underline">
            https://myyatraexchange.com/post
          </Link>
        </p>
      </div>
    </div>
  );
}

