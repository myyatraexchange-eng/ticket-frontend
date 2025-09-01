import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, Ban, Gavel } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Terms of Use</h1>

      <div className="space-y-10">
        {/* Service Description */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <ShieldCheck className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">1. Service Description</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>We only provide contact information (with consent) between users wishing to cancel their confirmed train ticket and users in need of tickets.</li>
            <li>We do not process, alter, sell, or transfer any railway ticket.</li>
          </ul>
        </section>

        {/* User Responsibility */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <FileText className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">2. User Responsibility</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Users must ensure all actions post-contact (ticket transfer, travel, or cancellation) comply with Indian Railway rules.</li>
            <li>We do not encourage travel using another person's ticket unless IRCTC guidelines allow name changes.</li>
          </ul>
        </section>

        {/* Charges */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <FileText className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">3. Charges</h2>
          </div>
          <p className="text-gray-700">A nominal fee of ₹20 is charged to access the contact details of a ticket holder who wishes to transfer or cancel their ticket.</p>
        </section>

        {/* Liability */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <AlertTriangle className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">4. Liability</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>We are not responsible for misuse of contact information, fraud, or illegal travel arrangements.</li>
            <li>Any disputes must be handled between users directly.</li>
          </ul>
        </section>

        {/* Prohibited Activities */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <Ban className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">5. Prohibited Activities</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Reselling tickets</li>
            <li>Sharing fake or edited tickets</li>
            <li>Impersonating others or traveling without valid ID</li>
          </ul>
        </section>

        {/* Platform Rights */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <ShieldCheck className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">6. Platform Rights</h2>
          </div>
          <p className="text-gray-700">We reserve the right to suspend or report any user involved in fraudulent or unethical activity on the platform.</p>
        </section>

        {/* Governing Law */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <Gavel className="text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">7. Governing Law</h2>
          </div>
          <p className="text-gray-700">This agreement is governed by Indian laws. Legal disputes will be handled by courts located in Indore (mp), India.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
