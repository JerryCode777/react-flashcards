// src/services/groupsAPI.js
import { api } from "../api/api";

export const getGroups = async () => {
  const response = await api.get("/groups");
  return response.data;
};

export const createGroup = async (groupData) => {
  const response = await api.post("/groups", groupData);
  return response.data;
};

export const deleteGroup = async (groupId) => {
  await api.delete(`/groups/${groupId}`);
};