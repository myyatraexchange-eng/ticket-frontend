import React from "react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      {/* 🔹 SEO Helmet */}
      <Helmet>
        <title>About Us | MyYatraExchange</title>
        <meta
          name="description"
          content="Learn more about MyYatraExchange - a community-driven platform where travelers share unused train tickets, save cancellation charges, and help others find last-minute journeys."
        />
        <meta
          name="keywords"
          content="about myyatraexchange, train ticket sharing, save cancellation charges, railway ticket exchange, Indian railways community"
        />
        <meta property="og:title" content="About MyYatraExchange" />
        <meta
          property="og:description"
          content="MyYatraExchange is India's first community platform for confirmed train ticket exchange. Save cancellation charges and connect with genuine travelers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.myyatraexchange.com/about" />
        <meta property="og:image" content="https://www.myyatraexchange.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About MyYatraExchange" />
        <meta
          name="twitter:description"
          content="Know about MyYatraExchange - India's trusted platform for confirmed train ticket exchange."
        />
        <meta name="twitter:image" content="https://www.myyatraexchange.com/logo.png" />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        About MyYatraExchange.com
      </h1>

      <p className="text-lg mb-6 leading-relaxed">
        <strong>MyYatraExchange.com</strong> is a community-driven platform where
        travelers can share details of their unused train tickets to help others
        in need of a last-minute journey. Instead of canceling your ticket and
        losing money, why not connect with someone who actually needs it?
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        We do <strong>not sell or resell tickets</strong>. We simply provide a
        safe place where ticket holders and interested travelers can connect.
        All coordination, discussion, and exchange is done directly between
        users.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-600">
        Why MyYatra Exchange?
      </h2>
      <ul className="list-disc list-inside space-y-2 text-lg">
        <li>Save cancellation charges by sharing your ticket.</li>
        <li>Find last-minute tickets from real people, not agents.</li>
        <li>Support responsible and helpful travel communities.</li>
        <li>
          Simple interface, secure experience, and ₹20 unlock fee for contact
          visibility.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-600">
        Our Vision
      </h2>
      <p className="text-lg mb-6 leading-relaxed">
        We aim to build a responsible travel-sharing network in India. Our goal
        is to reduce travel waste and support genuine travelers through smart,
        user-first digital tools.
      </p>

      <div className="bg-yellow-100 p-4 rounded-md border border-yellow-300 text-yellow-800 mt-10 text-sm">
        <strong>Disclaimer:</strong> MyYatraExchange.com is not affiliated with
        IRCTC or Indian Railways. We do not sell, issue, or modify train
        tickets. All information is user-submitted, and users are responsible
        for their own verification.
      </div>
    </div>
  );
};

export default About;
