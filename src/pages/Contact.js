import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg shadow-md text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg">Have questions, suggestions, or need support? We're here to help.</p>
      </div>

      {/* Contact Form + Info */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Your Name</label>
              <input type="text" className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-gray-700">Your Email</label>
              <input type="email" className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-gray-700">Your Message</label>
              <textarea className="w-full mt-1 p-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your message here..."></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Reach Us</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              📧 <strong>Email:</strong> myyatraexchange@gmail.com
            </li>
            <li>
              📞 <strong>Phone:</strong> +91 9753060916
            </li>
            <li>
              📍 <strong>Location:</strong> Indore(mp), India. 
            </li>
            <li>
              🕒 <strong>Support Hours:</strong> 10:00 AM – 6:00 PM (Mon–Sat)
            </li>
          </ul>

          <div className="mt-6 text-sm text-gray-500">
            We usually respond within 24 hours. For urgent issues, please mention "URGENT" in your subject line.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
