import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get("/groups");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/groups", { name: newGroup });
      setGroups([...groups, response.data]);
      setNewGroup("");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div>
      <h1>My Groups</h1>
      <form onSubmit={handleCreate}>
        <input
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="New group name"
        />
        <button type="submit">Create Group</button>
      </form>
      
      <div>
        {groups.map((group) => (
          <div key={group.id} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}>
            <h3>{group.name}</h3>
            <button onClick={() => {/* Implement delete */}}>Delete</button>
            <button onClick={() => window.location = `/groups/${group.id}/flashcards`}>
              View Flashcards
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}