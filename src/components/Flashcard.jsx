// src/components/Flashcard.jsx
import { useState } from "react";
import { deleteFlashcard } from "../services/flashcardsAPI";

export default function Flashcard({ card, groupId, onEdit, onDelete }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteFlashcard(card.id);
      onDelete();
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-lg font-medium text-gray-100">{card.question}</p>
          {showAnswer && (
            <p className="mt-2 text-gray-400">
              {card.answer}
              <span className="block text-sm text-gray-500 mt-1 italic">
                {card.pronunciation}
              </span>
            </p>
          )}
        </div>
        <button
          onClick={() => speakText(showAnswer ? card.answer : card.question)}
          className="text-indigo-400 hover:text-indigo-300 ml-2"
        >
          <i className="fas fa-volume-up" />
        </button>
      </div>

      <div className="flex justify-between items-center border-t border-gray-700 pt-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={onEdit}
            className="text-green-400 hover:text-green-300"
            title="Edit"
          >
            <i className="fas fa-pen-to-square" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300"
            title="Delete"
          >
            <i className="fas fa-trash-can" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <span className={`inline-block px-2 py-1 text-xs rounded-full 
          ${card.difficulty === 'easy' ? 'bg-green-800/30 text-green-400' : 
            card.difficulty === 'medium' ? 'bg-yellow-800/30 text-yellow-400' : 
            'bg-red-800/30 text-red-400'}`}>
          Difficulty: {card.difficulty}
        </span>
      </div>
    </div>
  );
}