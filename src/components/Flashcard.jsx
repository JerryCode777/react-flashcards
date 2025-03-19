import { useState } from "react";
import { deleteFlashcard } from "../services/flashcardsAPI";

export default function Flashcard({ card, groupId, onEdit, onDelete }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteFlashcard(card.id, groupId); // Añadido groupId
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-lg font-medium text-gray-800">{card.question}</p>
          {showAnswer && (
            <p className="mt-2 text-gray-600">
              {card.answer}
              <span className="block text-sm text-gray-400 mt-1 italic">
                {card.pronunciation}
              </span>
            </p>
          )}
        </div>
        <button
          onClick={() => speakText(showAnswer ? card.answer : card.question)}
          className="text-blue-600 hover:text-blue-800 ml-2"
        >
          <i className="fas fa-volume-up" />
        </button>
      </div>

      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showAnswer ? "Ocultar respuesta" : "Mostrar respuesta"}
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={onEdit}
            className="text-green-600 hover:text-green-800"
            title="Editar"
          >
            <i className="fas fa-pen-to-square" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
            title="Eliminar"
          >
            <i className="fas fa-trash-can" />
          </button>
        </div>
      </div>

      {/* Badge de dificultad */}
      <div className="mt-3">
        <span className={`inline-block px-2 py-1 text-xs rounded-full 
          ${card.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
            card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}`}>
          Dificultad: {card.difficulty}
        </span>
      </div>
    </div>
  );
}