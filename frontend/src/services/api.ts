import axios from "axios";

const api = axios.create({
  baseURL: "https://fiscalmanager-backend.onrender.com/api",
});

export default api;
