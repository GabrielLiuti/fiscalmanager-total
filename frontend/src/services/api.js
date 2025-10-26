// frontend/src/services/api.js
import axios from "axios";

// ✅ Define o endereço público do backend hospedado no Render
const api = axios.create({
  baseURL: "https://fiscalmanager-backend.onrender.com/api",
});

// 🔐 Interceptador opcional (para autenticação JWT)
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token"); // pega o token salvo após login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
