// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000, // 10 secunde
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request: adaugă token automat
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
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
