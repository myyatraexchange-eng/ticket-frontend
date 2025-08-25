import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: "", text: "" });

    if (formData.phone.length !== 10) {
      setStatusMsg({ type: "error", text: "Phone number must be 10 digits." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://ticket-backend-g5da.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setStatusMsg({ type: "success", text: "Login successful! Redirecting..." });
        setTimeout(() => (window.location.href = "/"), 1000);
      } else {
        setStatusMsg({ type: "error", text: data.message || "Invalid login" });
      }
    } catch (err) {
      console.error("Login Error:", err);
      setStatusMsg({ type: "error", text: "Something went wrong! Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Login to MyYatraExchange</h2>

        {statusMsg.text && (
          <div className={`mb-4 p-3 rounded ${statusMsg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your 10-digit phone number"
              maxLength={10}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
