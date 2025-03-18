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
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-blue-600">Mejora tu inglés</span>
              <span className="block mt-2">con flashcards inteligentes</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Sistema de repaso espaciado para una memorización efectiva. Aprende vocabulario, gramática y pronunciación.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <NavLink
                  to="/practice"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Comenzar práctica
                </NavLink>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <NavLink
                  to="/create"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                >
                  Crear nueva tarjeta
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-600 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <dt className="text-base font-medium text-gray-500">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recientes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-blue-600">Verbo</span>
                  <span className="text-sm text-gray-500">Hoy</span>
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">To Run</div>
                <div className="text-gray-600">/rʌn/</div>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500 italic">"I run every morning"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="bg-blue-600 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">¿Listo para mejorar?</span>
                  <span className="block">Crea tu primera tarjeta</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-100">
                  Empieza a construir tu colección personalizada de flashcards y acelera tu aprendizaje.
                </p>
                <NavLink
                  to="/create"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-blue-600 hover:bg-blue-50"
                >
                  Comenzar ahora
                </NavLink>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <div className="transform translate-x-6 translate-y-6">
                <div className="bg-gradient-to-r from-blue-400 to-blue-700 h-full w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;