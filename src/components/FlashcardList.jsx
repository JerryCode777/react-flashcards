import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import AddFlashcard from "./AddFlashcard";
import { getFlashcards } from "../services/flashcardsAPI";

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]); // Inicializar con array vacío
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data || []); // Asegurar array vacío si es null
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-accent">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
        >
          Add Flashcard
        </button>
      </div>

      {showAddForm && (
        <AddFlashcard
          onClose={() => {
            setShowAddForm(false);
            setEditingCard(null);
          }}
          refreshList={() => {
            getFlashcards()
              .then(data => setFlashcards(data || []))
              .catch(err => setError(err.message));
          }}
          editData={editingCard}
        />
      )}

      <div className="grid gap-4">
        {flashcards.length === 0 ? (
          <p className="text-center text-gray-400">No flashcards available. Create your first one!</p>
        ) : (
          flashcards.map((card) => (
            <Flashcard
              key={card.id}
              card={card}
              onEdit={() => {
                setEditingCard(card);
                setShowAddForm(true);
              }}
              onDelete={() => {
                getFlashcards()
                  .then(data => setFlashcards(data || []))
                  .catch(err => setError(err.message));
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}