// src/components/AddFlashcard.jsx
import { useState } from "react";
import { createFlashcard, updateFlashcard } from "../services/flashcardsAPI";

export default function AddFlashcard({ groupId, onClose, refreshList, editData }) {
  const [formData, setFormData] = useState({
    question: editData?.question || "",
    answer: editData?.answer || "",
    pronunciation: editData?.pronunciation || "",
    difficulty: editData?.difficulty || "medium"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await updateFlashcard(groupId, editData.id, formData);
      } else {
        await createFlashcard(groupId, formData);
      }
      refreshList();
      onClose();
    } catch (error) {
      console.error("Error saving flashcard:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{editData ? "Edit" : "New"} Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <input
                required
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <input
                required
                value={formData.answer}
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pronunciation</label>
              <input
                value={formData.pronunciation}
                onChange={(e) => setFormData({...formData, pronunciation: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {editData ? "Save Changes" : "Create Flashcard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}