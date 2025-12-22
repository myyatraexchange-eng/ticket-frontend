import React from "react";

const AravalliBlog = () => {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-gray-800 leading-relaxed">

      {/* ===== HERO TITLE ===== */}
      <header className="mb-10 border-l-4 border-green-700 pl-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Aravalli Hills Controversy 2025: Kya Hum Apni Sabse Purani Dharohar Kho
          Rahe Hain?
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Guru Shikhar Travel Guide • Environment • Travel
        </p>
      </header>

      {/* ===== 1. INTRODUCTION ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          1. Introduction: Aravalli Hills News Mein Kyu Hai?
        </h2>

        <p className="mb-4">
          <strong>Aravalli Range</strong>, jo Bharat ki sabse purani parvat
          shrinkhla (mountain range) hai, aaj ek bade sankat aur vivad ke ghere
          mein hai. Supreme Court aur NGT se judi haliya khabron ke baad se
          <span className="text-red-600 font-semibold"> #SaveAravalli </span>
          social media par trend kar raha hai.
        </p>

        <p className="mb-6">
          Sarkar ki nayi paribhasha (definition) ke mutabik ab kewal wahi pahadiyan
          “Aravalli” mani ja rahi hain jinki unchai{" "}
          <span className="font-semibold text-gray-900">
            100 meter se zyada
          </span>{" "}
          hai. Is faisle ka matlab yeh nikala ja raha hai ki Aravalli ka lagbhag
          <span className="text-red-700 font-bold"> 90% hissa </span>
          mining aur construction ke liye khul sakta hai, jo
          <strong> Delhi–NCR ke paryavaran </strong>
          ke liye ek bada khatra ban sakta hai.
        </p>

        {/* INTRO IMAGE – ONLY ONE */}
        <img
          src="/thumbnails/2.webp"
          alt="Aravalli Hills environmental concern"
          loading="lazy"
          className="rounded-xl shadow-md w-full mb-4"
        />

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
          ⚠️ <strong>Warning:</strong> Agar Aravalli ka natural balance bigadta
          hai, to Delhi–NCR me heatwave, pollution aur water crisis aur tez ho
          sakta hai.
        </div>
      </section>

      {/* ===== 2. GURU SHIKHAR ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          2. Guru Shikhar: Aravalli ki Shaan
        </h2>

        <p className="mb-4">
          Agar aap Aravalli ki asli sundarta aur shakti ko mehsoos karna chahte
          hain, toh iski sabse unchi choti{" "}
          <strong>Guru Shikhar</strong> zaroor jayein.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Unchai:</strong> 1,722 meter
          </li>
          <li>
            <strong>Kahan hai:</strong> Mount Abu, Rajasthan
          </li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="font-semibold mb-2">Kyu jayein?</p>
          <ul className="list-disc pl-6 text-sm">
            <li>360-degree panoramic view</li>
            <li>Thanda aur shant mausam</li>
            <li>Bhagwan Dattatreya ka prachin mandir</li>
          </ul>
        </div>

        {/* GURU SHIKHAR IMAGES – ONLY 2 */}
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src="/thumbnails/4.webp"
            alt="Guru Shikhar Mount Abu"
            loading="lazy"
            className="rounded-xl shadow-md"
          />
          <img
            src="/thumbnails/5.webp"
            alt="Guru Shikhar panoramic view"
            loading="lazy"
            className="rounded-xl shadow-md"
          />
        </div>

        <p className="mt-4">
          Guru Shikhar sirf ek tourist place nahi, balki{" "}
          <strong>Aravalli ki pahchan</strong> hai.
        </p>
      </section>

      {/* ===== 3. HOW TO REACH ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          3. Guru Shikhar Kaise Pahuche?
        </h2>

        <p className="mb-4">
          Guru Shikhar aur Mount Abu pahunchne ke liye sabse nazdeeki railway
          station hai{" "}
          <strong>Abu Road Railway Station (ABR)</strong>.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Distance: Abu Road se Mount Abu ~ 28 km</li>
          <li>Travel Options: Taxi, shared cab, local bus</li>
        </ul>

        <p className="text-sm text-gray-700">
          Delhi, Mumbai aur Ahmedabad jaise shahron se Abu Road ke liye direct
          trains mil jati hain, lekin peak season me confirm train ticket milna
          mushkil ho jata hai.
        </p>
      </section>

      {/* ===== 4. MY YATRA EXCHANGE ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          4. Confirm Train Ticket Ki Problem Aur Solution
        </h2>

        <p className="mb-4">
          Mount Abu aur Rajasthan tourist season me train routes bahut zyada busy
          ho jaate hain. Kai baar mahino pehle booking ke baad bhi ticket{" "}
          <strong>Waiting List</strong> me atak jaati hai.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            My Yatra Exchange – Ek Smart Solution
          </h3>
          <ul className="list-disc pl-6 text-sm mb-4">
            <li>Extra ya unwanted train tickets exchange kar sakte hain</li>
            <li>Real travellers ke beech seat availability system</li>
            <li>Last moment travel ke liye bhi useful</li>
          </ul>

          <a
            href="https://myyatraexchange.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-700"
          >
            Visit My Yatra Exchange
          </a>
        </div>
      </section>

      {/* ===== 5. SAVE ARAVALLI ===== */}
      <section>
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          5. Kyun Zaroori Hai Aravalli Ko Bachana?
        </h2>

        <ul className="list-disc pl-6 mb-4">
          <li>Desert ko failne se rokti hai</li>
          <li>Groundwater recharge me madad karti hai</li>
          <li>Delhi–NCR ke pollution ko control karti hai</li>
          <li>Tourism aur local employment ka bada source</li>
        </ul>

        <div className="bg-green-700 text-white p-5 rounded-xl font-semibold text-center">
          “Aravalli ko bachaiye, apni yatra ko asaan banaiye – <br />
          My Yatra Exchange ke saath.”
        </div>
      </section>

    </article>
  );
};

export default AravalliBlog;

