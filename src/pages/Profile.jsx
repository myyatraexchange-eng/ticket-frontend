import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user) return <p className="text-center mt-10 text-red-500">Not logged in.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">My Profile</h1>
      <p><span className="font-semibold">Name:</span> {user.name}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
