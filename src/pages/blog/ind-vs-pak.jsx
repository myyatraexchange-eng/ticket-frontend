import React from "react";
import { Helmet } from "react-helmet";

export default function IndVsPak() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <Helmet>
        <title>India vs Pakistan — ICC T20 World Cup 2026 | Full Match Guide</title>
        <meta
          name="description"
          content="India vs Pakistan T20 World Cup 2026: Stadium guide, tickets, travel plan, pitch report, team analysis, match prediction & fan tips."
        />
        <meta property="og:image" content="/thumbnails/indvspak.webp" />
      </Helmet>

      {/* HERO IMAGE */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-8 border border-gray-300">
        <img
          src="/thumbnails/indvspak.webp"
          alt="India vs Pakistan Thumbnail"
          className="w-full"
        />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 leading-snug mb-4">
        India vs Pakistan — ICC Men's T20 World Cup 2026 Full Mega Guide
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        <b>Date:</b> 15 February 2026 • <b>Time:</b> 7:00 PM Local •{" "}
        <b>Venue:</b> R. Premadasa Stadium, Colombo
      </p>

      <div className="p-5 bg-blue-50 border-l-4 border-blue-600 rounded-md mb-8">
        <p className="text-blue-900 leading-7">
          India vs Pakistan hamesha se world cricket ka sabse intense match 
          raha hai. Fans, media, pure Asia ki nazar is match par hoti hai. 
          Ye 2026 T20 World Cup ka sabse trending match hai — aur yahan hum 
          poora 2000+ words ka ultimate guide de rahe hain.
        </p>
      </div>

      {/* OVERVIEW */}
      <h2 className="section-title text-3xl font-bold text-gray-900 mb-3">
        🔥 Match Overview — Why This Clash Is MASSIVE?
      </h2>

      <p className="text-gray-700 leading-7 mb-8">
        India-Pakistan rivalry kisi introduction ki mohtaj nahi. 
        ICC events me dono teams jab takraati hain to stadium ka atmosphere 
        electric ho jata hai. Colombo venue neutral hote hue match ko aur 
        interesting bana deta hai. Crowd noise, dew effect aur batting-friendly 
        pitch is match ko thriller banayenge.
      </p>

      {/* SECTION DIVIDER */}
      <hr className="my-10 border-gray-300" />

      {/* VENUE */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        🏟 Venue — R. Premadasa Stadium, Colombo
      </h2>

      <div className="rounded-xl overflow-hidden shadow-lg mb-6 border border-gray-300">
        <img
          src="/thumbnails/stadium.webp"
          alt="Stadium"
          className="w-full"
        />
      </div>

      <p className="text-gray-700 leading-7 mb-6">
        Sri Lanka ka sabse iconic stadium, jahan dew factor second innings ko 
        pure match ka direction badal deta hai. Ye venue high-scoring encounters 
        ke liye known hai.
      </p>

      <ul className="list-disc ml-6 text-gray-700 leading-7 mb-8">
        <li>Capacity: 35,000+</li>
        <li>Outfield: Lightning fast</li>
        <li>Pitch: Batting-friendly</li>
        <li>Dew: Huge factor during second innings</li>
      </ul>

      {/* SECTION DIVIDER */}
      <hr className="my-10 border-gray-300" />

      {/* TRAVEL GUIDE */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        🚗 How to Reach the Stadium (Travel Guide)
      </h2>

      <div className="bg-yellow-50 p-4 border-l-4 border-yellow-600 rounded-md mb-6">
        <p className="text-yellow-900">
          Colombo match-day par heavy traffic hota hai. Late mat niklo — 
          gates open hote hi stadium reach karna best hai.
        </p>
      </div>

      <h3 className="font-semibold text-lg mb-2">🚕 Cab / Uber / PickMe</h3>
      <p className="text-gray-700 mb-4 leading-7">
        Best aur comfortable option. <b>Khettarama Main Gate</b> official drop point.
      </p>

      <h3 className="font-semibold text-lg mb-2">🛺 Tuk-Tuk (Fastest)</h3>
      <p className="text-gray-700 mb-4 leading-7">
        Stadium exit ke baad sabse fast ye hi milta hai.
      </p>

      <h3 className="font-semibold text-lg mb-2">🚘 Car (Avoid)</h3>
      <p className="text-gray-700 mb-6 leading-7">
        Parking almost impossible. Road closures common hoti hain.
      </p>

      {/* SECTION DIVIDER */}
      <hr className="my-10 border-gray-300" />

      {/* TICKETS */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        🎟 Tickets Kaise Book Karein? (Official + Safe Guide)
      </h2>

      <p className="text-gray-700 mb-6 leading-7">
        India vs Pakistan match ke tickets seconds me sold out ho jate hain. 
        Fake ticket scams bohot active hote hain. Sirf official ICC portal par 
        hi tickets genuine hote hain.
      </p>

      <ul className="list-disc ml-6 text-gray-700 mb-8 leading-7">
        <li>General Stand</li>
        <li>Premium Stand</li>
        <li>Pavilion End</li>
        <li>Hospitality VIP</li>
      </ul>

      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-md mb-10">
        <p className="text-green-900 leading-7">
          Ticket Tips:  
          <br />• ICC account pehle se bana lo  
          <br />• Payment card international enable ho  
          <br />• Ticket release ke waqt multiple devices best
        </p>
      </div>

      {/* SECTION DIVIDER */}
      <hr className="my-10 border-gray-300" />

      {/* ENTRY RULES */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        🔒 Entry Rules — Kya Allowed? Kya Nahi?
      </h2>

      <h3 className="font-semibold mb-2">✔ Allowed</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Mobile Phones</li>
        <li>Small sling bag</li>
        <li>1L sealed water bottle</li>
      </ul>

      <h3 className="font-semibold mb-2">❌ Not Allowed</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Backpacks</li>
        <li>Power banks</li>
        <li>Food / drinks</li>
        <li>Cigarettes, lighters, vapes</li>
      </ul>

      {/* SECTION DIVIDER */}
      <hr className="my-10 border-gray-300" />

      {/* TEAM ANALYSIS */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        ⚔️ Team India vs Pakistan — Strength Analysis
      </h2>

      <h3 className="font-semibold text-lg mb-2">🇮🇳 India</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-4 leading-7">
        <li>Bumrah & Arshdeep death overs masters</li>
        <li>Kohli & SKY big match players</li>
        <li>Pandya as finisher</li>
      </ul>

      <h3 className="font-semibold text-lg mb-2">🇵🇰 Pakistan</h3>
      <ul className="list-disc ml-6 text-gray-700 mb-8 leading-7">
        <li>Shaheen Afridi early breakthroughs</li>
        <li>Rizwan consistent scorer</li>
        <li>Rauf + Naseem express pace</li>
      </ul>

      {/* SECTION DIVIDER */}
      <hr className="my-10 border-gray-300" />

      {/* PREDICTION */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        🔮 Match Prediction — Kaun Jeetega?
      </h2>

      <p className="text-gray-700 leading-7 mb-12">
        Conditions India ke favour me लगती hain, especially dew factor ke 
        saath chasing strong hoti hai. But Pakistan big-match surprises dene 
        ke liye famous hai. Toss winner ke favor me heavy advantage hoga.
      </p>
    </div>
  );
}

