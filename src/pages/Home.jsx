// src\pages\Home.jsx
import { NavLink } from 'react-router-dom';

const Home = () => {
  const stats = [
    { name: 'Tarjetas totales', value: '1,234' },
    { name: 'Dominadas', value: '892' },
    { name: 'Por practicar', value: '342' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Mejora tu inglés</span>
              <span className="block mt-2 text-blue-400">con flashcards inteligentes</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-blue-200 sm:text-xl md:mt-5 md:max-w-3xl">
              Sistema de repaso espaciado para una memorización efectiva. Aprende vocabulario, gramática y pronunciación.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
              <NavLink
                to="/practice"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
              >
                Comenzar práctica
              </NavLink>
              <NavLink
                to="/create"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
              >
                Crear nueva tarjeta
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <dt className="text-lg font-medium text-blue-300">{stat.name}</dt>
                <dd className="mt-2 text-4xl font-bold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Flashcards Recientes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-blue-400">Verbo</span>
                  <span className="text-sm text-gray-300">Hoy</span>
                </div>
                <div className="text-xl font-bold text-white mb-2">To Run</div>
                <div className="text-blue-300 font-mono">/rʌn/</div>
                <div className="mt-4 border-t border-gray-600 pt-4">
                  <p className="text-sm text-gray-300 italic">"I run every morning"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">¿Listo para mejorar?</span>
                  <span className="block mt-2">Comienza ahora mismo</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-100">
                  Únete a miles de estudiantes que ya están mejorando su inglés con nuestro sistema inteligente.
                </p>
                <div className="mt-8">
                  <NavLink
                    to="/register"
                    className="inline-block bg-white border border-transparent rounded-md shadow px-6 py-3 text-base font-medium text-blue-700 hover:bg-blue-50 transition-colors duration-200"
                  >
                    Empieza gratis hoy
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 opacity-90"></div>
              <div className="h-full w-full object-cover transform translate-x-6 translate-y-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-64 w-64 text-blue-300 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;