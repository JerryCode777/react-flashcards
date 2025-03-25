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
    <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl shadow-gray-950/30 p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold text-indigo-400 mb-6">
          {editData ? "Edit Flashcard" : "New Flashcard"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
              <input
                required
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="Enter question"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
              <input
                required
                value={formData.answer}
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="Enter answer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pronunciation</label>
              <input
                value={formData.pronunciation}
                onChange={(e) => setFormData({...formData, pronunciation: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                placeholder="Pronunciation guide (optional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-400 hover:text-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {editData ? "Save Changes" : "Create Flashcard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}