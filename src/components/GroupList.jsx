// src/components/GroupList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "../services/groupsAPI";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-indigo-400 animate-pulse text-lg">Loading groups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="p-4 max-w-md text-red-400 bg-red-900/30 rounded-xl text-center border border-red-800/50">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link 
              key={group.id}
              to={`/groups/${group.id}/flashcards`}
              className="group block p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-gray-950/30 hover:shadow-xl hover:shadow-gray-950/40 transition-all duration-300 hover:bg-gray-750"
            >
              <h3 className="text-lg font-semibold text-gray-100 mb-3">{group.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {group.description || "No description provided"}
              </p>
              <div className="text-sm font-medium text-indigo-400">
                {group.flashcards_count} flashcards
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}