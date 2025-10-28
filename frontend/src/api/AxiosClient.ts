// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://frontend-904454434613.europe-west1.run.app",
  timeout: 10000, // 10 secunde
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("Backend URL:", import.meta.env.VITE_PUBLIC_BACKEND_URL);

// Interceptor request: adaugă token automat
axiosClient.interceptors.request.use(config => {
  const data = localStorage.getItem("devtrack-data");
  const token = data ? JSON.parse(data).token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor response: tratează erorile global
axiosClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
