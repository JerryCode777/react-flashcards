import { useState } from "react";
import { deleteFlashcard } from "../services/flashcardsAPI";

export default function Flashcard({ card, onEdit, onDelete }) {
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
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <p className="text-lg font-medium flex-1">{card.question}</p>
        <button
          onClick={() => speakText(card.question)}
          className="text-accent hover:text-accent/80 ml-2"
        >
          <i className="fas fa-volume-up" />
        </button>
      </div>

      {showAnswer && (
        <div className="flex justify-between items-start mb-4">
          <p className="text-gray-300 flex-1">{card.answer}</p>
          <button
            onClick={() => speakText(card.answer)}
            className="text-accent hover:text-accent/80 ml-2"
          >
            <i className="fas fa-volume-up" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="text-accent hover:text-accent/80"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        
        <div className="space-x-4">
          <button
            onClick={onEdit}
            className="text-green-400 hover:text-green-300"
          >
            <i className="fas fa-pen-to-square" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300"
          >
            <i className="fas fa-trash-can" />
          </button>
        </div>
      </div>
    </div>
  );
}