import React from 'react';
import { AlertCircle, Users, ShieldCheck } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Disclaimer</h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6 text-lg leading-relaxed">
        <div className="flex items-center text-blue-600">
          <AlertCircle className="w-6 h-6 mr-2" />
          <h2 className="text-2xl font-semibold">Third-Party Platform</h2>
        </div>
        <p>
          <strong>MyYatraExchange.com</strong> is a third-party platform that only connects users who wish to cancel confirmed train tickets with those in urgent need of a ticket.
        </p>

        <div className="flex items-center text-blue-600">
          <Users className="w-6 h-6 mr-2" />
          <h2 className="text-2xl font-semibold">No Resale or Promotion of Misuse</h2>
        </div>
        <p>
          We do <span className="font-semibold text-red-600">not promote</span> ticket resale, illegal travel, or any activity that violates Indian Railways rules.
          All users are advised to follow official IRCTC guidelines.
        </p>

        <div className="flex items-center text-blue-600">
          <ShieldCheck className="w-6 h-6 mr-2" />
          <h2 className="text-2xl font-semibold">User Responsibility</h2>
        </div>
        <p>
          Users must use this platform responsibly. <strong>We are not liable</strong> for any misuse, fraud, or disputes resulting from information shared between users.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
