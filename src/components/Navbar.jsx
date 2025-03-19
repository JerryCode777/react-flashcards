import { Link } from "react-router-dom";
import { useState } from 'react'; 

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/groups" className="px-3 py-2 text-gray-600 hover:text-indigo-600">
              Mis Grupos
            </Link>
            <Link to="/profile" className="px-3 py-2 text-gray-600 hover:text-indigo-600">
              Perfil
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
              }}
              className="px-3 py-2 text-gray-600 hover:text-indigo-600"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-2 text-gray-600 hover:text-indigo-600">
              Iniciar sesión
            </Link>
            <Link to="/register" className="px-3 py-2 text-gray-600 hover:text-indigo-600">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}