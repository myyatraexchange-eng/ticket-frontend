import React from "react";

export default function HowItWorksModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      
      {/* Modal Box */}
      <div className="
        bg-white w-full max-w-2xl max-h-[85vh]
        rounded-2xl shadow-2xl relative
        flex flex-col overflow-hidden
      ">

        {/* ===== Header ===== */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-center">
            My Yatra Exchange: Kaise Kaam Karta Hai?
          </h2>
          <p className="text-center text-sm opacity-90 mt-1">
            (How It Works)
          </p>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white text-xl"
            aria-label="Close"
          >
            ✖
          </button>
        </div>

        {/* ===== Content ===== */}
        <div className="px-6 py-5 overflow-y-auto text-gray-800 space-y-4 text-sm sm:text-base">

          {/* Step 1 */}
          <div className="border-l-4 border-orange-400 bg-orange-50 rounded-r-lg p-4">
            <h3 className="font-bold text-lg mb-1">
              🚂 Step 1: POST TICKET
            </h3>
            <p>
              Agar aapka plan achanak badal gaya hai aur aapke paas
              <b> confirm ticket</b> hai, to use cancel karke nuksaan na uthayein.
              <br />
              <b>My Yatra Exchange</b> par apni ticket details post karein aur
              apna poora paisa wapas paane ka mauka paayein.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
            <h3 className="font-bold text-lg mb-1">
              🔍 Step 2: FIND TICKET
            </h3>
            <p>
              Agar aapko achanak kahin jana hai aur confirm seat nahi mil rahi,
              to <b>My Yatra Exchange</b> par apne route ki
              available tickets search karein.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
            <h3 className="font-bold text-lg mb-1">
              💳 Step 3: Platform Fee & Contact
            </h3>
            <p>
              Sirf <b>₹20/-</b> ki chhoti si platform fee pay karein.
              <br />
              Fee pay karte hi aapko ticket post karne wale ka
              <b> direct contact number</b> mil jayega.
            </p>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4">
            <h3 className="font-bold text-lg mb-1">
              🤝 Step 4: Ticket Exchange Karein
            </h3>
            <p>
              Phone par baat karke ticket details verify karein
              <b> (PNR status check karein)</b> aur
              aapas mein payment karke ticket le lein.
            </p>
          </div>

        </div>

        {/* ===== Footer ===== */}
        <div className="px-6 py-3 bg-gray-50 text-center text-xs sm:text-sm text-gray-600">
          🔐 Secure • Simple • Fast • No Middleman
        </div>
      </div>
    </div>
  );
}

