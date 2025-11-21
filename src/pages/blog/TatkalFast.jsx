import React from "react";
import { Link } from "react-router-dom";

const TatkalFast = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        🚀 Tatkal Ticket Fast Booking – MyYatraExchange का Real Solution
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Tatkal ticket 10 बजे book करते-करते ही <strong>FULL</strong> हो जाता है?  
        Solution बहुत simple है — <strong>MyYatraExchange.com</strong> पर हजारों users 
        extra tickets पोस्ट करते हैं, जिन्हें आप तुरंत लेकर अपनी journey confirm कर सकते हैं!
      </p>

      {/* Why It Works */}
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
        🔥 क्यों यह तरीका 100% काम करता है?
      </h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>कई लोग Tatkal में 2–3 seats book कर लेते हैं → बाद में cancel कर देते हैं</li>
        <li>कई लोगों का plan last moment बदल जाता है</li>
        <li>ये tickets MyYatraExchange पर पोस्ट हो जाते हैं → और आप ले सकते हो</li>
      </ul>

      {/* What To Do When Tatkal Fails */}
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
        ⭐ Tatkal फेल हो जाए तो क्या करें?
      </h2>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">✔ Step 1 — “Find Ticket” page खोलें</h3>
      <p className="text-gray-700 mb-4">
        बस Route, Date, Train number डालिए → Available confirm tickets तुरंत दिख जाएंगे।
      </p>

      {/* Highlighted FIND link */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-6">
        <p className="text-blue-800 font-semibold">
          👉 Confirm Ticket चाहिए?  
        </p>
        <Link
          to="/find"
          className="text-blue-700 underline font-semibold"
        >
          https://myyatraexchange.com/find
        </Link>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">✔ Step 2 — Ticket मिल जाए → तुरंत Contact</h3>
      <p className="text-gray-700 mb-4">
        मिलते ही तुरंत confirmation कर लें, क्योंकि demand बहुत ज्यादा होती है।
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        ✔ Step 3 — अगर नहीं मिला → “Notify Me” (Coming Soon)
      </h3>

      {/* Extra Ticket Section */}
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        ⭐ आपके पास extra ticket है?
      </h2>

      <p className="text-gray-700 mb-3">
        तो उसे MyYatraExchange पर <strong>Post</strong> कर दें।  
        इससे टिकट लेने वाला आपको पूरा पैसा दे देगा और आप <strong>Cancellation Loss</strong> से भी बच जाएंगे!
      </p>

      {/* Highlighted POST link */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg mb-6">
        <p className="text-green-800 font-semibold">👉 Extra Ticket है? यहाँ Post करें</p>
        <Link
          to="/post"
          className="text-green-700 underline font-semibold"
        >
          https://myyatraexchange.com/post
        </Link>
      </div>

      {/* Footer Links Section */}
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">🔗 Useful Links</h2>

      <div className="space-y-2">
        <p>
          ✔ <strong>Home:</strong>{" "}
          <Link to="/" className="text-blue-600 underline">
            https://myyatraexchange.com/
          </Link>
        </p>

        <p>
          ✔ <strong>Find Ticket:</strong>{" "}
          <Link to="/find" className="text-blue-600 underline">
            https://myyatraexchange.com/find
          </Link>
        </p>

        <p>
          ✔ <strong>Post Ticket:</strong>{" "}
          <Link to="/post" className="text-blue-600 underline">
            https://myyatraexchange.com/post
          </Link>
        </p>
      </div>

    </div>
  );
};

export default TatkalFast;

