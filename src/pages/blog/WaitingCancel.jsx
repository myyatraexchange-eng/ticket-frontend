import React from "react";
import { Link } from "react-router-dom";

const WaitingCancel = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        🚀 Waiting Ticket Cancel / Confirm कैसे होता है? – MyYatraExchange Complete Guide
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Waiting ticket confirm होगा या नहीं — ये guess करना मुश्किल होता है।
        लेकिन चिंता मत करें, <strong>MyYatraExchange</strong> पर आपको real-time में 
        दूसरे travellers द्वारा पोस्ट किए गए <strong>confirm tickets</strong> मिल जाते हैं।
      </p>

      {/* Not confirmed section */}
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
        ⭐ Waiting Ticket Confirm नहीं हुआ? क्या करें?
      </h2>

      <p className="text-gray-700 mb-4">
        अगर आपका waiting ticket अभी भी confirm नहीं हुआ है, तो आपके पास 3 smart options हैं:
      </p>

      {/* Option 1 */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-6">
        <p className="font-semibold text-blue-800">✔ Option 1 → “Find Ticket” Page Use करें</p>
        <p className="text-gray-700">
          यहां से आपको <strong>real confirmed tickets</strong> मिल सकते हैं।
        </p>
        <Link to="/find" className="text-blue-700 underline font-semibold">
          https://myyatraexchange.com/find
        </Link>
      </div>

      {/* Option 2 */}
      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg mb-6">
        <p className="font-semibold text-red-800">✔ Option 2 → Waiting Ticket Cancel करें & पैसा बचाएं</p>
        <p className="text-gray-700">
          IRCTC cancellation में <strong>₹180 से लेकर 100% तक</strong> कट सकता है —  
          जल्दी cancel करने से loss कम होता है।
        </p>
      </div>

      {/* Option 3 */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg mb-6">
        <p className="font-semibold text-green-800">✔ Option 3 → किसी का unused ticket ले सकते हैं</p>
        <p className="text-gray-700">
          कई users last moment पर ticket cancel करते हैं — ये tickets MyYatraExchange पर 
          पोस्ट हो जाते हैं और आप उन्हें ले सकते हैं।
        </p>
      </div>

      {/* Why MyYatraExchange section */}
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
        ⭐ Waiting Users के लिए MyYatraExchange Best क्यों है?
      </h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Real-time confirmed tickets की list</li>
        <li>Real travellers अपने seats post करते हैं</li>
        <li>No bidding – No agents – No commission</li>
        <li>Direct passenger-to-passenger help</li>
      </ul>

      {/* Final Advice */}
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        ⭐ Final Advice
      </h2>

      <p className="text-gray-700 mb-4">
        Waiting ticket risky होता है। इसका better alternative:
      </p>

      <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
        <li>
          👉 Direct <strong>confirm ticket</strong> Find page से ले लें।
          <br />
          <Link to="/find" className="text-blue-700 underline font-semibold">
            https://myyatraexchange.com/find
          </Link>
        </li>

        <li>
          👉 अगर आपका अपना ticket waste जा रहा है →  
          <strong>Post Ticket</strong> करें और cancellation loss बचाएं।
          <br />
          <Link to="/post" className="text-green-700 underline font-semibold">
            https://myyatraexchange.com/post
          </Link>
        </li>
      </ul>

      {/* Important Links */}
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
        🔗 Important Links
      </h2>

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

export default WaitingCancel;

