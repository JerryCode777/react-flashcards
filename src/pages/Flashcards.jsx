import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function Flashcards() {
  const { groupId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ front: "", back: "" });

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await api.get(`/groups/${groupId}/flashcards`);
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, [groupId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/groups/${groupId}/flashcards`, newCard);
      setFlashcards([...flashcards, response.data]);
      setNewCard({ front: "", back: "" });
    } catch (error) {
      console.error("Error creating flashcard:", error);
    }
  };

  return (
    <div>
      <h1>Flashcards</h1>
      <form onSubmit={handleCreate}>
        <input
          value={newCard.front}
          onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
          placeholder="Front"
        />
        <input
          value={newCard.back}
          onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
          placeholder="Back"
        />
        <button type="submit">Add Flashcard</button>
      </form>

      <div>
        {flashcards.map((card) => (
          <div key={card.id} style={{ margin: "1rem", padding: "1rem", border: "1px solid #eee" }}>
            <p><strong>Front:</strong> {card.front}</p>
            <p><strong>Back:</strong> {card.back}</p>
          </div>
        ))}
      </div>
    </div>
  );
}