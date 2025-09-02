import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Privacy Policy</h1>

      <section className="mb-6">
        <p className="text-gray-700">
          This Privacy Policy outlines how MyYatraExchange.com collects, uses, and protects your information when you use our platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">1. What We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Name and phone number</li>
          <li>Basic travel information you provide when posting a ticket</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">2. How We Use It</h2>
        <p className="text-gray-700">
          Your information is only used to connect you with users who either want to post or find a train ticket.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Data Sharing</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>We only share your phone number with a matched user, after your permission.</li>
          <li>We never sell, rent, or misuse your personal data.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Security</h2>
        <p className="text-gray-700">
          We take all reasonable technical and administrative steps to protect your data from unauthorized access or misuse.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Your Rights</h2>
        <p className="text-gray-700">
          You may contact us at any time to request deletion of your personal data from our platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">6. Updates to This Policy</h2>
        <p className="text-gray-700">
          This Privacy Policy may be updated occasionally. Major changes will be notified to users on the platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">7. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or concerns, please email us at:
        </p>
        <p className="text-gray-800 font-medium mt-1">support@myyatraexchange.com</p>
      </section>

      <p className="text-sm text-gray-500">Last updated: August 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
