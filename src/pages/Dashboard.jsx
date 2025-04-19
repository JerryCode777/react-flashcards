// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { FcBusinessman } from "react-icons/fc";

// Componente reutilizable para tarjetas de estadísticas
const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
      </div>
      <div className={`${colorClass} p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
  </div>
);

// Componente reutilizable para acciones rápidas
const QuickActionLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-200"
  >
    {icon}
    <span className="ml-3">{children}</span>
  </Link>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    groups: 0,
    flashcards: 0,
    recentGroups: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const groupsRes = await api.get("/groups");
        const groups = Array.isArray(groupsRes?.data) ? groupsRes.data : [];
        
        const totalFlashcards = groups.reduce(
          (sum, group) => sum + (group.flashcards_count || 0),
          0
        );
        
        setStats({
          groups: groups.length,
          flashcards: totalFlashcards,
          recentGroups: groups.slice(-3).reverse()
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-6xl mx-auto animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-slate-800 rounded-lg" />
            ))}
          </div>
          <div className="h-64 bg-slate-800 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado y manejo de errores */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-500">Welcome back</h1>
            <h2 className="font-bold text-white">{user?.email}</h2>
            <p className="text-slate-400 mt-2">
              Flashcards turn complex concepts into simple steps through active recall.
            </p>
          </div>
          <FcBusinessman className="w-10 h-10" aria-label="User avatar" />
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 text-red-400 rounded-lg">
            {error} - Please try refreshing the page
          </div>
        )}

        {/* Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Groups"
            value={stats.groups}
            colorClass="bg-blue-900/20"
            icon={
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />

          <StatCard
            title="Total Flashcards"
            value={stats.flashcards}
            colorClass="bg-green-900/20"
            icon={
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          />

          <StatCard
            title="Daily Goal"
            value="0/20 cards"
            colorClass="bg-purple-900/20"
            icon={
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
        </section>

        {/* Contenido principal */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Acciones rápidas */}
          <div className="lg:col-span-1 bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <nav className="space-y-3">
              <QuickActionLink
                to="/create"
                icon={
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Create New Group
              </QuickActionLink>

              <QuickActionLink
                to="/profile"
                icon={
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              >
                Edit Profile
              </QuickActionLink>

              <QuickActionLink
                to="/groups"
                icon={
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                }
              >
                Start Practice Session
              </QuickActionLink>
            </nav>
          </div>

          {/* Grupos recientes */}
          <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Groups</h2>
              <Link to="/groups" className="text-blue-400 hover:text-blue-300 text-sm">
                View All →
              </Link>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {stats.recentGroups.map((group) => (
                <Link
                  key={group.id}
                  to={`/groups/${group.id}/flashcards`}
                  className="p-4 border border-slate-700 rounded-lg hover:border-slate-600 hover:bg-slate-700/50 transition-colors"
                >
                  <h3 className="font-medium text-white">{group.name}</h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                    {group.description || "No description"}
                  </p>
                  <div className="mt-3 text-sm text-blue-400 flex items-center">
                    View Flashcards
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
              
              {stats.recentGroups.length === 0 && (
                <div className="col-span-2 text-center py-8 text-slate-400">
                  No groups created yet. Get started by creating your first group!
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}