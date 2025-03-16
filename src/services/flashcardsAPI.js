const API_URL = "http://localhost:3000/flashcards";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

export const getFlashcards = async () => {
  try {
    const response = await fetch(API_URL);
    return handleResponse(response);
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};

export const createFlashcard = async (card) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

export const updateFlashcard = async (id, card) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
};

export const deleteFlashcard = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};