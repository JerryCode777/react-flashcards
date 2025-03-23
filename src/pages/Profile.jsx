import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users", formData);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await api.delete("/users");
        logout();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Profile Settings</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="New Password"
        />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: "1rem", background: "red", color: "white" }}>
        Delete Account
      </button>
    </div>
  );
}