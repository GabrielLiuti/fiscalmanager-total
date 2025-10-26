// frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://fiscalmanager-backend.onrender.com/api", // ✅ substitua se o seu backend tiver outro nome no Render
});

export default api;
