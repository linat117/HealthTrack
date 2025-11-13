import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
export const getAdvisories = async () => {
  const response = await API.get("/advisory");
  return response.data;
};

// ------------------- Health Tracking -------------------

// Add health entry
export const addHealthEntry = async (data, token) => {
  const response = await API.post("/health", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get user health data
export const getHealthData = async (token) => {
  const response = await API.get("/health", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
