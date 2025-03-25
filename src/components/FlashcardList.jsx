// src/components/FlashcardList.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flashcard from "./Flashcard";
import AddFlashcard from "./AddFlashcard";
import { getFlashcards } from "../services/flashcardsAPI";
import { useGroups } from "../context/GroupsContext";

export default function FlashcardList() {
  const { groupId } = useParams();
  const { refreshGroups } = useGroups();
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
        console.error('Failed to load flashcards: ', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [groupId]);

  const handleRefresh = () => {
    getFlashcards(groupId)
      .then(data => setFlashcards(data || []))
      .catch(err => setError(err.message));
    refreshGroups();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-indigo-400 animate-pulse text-lg">Loading flashcards...</div>
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-400">Flashcards</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
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
            refreshList={handleRefresh}
            editData={editingCard}
          />
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {flashcards.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 mb-4">No flashcards found in this group</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
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
                onDelete={handleRefresh}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}