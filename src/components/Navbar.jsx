import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center gap-8 px-6 py-4 bg-gray-900 border-b border-gray-800 shadow-md">
      <Link
        to="/dashboard"
        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 p-2 rounded hover:bg-blue-400/10"
      >
        Dashboard
      </Link>
      <Link
        to="/groups"
        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 p-2 rounded hover:bg-blue-400/10"
      >
        Groups
      </Link>
      <Link
        to="/profile"
        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 p-2 rounded hover:bg-blue-400/10"
      >
        Profile
      </Link>
      
      {user && (
        <button
          onClick={logout}
          className="ml-auto px-4 py-2 text-gray-300 border border-gray-700 rounded hover:bg-gray-800 hover:border-blue-400 transition-colors duration-300"
        >
          Logout
        </button>
      )}
    </nav>
  );
}