// src/services/flashcardsAPI.js
import { api } from "../api/api";

export const getFlashcards = async (groupId) => {
  const response = await api.get(`/groups/${groupId}/flashcards`);
  return response.data;
};

export const createFlashcard = async (groupId, flashcardData) => {
  const response = await api.post(`/groups/${groupId}/flashcards`, flashcardData);
  return response.data;
};

export const updateFlashcard = async (flashcardId, flashcardData) => {
  const response = await api.put(`/flashcards/${flashcardId}`, flashcardData);
  return response.data;
};

export const deleteFlashcard = async (flashcardId) => {
  await api.delete(`/flashcards/${flashcardId}`);
};
