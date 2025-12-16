import React from "react";
import { Link } from "react-router-dom";

const UnusedTicket = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        🚀 Unused / Extra Ticket Cancel करने से होने वाले LOSS से कैसे बचें? – MyYatraExchange Guide
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        IRCTC में cancellation charges काफी <strong>ज्यादा लगते हैं</strong>.  
        लेकिन इसका एक स्मार्ट solution है —  
        अगर आपके पास <strong>extra / unused seat</strong> है तो उसे cancel करने के बजाय  
        <strong>MyYatraExchange</strong> पर पोस्ट करें और अपने पैसे बचाएं!
      </p>

      {/* Why Post Ticket */}
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
        ⭐ क्यों MyYatraExchange पर Post करना फायदे का सौदा है?
      </h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Cancellation में <strong>25% से 100% तक</strong> कट जाता है</li>
        <li>Exchange करने पर <strong>Cancellation बिल्कुल नहीं लगता</strong></li>
        <li>आप एक real traveller की direct मदद करते हैं</li>
      </ul>

      {/* Highlighted POST link */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg mt-5 mb-6">
        <p className="text-green-800 font-semibold">👉 Extra Ticket है? यहाँ Post करें:</p>
        <Link
          to="/post"
          className="text-green-700 underline font-semibold"
        >
          https://myyatraexchange.com/post
        </Link>
      </div>

      {/* Ticket Types */}
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
        ⭐ कौन-कौन से Tickets पोस्ट किए जा सकते हैं?
      </h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>✔ Confirm Ticket</li>
        <li>✔ RAC Ticket</li>
        <li>✔ Waiting Ticket</li>
        <li>✔ Family/Full Berth Tickets</li>
        <li>✔ Last-minute cancel होने वाले सारे tickets</li>
      </ul>

      {/* Buyers Information */}
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
        ⭐ Buyers किन details को देखते हैं?
      </h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Train Number</li>
        <li>Date</li>
        <li>Class (Sleeper, 3A, 2A, CC etc.)</li>
        <li>Berth Details</li>
        <li>Ticket Price</li>
        <li>Contact number (masked privacy mode)</li>
      </ul>

      {/* Useful Links Section */}
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        🔗 Important Links
      </h2>

      <div className="space-y-2">
        <p>
          ✔ <strong>Home:</strong>{" "}
          <Link to="/" className="text-blue-600 underline">
            https://myyatraexchange.com
          </Link>
        </p>

        <p>
          ✔ <strong>Post Ticket:</strong>{" "}
          <Link to="/post" className="text-blue-600 underline">
            https://myyatraexchange.com/post
          </Link>
        </p>

        <p>
          ✔ <strong>Find Ticket:</strong>{" "}
          <Link to="/find" className="text-blue-600 underline">
            https://myyatraexchange.com/find
          </Link>
        </p>
      </div>

    </div>
  );
};

export default UnusedTicket;

