import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado
  const [loading, setLoading] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login')
      }, 2000);
      return () => clearTimeout(timer)
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch("https://backend-flashcards-react.onrender.com/api/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });
      
      if (response.ok) {
        setSuccess(true);
        return;
      }

      const responseText = await response.text()
      let errorMsg = `Error ${response.status}: ${response.statusText}`
      
      if (responseText) {
        try {
          const data = JSON.parse(responseText)
          if (data.message) {
            errorMsg = data.message
          }
        } catch (e) {
          errorMsg = responseText
        }
      }
      
      throw new Error(errorMsg)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 backdrop-blur-sm border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create Account
        </h2>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg border border-red-800/50 text-sm">
            {errorMessage}
          </div>
        )}
        
        {loading && (
          <div className="mb-4 p-3 bg-blue-900/30 text-blue-300 rounded-lg border border-blue-800/50 text-sm">
           processing registration...
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-emerald-900/30 text-emerald-300 rounded-lg border border-emerald-800/50 text-sm">
           Registration successful! Redirecting...
          </div>
          )}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-slate-300 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-400"
                placeholder="tucorreo@ejemplo.com"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-5">
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

            {/* Nuevo campo de confirmación de contraseña */}
            <div className="mb-6">
              <label className="block mb-2 text-slate-300 font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-400"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : 'Create'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}