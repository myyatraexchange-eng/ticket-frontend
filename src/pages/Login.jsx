import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://ticket-backend-g5da.onrender.com/api";

const Login = () => {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || `Login failed with status ${res.status}`);
      }

      if (data.token) {
        login(data.token);
        navigate("/profile");
      } else {
        throw new Error("No token received. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Login to MyYatraExchange
        </h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
