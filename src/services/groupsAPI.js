const API_URL = "http://localhost:3000/api";

const getAuthHeader = () => ({
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const getGroups = async () => {
  const response = await fetch(`${API_URL}/groups`, {
    headers: getAuthHeader()
  });
  return handleResponse(response);
};

export const createGroup = async (groupData) => {
  const response = await fetch(`${API_URL}/groups`, {
    method: "POST",
    headers: { ...getAuthHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(groupData)
  });
  return handleResponse(response);
};

export const deleteGroup = async (groupId) => {
  const response = await fetch(`${API_URL}/groups/${groupId}`, {
    method: "DELETE",
    headers: getAuthHeader()
  });
  return handleResponse(response);
};