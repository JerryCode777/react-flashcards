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
    return <div className="text-center text-blue-500 animate-pulse">Loading groups...</div>;
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Link 
            key={group.id}
            to={`/groups/${group.id}/flashcards`}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{group.name}</h3>
            <p className="text-gray-600">{group.description || "No description"}</p>
            <div className="mt-4 text-sm text-indigo-600">
              {group.flashcards_count} flashcards
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}