// src\services\authAPI.js
const API_URL = "http://localhost:3000/api";

// Agrega esta función si no existe
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Usar el mensaje del servidor o uno genérico
    throw new Error(data.error || "Error en la solicitud");
  }
  
  return data;
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return handleResponse(response);
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  const data = await handleResponse(response);
  localStorage.setItem("token", data.token);
  return data;
};