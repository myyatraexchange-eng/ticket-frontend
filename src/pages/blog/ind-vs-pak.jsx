import React from "react";
import { Helmet } from "react-helmet";

export default function IndVsPak() {
  const title =
    "India vs Pakistan — ICC Men's T20 World Cup 2026 | Colombo Stadium Guide";
  const description =
    "India vs Pakistan T20 World Cup 2026: Tickets, Colombo R Premadasa Stadium travel guide, entry rules, fan tips, how to reach & full match-day plan.";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/thumbnails/indvspak.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content="/thumbnails/indvspak.webp" />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        India vs Pakistan — ICC Men’s T20 World Cup 2026
      </h1>

      <p className="text-gray-600 mb-4">
        Date: 15 February 2026 • 7:00 PM Local • Venue: R. Premadasa Stadium, Colombo
      </p>

      {/* HERO IMAGE */}
      <img
        src="/thumbnails/indvspak.webp"
        alt="India vs Pakistan 2026"
        className="w-full rounded-xl shadow-md mb-6"
      />

      {/* FLAG IMAGE */}
      <img
        src="/thumbnails/India-vs-Pakistanfleg.webp"
        alt="India vs Pakistan Flags"
        className="w-80 mx-auto rounded-lg shadow mb-8"
      />

      {/* STADIUM IMAGE */}
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Venue Details — R. Premadasa Stadium</h2>

      <img
        src="/thumbnails/stadium.webp"
        alt="R Premadasa Stadium"
        className="w-full rounded-xl shadow mb-4"
      />

      <ul className="list-disc ml-6 text-gray-700 mb-6">
        <li>Location: Khettarama Road, Colombo</li>
        <li>Capacity: ~35,000</li>
        <li>Pitch: Batting-friendly, dew factor high</li>
        <li>Lighting: Full floodlights</li>
      </ul>

      {/* TRAVEL */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">How to Reach the Stadium</h2>
      <p className="mb-3 text-gray-700">Match-day par Colombo me heavy traffic hota hai.</p>

      <h3 className="font-semibold">By Tuk-Tuk</h3>
      <p className="mb-3">Fastest and cheap. Meter ON karwana.</p>

      <h3 className="font-semibold">By Cab (PickMe / Uber)</h3>
      <p className="mb-3">Drop: Khettarama Road main gate.</p>

      <h3 className="font-semibold">By Bus</h3>
      <p className="mb-3">Stop: Khettarama Stadium Bus Stop.</p>

      <h3 className="font-semibold">By Car</h3>
      <p className="mb-6">Parking limited — avoid car.</p>

      {/* Tickets */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tickets — Where to Buy?</h2>
      <p className="mb-3">
        Tickets sirf official ICC website par milte hain. WhatsApp sellers = 100% scam.
      </p>

      <h3 className="font-semibold">Ticket Categories</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>General</li>
        <li>Premium</li>
        <li>Pavilion End</li>
        <li>Hospitality</li>
      </ul>

      {/* Entry Rules */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Stadium Entry Rules</h2>

      <h3 className="font-semibold">Allowed</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-3">
        <li>Mobile</li>
        <li>Sling bag</li>
        <li>Water bottle</li>
      </ul>

      <h3 className="font-semibold">Not Allowed</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-6">
        <li>Backpack</li>
        <li>Outside food</li>
        <li>Power bank</li>
        <li>Vapes / lighters</li>
      </ul>

      {/* Fan Tips */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Fan Tips</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Gates 2 hours pehle open — jaldi jao.</li>
        <li>QR code offline save karo.</li>
        <li>Tuk-tuk = fastest exit.</li>
        <li>Colombo humid — light clothes pehno.</li>
      </ul>
    </div>
  );
}

