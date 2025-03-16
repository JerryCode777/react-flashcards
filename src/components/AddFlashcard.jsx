import { useEffect, useState } from "react";
import { createFlashcard, updateFlashcard } from "../services/flashcardsAPI";

export default function AddFlashcard({ onClose, refreshList, editData }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setQuestion(editData.question);
      setAnswer(editData.answer);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim() || !answer.trim()) {
      setError("Both fields are required!");
      return;
    }

    try {
      if (editData) {
        await updateFlashcard(editData.id, { question, answer });
      } else {
        await createFlashcard({ question, answer });
      }
      refreshList();
      onClose();
    } catch (error) {
      console.error("Error saving flashcard:", error);
      setError("Error saving flashcard. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-secondary rounded-xl p-6 w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Flashcard" : "Add Flashcard"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <i className="fas fa-times text-2xl" />
          </button>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Question:</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input-field w-full"
              rows="3"
              placeholder="Enter your question..."
            />
          </div>
          
          <div>
            <label className="block mb-2">Answer:</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="input-field w-full"
              rows="4"
              placeholder="Enter the answer..."
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {editData ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}