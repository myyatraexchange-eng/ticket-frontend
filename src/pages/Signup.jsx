// 📂 src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://ticket-backend-g5da.onrender.com/api/auth/register";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phone: "", password: "" });
  const [message, setMessage] = useState("");

  // input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Signup Response:", data);

      if (res.ok) {
        setMessage("✅ Signup successful! Please login.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "❌ Signup failed, try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-sm">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

