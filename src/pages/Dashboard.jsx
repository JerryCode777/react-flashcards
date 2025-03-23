import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <h1>Welcome {user?.email}</h1>
      <div>
        <h2>Quick Actions</h2>
        <button onClick={() => window.location = "/groups"}>Manage Groups</button>
        <button onClick={() => window.location = "/profile"}>Edit Profile</button>
      </div>
    </div>
  );
}