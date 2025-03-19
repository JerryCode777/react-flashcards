const API_URL = "http://localhost:3000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { "Authorization": `Bearer ${token}` };
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/me`, {
    headers: getAuthHeader()
  });
  return handleResponse(response);
};

export const updateUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "PUT",
    headers: { ...getAuthHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return handleResponse(response);
};