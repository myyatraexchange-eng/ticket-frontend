import React from "react";
import { Helmet } from "react-helmet";

export default function TrainSeatAvailability() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Helmet>
        <title>
          Train Seat Availability Check: Confirm Ticket Na Mile To Kya Kare? | My Yatra Exchange
        </title>
        <meta
          name="description"
          content="Train seat availability check ke baad WL ya RAC aa raha hai? Confirm ticket na mile to smart solution, tips aur FAQ yahan detail me padhein."
        />
        <meta property="og:image" content="/thumbnails/train-seat-availability.webp" />
      </Helmet>

      {/* HERO IMAGE */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-8 border border-gray-300">
        <img
          src="/thumbnails/train-seat-availability.webp"
          alt="Train Seat Availability Thumbnail"
          className="w-full"
        />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 leading-snug mb-4">
        🚆 Train Seat Availability Check: Confirm Ticket Na Mile To Kya Kare?
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        Aaj ke time me train seat availability check karna har traveller ki 
        sabse pehli need hoti hai. Office travel, family function, emergency 
        ya festival — sabse bada sawal hota hai:
      </p>

      <div className="p-5 bg-blue-50 border-l-4 border-blue-600 rounded-md mb-8">
        <p className="text-blue-900 text-lg">
          “Train me confirm seat milegi ya nahi?”
        </p>
      </div>

      {/* SEAT CHECK */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        🔍 Train Seat Availability Check Kaise Kare?
      </h2>

      <ul className="list-disc ml-6 text-gray-700 leading-7 mb-6">
        <li>IRCTC website / mobile app</li>
        <li>Railway enquiry apps</li>
        <li>Trusted travel booking platforms</li>
      </ul>

      <p className="text-gray-700 leading-7 mb-8">
        Seat availability check karne ke liye train number, journey date, 
        boarding station, destination aur class (SL, 3A, 2A) chahiye hoti hai.
      </p>

      {/* WL RAC */}
      <hr className="my-10 border-gray-300" />

      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        ⚠️ WL aur RAC Kya Hota Hai?
      </h2>

      <h3 className="font-semibold text-lg mb-2">❌ Waiting List (WL)</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-6">
        <li>Seat confirm nahi hoti</li>
        <li>Chart ke baad cancel ho sakti hai</li>
        <li>Travel risk high hota hai</li>
      </ul>

      <h3 className="font-semibold text-lg mb-2">⚠️ RAC</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Seat shared hoti hai</li>
        <li>Confirm hone ke chances rehte hain</li>
        <li>Comfort full seat jaisa nahi hota</li>
      </ul>

      {/* SOLUTION */}
      <hr className="my-10 border-gray-300" />

      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        ✅ Smart Solution: Cancel Mat Karo, Exchange Option Explore Karo
      </h2>

      <p className="text-gray-700 leading-7 mb-6">
        Agar aapke paas confirm train ticket hai lekin aap travel nahi kar pa rahe,
        toh turant cancel karna hi akela option nahi hota.
      </p>

      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-md mb-8">
        <p className="text-green-900 leading-7">
          My Yatra Exchange ek platform hai jahan travellers apni travel 
          availability share karte hain aur seat availability ke liye 
          alternate options explore kar sakte hain — railway rules ke according.
        </p>
      </div>

      {/* BENEFITS */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        🌟 My Yatra Exchange Ke Important Benefits
      </h2>

      <ul className="list-disc ml-6 text-gray-700 mb-8 leading-7">
        <li>Cancellation loss se bachav</li>
        <li>Emergency travel me madad</li>
        <li>WL / RAC ka practical solution</li>
        <li>Simple aur user-friendly process</li>
      </ul>

      {/* FAQ */}
      <hr className="my-10 border-gray-300" />

      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        ❓ Frequently Asked Questions (FAQ)
      </h2>

      <p className="mb-4"><b>Q. WL ticket par travel allowed hai?</b><br />
        A. Nahi, chart ke baad general WL par travel allowed nahi hota.
      </p>

      <p className="mb-4"><b>Q. RAC confirm hoti hai?</b><br />
        A. Haan, cancellation hone par RAC confirm ho sakti hai.
      </p>

      <p className="mb-4"><b>Q. Kya My Yatra Exchange ticket transfer karta hai?</b><br />
        A. Nahi, platform ticket transfer nahi karta. Ye sirf alternate options explore karne me madad karta hai.
      </p>

      {/* CTA */}
      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-5 rounded-md mt-10">
        <p className="text-yellow-900 text-lg">
          👉 Agli baar jab train seat available na ho, panic mat karo —  
          <b> My Yatra Exchange </b> check karo.
        </p>
      </div>

      <p className="text-center text-gray-600 mt-6">
        Official Website:{" "}
        <a
          href="https://www.myyatraexchange.com"
          className="text-blue-600 underline"
        >
          www.myyatraexchange.com
        </a>
      </p>

    </div>
  );
}

