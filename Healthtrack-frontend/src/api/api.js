import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ------------------- Helpers -------------------
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ------------------- Auth -------------------

export const registerUser = async (formData) => {
  try {
    const response = await API.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// ------------------- Posts / Advisories -------------------

// Get all advisories / posts
export const getAdvisories = async (params) => {
  const response = await API.get("/advisory", { params });
  return response.data;
};

// ------------------- Health Tracking -------------------

// Add health entry
export const addHealthEntry = async (data, token) => {
  const response = await API.post("/health", data, authHeader(token));
  return response.data;
};

// Get user health data
export const getHealthData = async (token) => {
  const response = await API.get("/health", authHeader(token));
  return response.data;
};

// ------------------- Admin -------------------
export const getManagers = async (token) => {
  const response = await API.get("/admin/managers", authHeader(token));
  return response.data;
};

export const createManager = async (data, token) => {
  const response = await API.post("/admin/managers", data, authHeader(token));
  return response.data;
};

export const createAdmin = async (data, token) => {
  const response = await API.post("/admin/admins", data, authHeader(token));
  return response.data;
};

export const changePassword = async (data, token) => {
  const response = await API.put("/auth/change-password", data, authHeader(token));
  return response.data;
};

// ------------------- Managers (admin) -------------------
export const getManagerById = async (id, token) => {
  const response = await API.get(`/admin/managers/${id}`, authHeader(token));
  return response.data;
};

export const updateManager = async (id, data, token) => {
  // Backend currently has no PUT; re-use POST not appropriate. We'll do patch via managerController if added.
  // For now, simulate with POST to keep place; ideally add PUT route later.
  const response = await API.put(`/admin/managers/${id}`, data, authHeader(token));
  return response.data;
};

export const deleteManager = async (id, token) => {
  const response = await API.delete(`/admin/managers/${id}`, authHeader(token));
  return response.data;
};

// ------------------- Manager (self) posts -------------------
export const managerCreatePost = async (data, token) => {
  const response = await API.post("/manager/posts", data, authHeader(token));
  return response.data;
};
export const managerMyPosts = async (token) => {
  const response = await API.get("/manager/posts/mine", authHeader(token));
  return response.data;
};
export const managerUpdatePost = async (id, data, token) => {
  const response = await API.put(`/manager/posts/${id}`, data, authHeader(token));
  return response.data;
};
export const managerDeletePost = async (id, token) => {
  const response = await API.delete(`/manager/posts/${id}`, authHeader(token));
  return response.data;
};

// Reactions and comments (shared)
export const reactToPost = async (postId, type, token) => {
  const response = await API.post(`/expert/posts/${postId}/react`, { type }, authHeader(token));
  return response.data;
};
export const commentOnPost = async (postId, comment, token) => {
  const response = await API.post(`/expert/posts/${postId}/comment`, { comment }, authHeader(token));
  return response.data;
};

// Manager expert management
export const managerAddExpert = async (data, token) => {
  const response = await API.post("/manager/experts", data, authHeader(token));
  return response.data;
};
export const managerGetExperts = async (token) => {
  const response = await API.get("/manager/experts", authHeader(token));
  return response.data;
};
export const managerDeleteExpert = async (expertId, token) => {
  const response = await API.delete(`/manager/experts/${expertId}`, authHeader(token));
  return response.data;
};