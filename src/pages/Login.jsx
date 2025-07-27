import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // asegúrate que esta ruta es correcta

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message || 'Usuario y/o contraseña inválidos');
      console.error('Error de login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4">
      {/* Título general */}
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl font-semibold text-blue-200 text-center"
          style={{ fontFamily: "'Dancing Script', cursive", transition: 'opacity 1s ease-in-out', opacity: 1 }}
        >
          English - Spanish Flashcards
        </h1>
        <p 
          className="text-cyan-200 text-2xl mt-2"
          style={{ fontFamily: "'Dancing Script', cursive", transition: 'opacity 1s ease-in-out', opacity: 1 }}
        >
          Aprende vocabulario y gramática en ambos idiomas con tarjetas interactivas y grupos de estudio.
        </p>
      </div>
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 backdrop-blur-sm border border-slate-700">
        {/* Logo reducido */}
        <img 
          src={logo} 
          alt="Logo de la universidad" 
          className="mx-auto mb-4 h-16 w-auto"
        />

        {/* Título de login */}
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        {/* Error */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg border border-red-800/50 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-slate-300 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-400"
              placeholder="user@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-slate-300 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-400"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting...
              </span>
            ) : 'Log in'}
          </button>

          <button 
            type="button"
            onClick={() => navigate("/register")}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Create Account 
          </button>
        </form>
      </div>

      {/* Créditos fuera del cuadro */}
      <p className="mt-6 text-blue-200 text-sm text-center max-w-sm">
        Desarrollado por Alejandra Camila Choque Sánchez y Jerry Anderson Huaynacho Mango<br />
      </p>
      <p className="mt-6 text-blue-100 text-sm text-center max-w-sm">
        Curso de Programación Web Grupo B - 2025
      </p>
    </div>
  );
}
