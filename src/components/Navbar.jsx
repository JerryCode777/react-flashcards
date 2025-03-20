import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/groups">Groups</Link>
      <Link to="/profile">Profile</Link>
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}