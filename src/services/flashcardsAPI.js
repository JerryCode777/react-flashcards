// src/services/flashcardsAPI.js
const API_BASE = "http://localhost:3000/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

const getAuthHeader = () => ({
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

// Función DELETE corregida y exportada
export const deleteFlashcard = async (flashcardId) => {
  try {
    const response = await fetch(`${API_BASE}/flashcards/${flashcardId}`, {
      method: "DELETE",
      headers: getAuthHeader()
    });
    return handleResponse(response);
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};

// Asegúrate de exportar TODAS las funciones necesarias
export const getFlashcards = async (groupId) => {
  try {
    const response = await fetch(`${API_BASE}/groups/${groupId}/flashcards`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};

export const createFlashcard = async (groupId, card) => {
  try {
    const response = await fetch(`${API_BASE}/groups/${groupId}/flashcards`, {
      method: "POST",
      headers: { 
        ...getAuthHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });
    return handleResponse(response);
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

export const updateFlashcard = async (flashcardId, groupId, card) => {
  try {
    const response = await fetch(`${API_BASE}/flashcards/${flashcardId}`, {
      method: "PUT",
      headers: { 
        ...getAuthHeader(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });
    return handleResponse(response);
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
};