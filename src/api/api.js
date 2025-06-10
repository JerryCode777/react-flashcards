// src\api\api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-flashcards-react.onrender.com/api",
});

// Interceptor para incluir token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // O desde tu contexto
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

