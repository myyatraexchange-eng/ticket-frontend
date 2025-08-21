import React from 'react';
import { ShieldCheck, PhoneCall, RotateCcw, Lock, AlertTriangle } from 'lucide-react';

const Policy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Our Policies & Terms</h1>

        {/* Section 1: Platform Usage */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-blue-600 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-800">1. Platform Usage</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>MyYatraExchange.com</strong> is a user-to-user platform that connects people who have unused train tickets
            with those who need them. We do not issue, verify, or guarantee any ticket listed. Users are fully responsible
            for the accuracy of their submissions.
          </p>
        </div>

        {/* Section 2: Contact Info Access */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <PhoneCall className="text-green-600 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-800">2. Contact Info Access</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To protect privacy, contact numbers are hidden until a <strong>₹20 unlock fee</strong> is paid. This reveals
            the contact number of the specific ticket owner. This fee is for unlocking one ticket’s contact only and
            is <span className="text-red-500 font-semibold">non-refundable</span>.
          </p>
        </div>

        {/* Section 3: Refund Policy */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <RotateCcw className="text-yellow-600 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-800">3. Refund Policy</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            As we charge a minimal fee only to unlock contact details, we do not offer refunds. Make sure the ticket
            you are unlocking is suitable before making payment.
          </p>
        </div>

        {/* Section 4: Data Privacy */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="text-purple-600 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-800">4. Data Privacy</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We respect your privacy. Your name, email, and phone number will never be shared publicly unless you post
            it yourself in a listing. We do not sell user data to third parties.
          </p>
        </div>

        {/* Section 5: Legal Disclaimer */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-red-600 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-gray-800">5. Legal Disclaimer</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We are not affiliated with Indian Railways. This website operates independently to help individuals
            connect with one another. All users are advised to follow railway rules and guidelines when transferring tickets.
          </p>
        </div>

        {/* Contact Line */}
        <div className="mt-10 border-t pt-6 text-sm text-gray-600 text-center">
          For any questions, reach out to us at <span className="font-medium text-blue-700">support@myyatraexchange.com</span>
        </div>
      </div>
    </div>
  );
};

export default Policy;
