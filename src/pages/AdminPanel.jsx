// src/pages/AdminPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Other admin actions can go here */}

        {/* Button to go to Pending Payments */}
        <button
          onClick={() => navigate("/admin/payments")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View & Verify Pending Payments
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

