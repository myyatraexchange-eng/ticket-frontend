const HowItWorksModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
    <div className="bg-white max-w-2xl w-full rounded-2xl p-6 relative shadow-2xl animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        aria-label="Close"
      >
        ✖
      </button>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-blue-700 text-center">
        My Yatra Exchange: Kaise Kaam Karta Hai?
      </h2>

      <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
        (How It Works)
      </p>

      {/* Steps */}
      <div className="space-y-5 text-gray-800 text-sm sm:text-base leading-relaxed">

        <div>
          <h3 className="font-bold text-lg">
            🚂 Step 1: POST TICKET <span className="text-gray-500">(Ticket Post Karein)</span>
          </h3>
          <p className="mt-1">
            Agar aapka plan achanak badal gaya hai aur aapke paas confirm ticket hai,
            to use cancel karke nuksaan na uthayein.
            <br />
            <b>My Yatra Exchange</b> par apni ticket details post karein aur
            apna poora paisa wapas paane ka mauka paayein.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg">
            🔍 Step 2: FIND TICKET <span className="text-gray-500">(Confirm Ticket Search Karein)</span>
          </h3>
          <p className="mt-1">
            Agar aapko achanak kahin jana hai aur confirm seat nahi mil rahi,
            to <b>My Yatra Exchange</b> par apne route ki available tickets search karein.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg">
            💳 Step 3: Platform Fee & Contact
          </h3>
          <p className="mt-1">
            Sirf <b>₹20/-</b> ki chhoti si platform fee pay karein.
            <br />
            Fee pay karte hi aapko ticket post karne wale ka
            <b> direct contact number</b> mil jayega.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg">
            🤝 Step 4: Ticket Exchange Karein
          </h3>
          <p className="mt-1">
            Phone par baat karke ticket details verify karein
            <b> (PNR status check karein)</b> aur
            aapas mein payment karke ticket le lein.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center text-xs sm:text-sm text-gray-500">
        🔐 Secure • Simple • Fast • No Middleman
      </div>
    </div>
  </div>
);

