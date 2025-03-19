import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flashcard from "./Flashcard";
import AddFlashcard from "./AddFlashcard"
import { getFlashcards } from "../services/flashcardsAPI";

export default function FlashcardList() {
  const { groupId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (groupId) {
          const data = await getFlashcards(groupId);
          setFlashcards(data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [groupId]);

  if (loading) {
    return <div className="text-center text-blue-500 animate-pulse">Loading flashcards...</div>;
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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Flashcards</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + New Flashcard
        </button>
      </div>

      {showAddForm && (
        <AddFlashcard
          groupId={groupId}
          onClose={() => {
            setShowAddForm(false);
            setEditingCard(null);
          }}
          refreshList={() => {
            getFlashcards(groupId)
              .then(data => setFlashcards(data || []))
              .catch(err => setError(err.message));
          }}
          editData={editingCard}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {flashcards.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No flashcards found in this group</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Create First Flashcard
            </button>
          </div>
        ) : (
          flashcards.map((card) => (
            <Flashcard
              key={card.id}
              card={card}
              groupId={groupId}
              onEdit={() => {
                setEditingCard(card);
                setShowAddForm(true);
              }}
              onDelete={() => {
                getFlashcards(groupId)
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