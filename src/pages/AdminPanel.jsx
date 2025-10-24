import React from "react";
import AdminPayments from "./AdminPayments";

const AdminPanel = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <AdminPayments />
    </div>
  );
};

export default AdminPanel;

