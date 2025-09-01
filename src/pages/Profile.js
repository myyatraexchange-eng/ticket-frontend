import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  if (!user) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">My Profile</h2>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>User ID:</strong> {user._id}</p>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
